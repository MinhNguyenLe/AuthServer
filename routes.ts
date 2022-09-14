import {  Router } from 'express';
import {  getUsers,
  register,
  login,
  protectedAuth,
  logout, } from './controllers/auth';
import {  userAuth } from './middleware/auth';
import {  validationMiddleware } from './middleware/validations';

import {  registerValidation, loginValidation  } from './validators';

export const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protectedAuth)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
