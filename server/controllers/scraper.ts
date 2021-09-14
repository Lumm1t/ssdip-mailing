import Nightmare from 'nightmare'

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
        return [...document.querySelector(`select[id*=${inputName}]`)].map(el =>
          (el.textContent || 'all').toLowerCase()
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

const locationThread = async (ctx: any) => {
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

const getSubjects = (ctx: any) => {
  ctx.body = ctx.request.body
}

export default {
  locationThread,
  getSubjects,
}
