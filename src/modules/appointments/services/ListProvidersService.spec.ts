import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Juca',
      email: 'juca@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jeca',
      email: 'jeca@email.com',
      password: '123456',
    });

    const loggedUser = await await fakeUsersRepository.create({
      name: 'Euuu Logado',
      email: 'euuu@email.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
