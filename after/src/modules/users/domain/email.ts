import { Result } from "../../../shared/core/result"
import { ValueObject } from "../../../shared/domain/valueObject"

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {

  getValue () {
    return this.props.value;
  }

  private constructor (props: EmailProps) {
    super(props);
  }

  public static isValidEmail (email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  public static create (email: string): Result<Email> {
    if (!this.isValidEmail(email)) {
      return Result.fail<Email>('Invalid email')
    }

    return Result.ok<Email>(new Email({ value: email }))
  }

}