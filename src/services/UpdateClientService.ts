import AppError from '../errors/AppError';
import IClientRepository from '../Interfaces/IClientRepository';
import Client from '../models/Client';
import ClientRepository from '../repositories/ClientRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

class UpdateClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute({
    id,
    name,
    email,
    phone,
    cpf,
  }: IRequest): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Cliente não encontrado', 404);
    }

    if (email !== client.email) {
      const clientVerify = this.clientRepository.findByEmail(email);

      if (clientVerify) {
        throw new AppError('Email já se encontra em uso', 302);
      }
    }

    client.name = name;
    client.email = email;
    client.phone = phone;
    client.cpf = cpf;

    await this.clientRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
