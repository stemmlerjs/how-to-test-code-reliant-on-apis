import { Nothing } from "../../../shared/types"; 
import { User } from "../domain/user";

export class FirebaseUserRepo {

  constructor () {
    // Here's where I'd set up my firebase instance
  }

  async findByEmail (email: string): Promise<User | Nothing> {
    // And I'd use the firebase api to find the user by email

    return '';
  }

  async save (user: User): Promise<any> {
    // And I'd save the user to firebase in this method.
  }

}