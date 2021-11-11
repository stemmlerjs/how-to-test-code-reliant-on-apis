
import * as express from 'express'
import { User } from '../../domain/user';
import { firebaseUserRepo } from '../../repos';
import { UsersService } from '../../services/usersService'

export async function createUser (req: express.Request, res: express.Response) {
  let body = req.body;

    // Check to see if firstname, lastname, password, email is in the request
    const isFirstNamePresent = body.firstName
    const isLastNamePresent = body.lastName;
    const isEmailPresent = body.email;
    const isPasswordPresent = body.password;

    // If not, end the request
    if (!isFirstNamePresent || !isEmailPresent || !isLastNamePresent || !isPasswordPresent) {
      return res.status(400).json({ 
        message: `Either 'firstName', 'lastName', 'email' or 'password not present`
      })
    }

    // Check to see if already registered
    const existingUser = await firebaseUserRepo.findByEmail(body.email);
        
    // If already registered, return AlreadyRegisteredError
    if (existingUser) {
      return res.status(409).json({
        type: `AlreadyRegisteredError`,
        message: 'User already registered'
      })
    }

    let errorMessage;

    // Validation logic
    if (UsersService.validateFirstName(body.firstName)) {
      errorMessage = 'Invalid firstName';
    }

    if (UsersService.validateLastName(body.lastName)) {
      errorMessage = 'Invalid lastName';
    }

    if (UsersService.validateEmail(body.email)) {
      errorMessage = 'Invalid email';
    }

    if (UsersService.validatePassword(body.password)) {
      errorMessage = 'Invalid password';
    }

    // If invalid props, return InvalidUserDetailsError
    if (errorMessage) {
      return res.status(400).json({
        type: 'InvalidUserDetailsError',
        message: errorMessage
      })
    }

    // Create user
    let user: User = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    }

    // Save user to database
    try {
      await firebaseUserRepo.save(user);
    } catch (err) {

      // Log this to monitoring or logging plugin but don't return
      // the backend error to the client.

      return res.status(500).json({
        message: 'Unexpected error occurred'
      })
    }

    return res.status(201).json({
      type: 'CreateUserSuccess',
      message: 'Success'
    })
}

