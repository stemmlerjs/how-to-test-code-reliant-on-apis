
import { FirebaseUserRepo } from "../../repos/firebaseUserRepo";
import { CreateUser } from "./createUser";
import { CreateUserController } from "./createUserController";

const firebaseUserRepo = new FirebaseUserRepo();

const createUser = new CreateUser(firebaseUserRepo)

const createUserController = new CreateUserController(createUser);

export {
  createUserController
}