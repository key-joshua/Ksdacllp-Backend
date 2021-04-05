import Router from 'express';
import multiparty from 'connect-multiparty';
import paginate from '../middlewares/paginateMiddleware';
import userController from '../controllers/userController';
import { verifySesion } from '../middlewares/verifyMiddlewares';
import { validateEditUser } from '../middlewares/schemaMiddleware';

const multipart = multiparty();
const router = Router();
router
  .delete('/remove-user/:userId', verifySesion, userController.removeUser)
  .get('/view-users', verifySesion, userController.viewUsers, paginate.paginatedRetrievedData)
  .patch('/edit-user/:userId', verifySesion, multipart, validateEditUser, userController.updateUser)
  .patch('/edit-profile', verifySesion, multipart, validateEditUser, userController.updateUserProfile);

export default router;
