import KoaRouter from 'koa-router'

import api from '../controllers/api'

const router = new KoaRouter()

router.post('/', api.main)

export default router
