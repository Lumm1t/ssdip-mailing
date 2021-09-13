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
      .wait('form#SearchSubjectForm')
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

const locationThread = async (ctx: any) => {
  const locationsInfo = [
    {
      name: 'state',
      inputName: 'SearchStateId',
    },
    // {
    //   name: 'substate',
    //   inputName: 'SearchSubstateId',
    // },
    // {
    //   name: 'community',
    //   inputName: 'SearchCommunityName',
    // },
    // {
    //   name: 'entity',
    //   inputName: 'SearchAclgroupId',
    // },
  ]

  const possibleLocations = {}
  for (const { name, inputName } of locationsInfo) {
    // @ts-ignore
    answer[`${name}`] = await getLocation(inputName)
  }

  ctx.body = possibleLocations
}

const getSubjects = (ctx: any) => {
  ctx.body = ctx.request.body
}

export default {
  locationThread,
  getSubjects,
}
