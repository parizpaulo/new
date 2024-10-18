import { UserEntity } from './user-entity';
import useAxios from '../../../utils/use-axios';

const { post, get } = useAxios;

export class UserService {
  async create(data: UserEntity): Promise<UserEntity | Error> {
    const response = await post('/users', data);
    return response.data as UserEntity;
  }

  async getAll(): Promise<UserEntity[] | Error> {
    const response = await get('/users');
    return response.data as UserEntity[];
  }

  async getById(id: number): Promise<UserEntity | Error> {
    const response = await get(`/users/${id}`);
    return response.data as UserEntity;
  }
}
