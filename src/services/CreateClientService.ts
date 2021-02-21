import AppError from '../errors/AppError';
import IClientRepository from '../Interfaces/IClientRepository';
import Client from '../models/Client';
import ClientRepository from '../repositories/ClientRepository';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

class CreateClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute({ name, email, phone, cpf }: IRequest): Promise<Client> {
    const verifyClient = await this.clientRepository.findByEmail(email);

    if (verifyClient) {
      throw new AppError('Este email já se encontra em uso', 302);
    }

    const client = await this.clientRepository.create({
      name,
      email,
      phone,
      cpf,
    });

    return client;
  }
}

export default CreateClientService;
