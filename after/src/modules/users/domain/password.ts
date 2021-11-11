
import { Result } from "../../../shared/core/result"
import { ValueObject } from "../../../shared/domain/valueObject"

interface PasswordProps {
  value: string;
}

export class Password extends ValueObject<PasswordProps> {

  private constructor (props: PasswordProps) {
    super(props);
  }

  public static isValidPassword (password: string) {
    return password.length >= 2;
  }

  public static create (password: string): Result<Password> {
    if (!this.isValidPassword(password)) {
      return Result.fail<Password>('Invalid Password')
    }

    return Result.ok<Password>(new Password({ value: password }))
  }

}