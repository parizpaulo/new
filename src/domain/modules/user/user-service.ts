import { UserEntity } from './user-entity';
import useAxios from '../../../utils/useAxios';

const { post, get } = useAxios;

export class UserService {
  async create(data: UserEntity) {
    return post('/users', data);
  }

  async getAll() {
    return get('users');
  }

  async getById(id: number) {
    return get(`users${id}`);
  }
}
