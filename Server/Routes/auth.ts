import express from 'express';
const router = express.Router();
import passport from 'passport';

import User from "../Models/user";
import { UserDisplayName } from '../Util/index';

import { DisplayLoginPage, DisplayRegisterPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/auth';

/********************* Authentication Routes **********************/
/* GET Login page. */
router.get("/login", DisplayLoginPage);

/* Process the Login request */
router.post('/login', ProcessLoginPage);

/* GET Register page. */
router.get('/register', DisplayRegisterPage);

/* Process the Register request */
router.post('/register', ProcessRegisterPage);
  
/* Process the logout request */
router.get('/logout', ProcessLogoutPage);

/******************************************************/
export default router;