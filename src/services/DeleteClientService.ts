import AppError from '../errors/AppError';
import IClientRepository from '../Interfaces/IClientRepository';
import ClientRepository from '../repositories/ClientRepository';

class DeleteClientService {
  private clientRepository: IClientRepository;

  constructor(clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError('Cliente não encontrado', 404);
    }

    await this.clientRepository.delete(id);
  }
}

export default DeleteClientService;
