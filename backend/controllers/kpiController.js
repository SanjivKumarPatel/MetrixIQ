import KPI from '../models/KPI.js'
import User from '../models/User.js'
import asyncHandler from '../middleware/asyncHandler.js'

export const createKPI = asyncHandler(async (req, res) => {
    const { name, description, employee, target } = req.body

    if (!name || !employee || target === undefined) {
        const error = new Error('Name, employee and target are required')
        error.statusCode = 400
        throw error
    }

    const employeeUser = await User.findOne({
        _id: employee,
        role: 'employee',
        isActive: true
    })

    if (!employeeUser) {
        const error = new Error('Active employee not found')
        error.statusCode = 404
        throw error
    }

    if (target <= 0) {
        const error = new Error('Target must be greater than 0')
        error.statusCode = 400
        throw error
    }

    const kpi = await KPI.create({
        name: name.trim(),
        description: description?.trim(),
        employee,
        target
    })

    res.status(201).json({
        success: true,
        message: 'KPI created successfully',
        kpi
    })
})

export const getAllKPIs = asyncHandler(async (req, res) => {
    const kpis = await KPI.find()
        .populate('employee', 'name email')
        .sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        count: kpis.length,
        kpis
    })
})

export const getKPIById = asyncHandler(async (req, res) => {
    const kpi = await KPI.findById(req.params.id)
        .populate('employee', 'name email')

    if (!kpi) {
        const error = new Error('KPI not found')
        error.statusCode = 404
        throw error
    }

    res.status(200).json({
        success: true,
        kpi
    })
})