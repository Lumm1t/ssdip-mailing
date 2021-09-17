import { Context } from 'koa'
import Nightmare from 'nightmare'

interface Output {
  name: string
  email: string
}

const SSDIP = 'https://ssdip.bip.gov.pl/search/graphsubjects/'

const nightmare = new Nightmare({
  show: false,
})

nightmare
  .goto(SSDIP)
  .then(() => console.log('nightmare ready'))
  .catch(error => console.error(error))

const getLocation = (inputName: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    nightmare
      // @ts-ignore
      .evaluate((inputName: string) => {
        // @ts-ignore
        return [...document.querySelector(`select[id*=${inputName}]`)].map(
          el => ({
            text: (el.textContent || 'all').toLowerCase(),
            value: el.value.toLowerCase(),
          })
        )
      }, inputName)
      .then(resolve)
      .catch(reject)
  })
}

const setLocation = (inputName: string, value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    nightmare
      .select(`select[id*='${inputName}']`, value)
      .then(async () => {
        await clickSearchButton()

        resolve()
      })
      .catch(reject)
  })
}

const clickSearchButton = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    nightmare
      .click('input[value=Szukaj]')
      .evaluate(() => document.querySelector('form#SearchSubjectForm').remove())
      .wait('form#SearchSubjectForm')
      .then(resolve)
      .catch(reject)
  })
}

const isDataAvailable = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    return nightmare
      .wait('h3.w_sz')
      .evaluate(() => document.querySelector('table.wyniki_szukania') !== null)
      .then(resolve)
      .catch(reject)
  })
}

const isDataOnFewPages = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    return nightmare
      .wait('h3.w_sz')
      .evaluate(() => document.querySelector('a.last') !== null)
      .then(resolve)
      .catch(reject)
  })
}

const getPagesLength = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    nightmare
      .click('a.last')
      .evaluate(() => {
        const pagesLength = document.querySelector('span.current')?.textContent

        const firstPageBtn: HTMLAnchorElement =
          document.querySelector('a.first')

        firstPageBtn.click()

        return +pagesLength
      })
      .then(resolve)
      .catch(reject)
  })
}

const getDataFromPage = (): Promise<Output[]> => {
  return new Promise((resolve, reject) => {
    nightmare
      .evaluate(() => {
        const output: Output[] = []

        const rows = [
          ...document.querySelectorAll(
            'table.wyniki_szukania > tbody > tr.color'
          ),
        ]

        for (const row of rows) {
          const data = row.children[1]
          const emailRegex = /\S+@\S+\.\S+/

          const nameEl = data.querySelector('span > a')
          const infoEl = data.children[2]

          const name = nameEl?.textContent
          const email = infoEl?.textContent.match(emailRegex)?.[0]

          if (email !== undefined)
            output.push({
              name: name.toLowerCase(),
              email: email.toLowerCase(),
            })
        }

        return output
      })
      .then(resolve)
      .catch(reject)
  })
}

const locationThread = async (ctx: Context) => {
  const params = ctx.request.body

  const selectedLocations: string[] = params.selectedLocations

  let searchIndex = 0

  const availableLocations = [
    'SearchStateId',
    'SearchSubstateId',
    'SearchCommunityName',
    'SearchAclgroupId',
  ]

  if (!selectedLocations) {
    return (ctx.body = {
      success: false,
      error: 'NO_PARAM',
    })
  }

  if (!Array.isArray(selectedLocations)) {
    return (ctx.body = {
      success: false,
      error: 'INVALID_PARAM',
    })
  }

  if (selectedLocations.length >= availableLocations.length) {
    return (ctx.body = {
      success: false,
      error: 'TOO_MANY_PARAMS',
    })
  }

  if (selectedLocations.length === 0) {
    return (ctx.body = {
      success: true,
      response: await getLocation(availableLocations[searchIndex]),
    })
  }

  for (const selectedLocation of selectedLocations) {
    await setLocation(availableLocations[searchIndex], selectedLocation)

    ++searchIndex
  }

  ctx.body = {
    success: true,
    response: await getLocation(availableLocations[searchIndex]),
  }
}

const subjectsThread = async (ctx: Context) => {
  const params = ctx.request.body

  const selectedLocations: string[] = params.selectedLocations

  const availableLocations = [
    'SearchStateId',
    'SearchSubstateId',
    'SearchCommunityName',
    'SearchAclgroupId',
  ]

  if (!selectedLocations) {
    return (ctx.body = {
      success: false,
      error: 'NO_PARAM',
    })
  }

  if (!Array.isArray(selectedLocations)) {
    return (ctx.body = {
      success: false,
      error: 'INVALID_PARAM',
    })
  }

  if (selectedLocations.length > availableLocations.length) {
    return (ctx.body = {
      success: false,
      error: 'TOO_MANY_PARAMS',
    })
  }

  for (const [index, selectedLocation] of selectedLocations.entries())
    await setLocation(availableLocations[index], selectedLocation)

  const dataAvailable = await isDataAvailable()
  const dataOnFewPages = await isDataOnFewPages()

  const output = []

  if (dataAvailable === false) {
    return (ctx.body = {
      success: false,
      error: 'NO_DATA',
    })
  }

  if (dataOnFewPages === true) {
    const pagesLength = await getPagesLength()

    for (let i = 1; i <= pagesLength; ++i) {
      console.log(`Current page: ${i}/${pagesLength}`)

      const pageOutput = await getDataFromPage()

      output.push(...pageOutput)

      if (i !== pagesLength) nightmare.click('a.next')
    }
  } else {
    const pageOutput = await getDataFromPage()

    output.push(...pageOutput)
  }

  ctx.body = {
    success: true,
    response: output,
  }
}

export default {
  locationThread,
  subjectsThread,
}
