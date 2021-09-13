import KoaRouter from 'koa-router'

import scraper from '../controllers/scraper'

const router = new KoaRouter()

router.post('/', scraper.main)

export default router
