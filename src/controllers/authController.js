import dotenv from 'dotenv';
import generator from 'generate-password';
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED, BAD_REQUEST, CONFLICT, NOT_FOUND, CREATED, OK } from 'http-status';

import userHelper from '../helpers/userHelper';
import sessionHelper from '../helpers/sessionHelper';
import passwordHelper from '../helpers/passwordHelper';
import responseHelper from '../helpers/responseHelper';
import imageService from '../services/cloudinaryHelper';
import emailService from '../services/emailServices.js';

dotenv.config();
const generatedPassword = generator.generate({ length: 10, numbers: true, symbols: true, uppercase: true, lowercase: true });

/**
* This class contains all methods (functions) required to handle
* registerUser function.
* verifyAccount function.
* resentVerificationLink function.
* loginUser function.
*/
class AuthController {
  /**
     * Handle registerUser.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} response.
     */
  static async registerUser(req, res) {
    try {
      if (!req.files.profilePicture) {
        responseHelper.handleError(BAD_REQUEST, 'User profile picture is required.');
        return responseHelper.response(res);
      }
      const document = await imageService(req.files.profilePicture);
      if (document === 'Error' || document === undefined) {
        responseHelper.handleError(BAD_REQUEST, 'Please check good internet and use correct type of files(jpg, png or pdf).');
        return responseHelper.response(res);
      }

      const data = await userHelper.userExist('email', req.body.email);
      if (data) {
        responseHelper.handleError(CONFLICT, `User with ${req.body.email} already exist`);
        return responseHelper.response(res);
      }

      const user = await userHelper.saveUser(req.body, generatedPassword, document, req.user.id);
      const session = await sessionHelper.generateSession(user.id, user.userName, user.email, user.isVerified);

      const url = `${process.env.FRONTEND_URL}/verify-user-account/${session}`;
      emailService.sendVerifyAccountEmail(url, generatedPassword, 'Sir/Madam', user.email);

      responseHelper.handleSuccess(CREATED, 'User account created successfully, Please Check email !! we have emailed you a link to verify your account.', { user });
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle verifyAccount.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} response.
     */
  static async verifyAccount(req, res) {
    try {
      const data = await sessionHelper.sessionExist('session', req.params.session);
      if (!data) {
        responseHelper.handleError(NOT_FOUND, 'Invalid/Expired verification link.');
        return responseHelper.response(res);
      }

      const user = await userHelper.verifyUserProfile(data.userId);
      await sessionHelper.destroySession('userId', data.userId);

      const url = `${process.env.FRONTEND_URL}/login-user`;
      await emailService.sendSuccessEmail(url, 'Sir/Madam', user.email);

      responseHelper.handleSuccess(OK, 'User account has verified successfully. You can login now.', { user });
      return responseHelper.response(res);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.toString()
      });
    }
  }

  /**
     * Handle resentVerificationLink.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} response.
     */
  static async sentVerificationLink(req, res) {
    try {
      const user = await userHelper.userExist('email', req.body.email);
      if (!user) {
        responseHelper.handleError(NOT_FOUND, 'Email not found, Check well your email.');
        return responseHelper.response(res);
      }

      let emailMessage = null;
      const session = await sessionHelper.generateSession(user.id, user.userName, user.email, user.isVerified);

      if (req.params.action === 'verifyAccount') {
        if (user.isVerified === true) {
          responseHelper.handleError(BAD_REQUEST, 'User account already verified.');
          return responseHelper.response(res);
        }
        emailMessage = 'verify your account';
        const url = `${process.env.FRONTEND_URL}/verify-user-account/${session}`;
        await emailService.sendVerificationLinkEmail(url, 'Sir/Madam', user.email);
      }

      if (req.params.action === 'resetPassword') {
        emailMessage = 'reset your password account';
        const url = `${process.env.FRONTEND_URL}/reset-user-password/${session}`;
        await emailService.sendVerificationLinkEmail(url, 'Sir/Madam', user.email);
      }

      responseHelper.handleSuccess(OK, `Email sent successfully, Please Check email !! we have emailed you a link to ${emailMessage}. If you dont get an email, Please click resend button Link.`);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle loginUser.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} response.
     */
  static async loginUser(req, res) {
    try {
      const passwordExist = await passwordHelper.checkPassword(req.body.password, req.user.password);
      if (!passwordExist) {
        responseHelper.handleError(UNAUTHORIZED, 'Email or password incorrect');
        return responseHelper.response(res);
      }

      const data = { session: await sessionHelper.generateSession(req.user.id, req.user.userName, req.user.email, req.user.isVerified), user: req.user };
      responseHelper.handleSuccess(OK, 'User logged in successfully', data);
      return responseHelper.response(res);
    } catch (error) {
      responseHelper.handleError(INTERNAL_SERVER_ERROR, error.toString());
      return responseHelper.response(res);
    }
  }

  /**
     * Handle logoutUser.
     * @param {object} req user request.
     * @param {object} res data response.
     * @returns {object} response.
     */
  static async logoutUser(req, res) {
    try {
      await sessionHelper.destroySession('userId', req.user.id);
      responseHelper.handleSuccess(OK, 'User logged out successfully');
      return responseHelper.response(res);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        data: error.toString(),
      });
    }
  }
}

export default AuthController;
