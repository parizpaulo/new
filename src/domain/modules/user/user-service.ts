import axios from 'axios';
import { UserEntity } from './user-entity';

export class UserService {
  async create(data: UserEntity) {
    return axios.post('/user', data);
  }

  async getAll() {
    return axios.get('users');
  }

  async getById(id: number) {
    return axios.get(`users${id}`);
  }
}
