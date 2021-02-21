import { request } from 'express';
import { Repository, getRepository, Like } from 'typeorm';
import CreateClientDTO from '../dtos/CreateClientDTO';
import IClientRepository from '../Interfaces/IClientRepository';
import Client from '../models/Client';

class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAllByName(name: string): Promise<Client[]> {
    return this.ormRepository.find({
      name: Like(`%${name}%`),
    });
  }

  public async findAllPaginated(page: number): Promise<[Client[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10,
    });
  }

  public async findAll(): Promise<Client[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Client> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Client> {
    const client = await this.ormRepository.findOne({
      where: { email },
    });

    return client;
  }

  public async create({
    name,
    email,
    phone,
    cpf,
  }: CreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({ name, email, phone, cpf });
    await this.ormRepository.save(client);

    return client;
  }

  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }
}

export default ClientRepository;
