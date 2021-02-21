import CreateClientDTO from '../dtos/CreateClientDTO';
import Client from '../models/Client';

export default interface IClientRepository {
  findAll(): Promise<Client[]>;
  findAllPaginated(page: number): Promise<[Client[], number]>;
  findAllByName(name: string): Promise<Client[]>;
  findById(id: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  create(createClientDto: CreateClientDTO): Promise<Client>;
  save(client: Client): Promise<Client>;
  delete(id: string): Promise<void>;
}
