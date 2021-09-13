import KoaRouter from 'koa-router'

import scraper from '../controllers/scraper'

const router = new KoaRouter()

router.post('/locations', scraper.getLocations)
router.post('/subjects', scraper.getSubjects)

export default router