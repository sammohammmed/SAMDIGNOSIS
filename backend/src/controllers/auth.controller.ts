import type { Request, Response } from 'express'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { ok, fail } from '@utils/response'
import { users } from '@data/mockDb'
import { type UserRole } from '@types'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(3),
  role: z.enum(['physician', 'radiologist', 'lab-tech', 'admin']).default('physician'),
  organization: z.string().min(2)
})

export function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json(fail('Invalid credentials payload', 'VALIDATION_ERROR'))
  }

  const { email, password } = parsed.data
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password)

  if (!user) {
    return res.status(401).json(fail('Incorrect email or password', 'AUTH_FAILED'))
  }

  return res.json(
    ok({
      token: uuid(),
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        organization: user.organization
      }
    })
  )
}

export function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json(fail('Invalid registration data', 'VALIDATION_ERROR'))
  }

  const { email, password, displayName, role, organization } = parsed.data
  const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase())

  if (existing) {
    return res.status(409).json(fail('User already exists', 'USER_EXISTS'))
  }

  const newUser = {
    id: uuid(),
    email,
    password,
    displayName,
    role: role as UserRole,
    organization
  }

  users.push(newUser)

  return res.status(201).json(
    ok({
      token: uuid(),
      user: {
        id: newUser.id,
        email: newUser.email,
        displayName: newUser.displayName,
        role: newUser.role,
        organization: newUser.organization
      }
    })
  )
}
