import { defineStore } from 'pinia';
import { UserEntity } from './user-entity';
import { UserController } from './user-controller';

const userController = new UserController();

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: '',
      email: '',
      age: 0,
    } as UserEntity,
  }),

  getters: {
    getUser: (state) => state.user,
  },

  actions: {
    async create(user: UserEntity) {
      await userController.create(user);
    },
  },
});
