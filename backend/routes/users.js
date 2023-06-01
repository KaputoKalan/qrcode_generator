import express from 'express'
import { createNewUser, getUser } from '../controller/UserController.js'

const router = express.Router()

/**
 * Route: /
 * Method: POST
 * Description: Creates a new user
 */
router.route('/').post(createNewUser)

/**
 * Route: /
 * Method: GET
 * Description: Retrieves all users
 */
router.route('/').get(getUser)

/**
 * Route: /:email
 * Method: GET
 * Description: Retrieves a user by email
 */
router.route('/:email').get(getUser)

export default router
