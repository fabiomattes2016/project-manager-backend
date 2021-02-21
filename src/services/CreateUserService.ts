import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import IUserRepository from '../Interfaces/IUserRepository';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ name, email, password }: Request): Promise<User> {
    const passwordHash = await hash(password, 8);

    const userVerify = this.userRepository.findByEmail(email);

    if (userVerify) {
      throw new AppError('Usuário já cadastrado', 302);
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserService;
