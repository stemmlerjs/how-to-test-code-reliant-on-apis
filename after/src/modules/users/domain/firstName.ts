
import { Result } from "../../../shared/core/result"
import { ValueObject } from "../../../shared/domain/valueObject"

interface FirstNameProps {
  value: string;
}

export class FirstName extends ValueObject<FirstNameProps> {

  private constructor (props: FirstNameProps) {
    super(props);
  }

  public static isValidFirstName (firstName: string) {
    return firstName.length >= 2;
  }

  public static create (firstName: string): Result<FirstName> {
    if (!this.isValidFirstName(firstName)) {
      return Result.fail<FirstName>('Invalid FirstName')
    }

    return Result.ok<FirstName>(new FirstName({ value: firstName }))
  }

}