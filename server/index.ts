import './env'
import Koa from 'koa'
import KoaRouter from 'koa-router'

import api from './routes/api'

const port = process.env.SERVER_PORT

const app = new Koa()
const router = new KoaRouter()

app.on('error', (err: Error) => {
  console.log(`server error! ${err}`)
})

router.use('/api', api.routes())

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
  console.log(`Koa is listening in ${port}`)
})
