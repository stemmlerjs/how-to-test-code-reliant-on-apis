
import { Result } from "../../../shared/core/result"
import { ValueObject } from "../../../shared/domain/valueObject"

interface LastNameProps {
  value: string;
}

export class LastName extends ValueObject<LastNameProps> {

  private constructor (props: LastNameProps) {
    super(props);
  }

  public static isValidLastName (lastName: string) {
    return lastName.length >= 2;
  }

  public static create (lastName: string): Result<LastName> {
    if (!this.isValidLastName(lastName)) {
      return Result.fail<LastName>('Invalid LastName')
    }

    return Result.ok<LastName>(new LastName({ value: lastName }))
  }

}