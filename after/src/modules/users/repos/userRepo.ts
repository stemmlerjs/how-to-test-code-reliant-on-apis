
import { Nothing } from "../../../shared/types";
import { User } from "../domain/user";

export interface IUserRepo {
  findByEmail (email: string): Promise<User | Nothing>;
  save (user: User): Promise<any>;
}