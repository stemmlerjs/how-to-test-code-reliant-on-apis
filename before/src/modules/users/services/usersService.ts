

export class UsersService {

  public static validateEmail (email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  public static validatePassword (password: string) {
    return password.length >= 6;
  }

  public static validateFirstName (firstName: string) {
    return firstName.length >= 2;
  }

  public static validateLastName (lastName: string) {
    return lastName.length >= 2;
  }
  
}