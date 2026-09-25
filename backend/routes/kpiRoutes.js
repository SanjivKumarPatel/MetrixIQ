import express from 'express'

import {
    createKPI,
    getAllKPIs,
    getKPIById
} from '../controllers/kpiController.js'

import protect from '../middleware/authMiddleware.js'

import adminMiddleware from '../middleware/adminMiddleware.js'

const kpiRouter = express.Router()

kpiRouter.post(
    '/',
    protect,
    adminMiddleware,
    createKPI
)

kpiRouter.get(
    '/',
    protect,
    adminMiddleware,
    getAllKPIs
)

kpiRouter.get(
    '/:id',
    protect,
    adminMiddleware,
    getKPIById
)

export default kpiRouter