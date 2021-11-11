
import { Guard } from "../../../shared/core/guard";
import { Result } from "../../../shared/core/result";
import { Entity } from "../../../shared/domain/entity";
import { Email } from "./email";
import { FirstName } from "./firstName";
import { LastName } from "./lastName";
import { Password } from "./password";

interface UserProps {
  email: Email;
  firstName: FirstName; 
  lastName: LastName;
  password: Password;
}

export class User extends Entity<UserProps> {

  getEmail (): Email {
    return this.props.email;
  }

  private constructor (props: UserProps) {
    super(props);
  }

  public static create (userProps: UserProps): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: userProps.email, argumentName: 'email' },
      { argument: userProps.firstName, argumentName: 'firstName' },
      { argument: userProps.lastName, argumentName: 'lastName' },
      { argument: userProps.password, argumentName: 'password' },
    ]);
    
    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message as string)
    }

    return Result.ok<User>(new User(userProps));
  }

}