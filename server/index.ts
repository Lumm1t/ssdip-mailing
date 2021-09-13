import './env'
import Koa from 'koa'
import KoaBodyparser from 'koa-bodyparser'
import KoaRouter from 'koa-router'

import scraper from './routes/scraper'

const port = process.env.SERVER_PORT

const app = new Koa()
const router = new KoaRouter()

app.use(KoaBodyparser())

app.on('error', (err: Error) => {
  console.log(`server error! ${err}`)
})

router.use('/scraper', scraper.routes())

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
  console.log(`Koa is listening in ${port}`)
})
