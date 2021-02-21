import { Request, Response } from 'express';
import ClientRepository from '../repositories/ClientRepository';
import CreateClientService from '../services/CreateClientService';
import DeleteClientService from '../services/DeleteClientService';
import PaginationClientService from '../services/PaginationClientService';
import UpdateClientService from '../services/UpdateClientService';

class ClientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const clientRepository = new ClientRepository();
    const clients = await clientRepository.findAll();

    return response.status(200).json(clients);
  }

  public async paginated(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page } = request.query;
    const clientRepository = new ClientRepository();
    const clientsPaginated = new PaginationClientService(clientRepository);
    const clients = await clientsPaginated.execute({
      page: page !== undefined ? parseInt(page.toString(), 10) : 0,
    });

    return response.status(200).json(clients);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const clientRepository = new ClientRepository();
    const clients = await clientRepository.findAllByName(
      name?.toString() || '',
    );

    return response.status(200).json(clients);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, cpf } = request.body;
    const clientRepository = new ClientRepository();
    const createClient = new CreateClientService(clientRepository);

    const client = await createClient.execute({ name, email, phone, cpf });

    return response.status(201).json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone, cpf } = request.body;
    const clientRepository = new ClientRepository();
    const updateClient = new UpdateClientService(clientRepository);

    const client = await updateClient.execute({ id, name, email, phone, cpf });

    return response.status(200).json(client);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const clientRepository = new ClientRepository();
    const deleteClient = new DeleteClientService(clientRepository);

    await deleteClient.execute(id);

    return response.status(200).json();
  }
}

export default ClientController;
