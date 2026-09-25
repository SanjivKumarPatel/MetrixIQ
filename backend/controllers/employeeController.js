import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import asyncHandler from '../middleware/asyncHandler.js'

export const createEmployee = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        const error = new Error('Name, email and password are required')
        error.statusCode = 400
        throw error
    }

    const existingUser = await User.findOne({
        email: email.toLowerCase().trim()
    })

    if (existingUser) {
        const error = new Error('User with this email already exists')
        error.statusCode = 409
        throw error
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const employee = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: 'employee'
    })

    res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        employee: {
            id: employee._id,
            name: employee.name,
            email: employee.email,
            role: employee.role
        }
    })
})

export const getAllEmployees = asyncHandler(async (req, res) => {
    const employees = await User.find({ role: 'employee' })
        .select('-password')
        .sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        count: employees.length,
        employees
    })
})

export const getEmployeeById = asyncHandler(async (req, res) => {
    const employee = await User.findOne({
        _id: req.params.id,
        role: 'employee'
    }).select('-password')

    if (!employee) {
        const error = new Error('Employee not found')
        error.statusCode = 404
        throw error
    }

    res.status(200).json({
        success: true,
        employee
    })
})

export const updateEmployee = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const employee = await User.findOne({
        _id: req.params.id,
        role: 'employee'
    })

    if (!employee) {
        const error = new Error('Employee not found')
        error.statusCode = 404
        throw error
    }

    if (name) {
        employee.name = name.trim()
    }

    if (email) {
        const normalizedEmail = email.toLowerCase().trim()

        const existingUser = await User.findOne({
            email: normalizedEmail,
            _id: { $ne: employee._id }
        })

        if (existingUser) {
            const error = new Error('User with this email already exists')
            error.statusCode = 409
            throw error
        }

        employee.email = normalizedEmail
    }

    if (password) {
        employee.password = await bcrypt.hash(password, 10)
    }

    await employee.save()

    res.status(200).json({
        success: true,
        message: 'Employee updated successfully',
        employee: {
            id: employee._id,
            name: employee.name,
            email: employee.email,
            role: employee.role
        }
    })
})

export const deactivateEmployee = asyncHandler(async (req, res) => {
    const employee = await User.findOne({
        _id: req.params.id,
        role: 'employee'
    })

    if (!employee) {
        const error = new Error('Employee not found')
        error.statusCode = 404
        throw error
    }

    employee.isActive = false

    await employee.save()

    res.status(200).json({
        success: true,
        message: 'Employee deactivated successfully',
        employee: {
            id: employee._id,
            name: employee.name,
            email: employee.email,
            role: employee.role,
            isActive: employee.isActive
        }
    })
})