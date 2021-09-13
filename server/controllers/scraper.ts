import Nightmare from 'nightmare'

const SSDIP = 'https://ssdip.bip.gov.pl/search/graphsubjects/'

const nightmare = new Nightmare({
  show: false,
})

nightmare
  .goto(SSDIP)
  .then(() => console.log('nightmare ready'))
  .catch(error => console.error(error))

const getLocations = async (ctx: any) => {
  const data = await nightmare
    .wait('h3.w_sz')
    .evaluate(() => document.querySelector('h3.w_sz').textContent)

  ctx.body = data
}

const getSubjects = (ctx: any) => {
  ctx.body = ctx.request.body
}

export default {
  getLocations,
  getSubjects,
}
