import KoaRouter from 'koa-router'

import mailer from '../controllers/mailer'

const router = new KoaRouter()

router.post('/send', mailer.mailThread)

export default router
