import Router from 'express';
import multiparty from 'connect-multiparty';
import authController from '../controllers/authController';
import { verifyLogin, verifySesion } from '../middlewares/verifyMiddlewares';
import { validateRegisterUser, validateLoginUser, validateResend } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const router = Router();
router
  .get('/logout-user', verifySesion, authController.logoutUser)
  .get('/verify-user-account/:session', authController.verifyAccount)
  .post('/login-user', validateLoginUser, verifyLogin, authController.loginUser)
  .post('/register-user', verifySesion, multipart, validateRegisterUser, authController.registerUser)
  .post('/resend-verification-link/:action', verifyLogin, validateResend, authController.sentVerificationLink);

export default router;
