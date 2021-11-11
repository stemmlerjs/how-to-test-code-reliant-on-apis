
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { IUserRepo } from '../../repos/userRepo';
import { CreateUser, CreateUserResult } from './createUser'
import { UserRepoSpy } from '../../testObjects/userRepoSpy'

const feature = loadFeature(path.join(__dirname, './createUser.feature'));

defineFeature(feature, test => {
  let result: CreateUserResult;

  let email: string;
  let password: string;
  let firstName: string;
  let lastName: string;

  let createUser: CreateUser;
  let userRepoSpy: UserRepoSpy;

  beforeEach(() => {
    createUser = undefined;
    userRepoSpy = undefined;
  })

  test('Creating a user', ({ given, when, then }) => {
    
    given('I provide valid user details', () => {
      // Arrange
      email = 'khalil@khalilstemmler.com';
      password = 'hello'
      firstName = 'khalil'
      lastName = 'stemmler';

      userRepoSpy = new UserRepoSpy([]);

      createUser = new CreateUser(userRepoSpy);
    });

    when('I attempt to create a user', async () => {
      // Act
      result = await createUser.execute({ email, password, firstName, lastName });
    });

    then('the user should be saved successfully', () => {
      // Assert
      expect(result.type).toEqual('CreateUserSuccess');
      expect(userRepoSpy.getTimesSaveCalled()).toEqual(1);
    });

  });

  test('Invalid password', ({ given, when, then }) => {
    given('I provide an invalid password', () => {
      email = 'khalil@khalilstemmler.com';
      password = ''
      firstName = 'khalil'
      lastName = 'stemmler';

      userRepoSpy = new UserRepoSpy([]);

      createUser = new CreateUser(userRepoSpy);
    });

    when('I attempt to create a user', async () => {
      result = await createUser.execute({ email, password, firstName, lastName });
    });

    then('I should get an invalid details error', () => {
      // Assert
      expect(result.type).toEqual('InvalidUserDetailsError')
      expect(userRepoSpy.getTimesSaveCalled()).toEqual(0);
    });
  });
});