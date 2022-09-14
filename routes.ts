import {  Router } from 'express';
import {  getAccounts,
  register,
  login,
  protectedAuth,
  logout, } from './controllers/auth';
import {  userAuth } from './middleware/auth';
import {  validationMiddleware } from './middleware/validations';

import {  registerValidation, loginValidation  } from './validators';

export const router = Router()

router.get('/get-accounts', getAccounts)
router.get('/protected', userAuth, protectedAuth)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
