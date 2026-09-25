import express from 'express'
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deactivateEmployee
} from '../controllers/employeeController.js'
import protect from '../middleware/authMiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const employeeRouter = express.Router()

employeeRouter.post(
    '/',
    protect,
    adminMiddleware,
    createEmployee
)

employeeRouter.get(
    '/',
    protect,
    adminMiddleware,
    getAllEmployees
)

employeeRouter.get(
    '/:id',
    protect,
    adminMiddleware,
    getEmployeeById
)

employeeRouter.put(
    '/:id',
    protect,
    adminMiddleware,
    updateEmployee
)

employeeRouter.delete(
    '/:id',
    protect,
    adminMiddleware,
    deactivateEmployee
)

export default employeeRouter