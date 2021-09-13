import './env'
import Koa from 'koa'
import KoaRouter from 'koa-router'

const port = process.env.SERVER_PORT

const app = new Koa()

app.use((ctx: any) => {
  ctx.body = 'Hello World!'
})

app.on('error', (err: Error) => {
  console.log(`server error! ${err}`)
})

app.listen(port, () => {
  console.log(`Koa is listening in ${port}`)
})
