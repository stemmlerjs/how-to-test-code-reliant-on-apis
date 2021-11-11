import { Nothing } from "../../../shared/types";
import { User } from "../domain/user";
import { IUserRepo } from "../repos/userRepo";

export class UserRepoSpy implements IUserRepo {

  private users: User[];
  private timesSaveCalled: number;

  constructor (users: User[]) {
    this.users = users;
    this.timesSaveCalled = 0;
  }

  async findByEmail (email: string): Promise<User | Nothing> {
    const found = this.users.find((u) => u.getEmail().getValue() === email);

    if (!found) {
      return ''
    }

    return found;
  }

  async save (user: User): Promise<any> {
    this.timesSaveCalled++;
  }

  getTimesSaveCalled (): number {
    return this.timesSaveCalled;
  }
}