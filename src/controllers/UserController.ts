import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService';
import EnableUserService from '../services/EnableUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.status(201).json(user);
  }

  public async enable(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userRepository = new UserRepository();
    const enableUser = new EnableUserService(userRepository);

    const user = await enableUser.execute({ id });

    delete user.password;

    return response.status(200).json(user);
  }
}

export default UserController;
