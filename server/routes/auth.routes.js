// routes/auth.routes.js
import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js';
export default Router()
  .post('/signup', registerUser)
  .post('/login', loginUser)
  .post('/logout', logoutUser);
