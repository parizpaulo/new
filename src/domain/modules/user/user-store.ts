import { defineStore } from 'pinia';
import { UserEntity } from './user-entity';
import { UserController } from './user-controller';
import { ValidationErrorException } from '../../../utils/validation-error-exception';

const userController = new UserController();

interface UserState {
  users: UserEntity[];
  userSelected: Partial<UserEntity>;
  errors: Partial<UserEntity>;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    userSelected: {},
    errors: {},
  }),

  getters: {
    getUsers: (state) => state.users,
    getErrors: (state) => state.errors,
    getUserSelected: (state) => state.userSelected,
  },

  actions: {
    async create(user: UserEntity) {
      try {
        const result = await userController.create(user);

        this.users.push(result as UserEntity);
      } catch (error) {
        if (error instanceof ValidationErrorException) {
          this.errors = error.validationErrors;
        }

        return error;
      }
    },

    async fetchGetUsers() {
      const users = await userController.getAll();

      this.users = users as UserEntity[];
    },

    async deleteUser(id: number) {
      await userController.delete(id);
      this.users = this.users.filter((user) => user.id !== id);
    },

    async getUserById(id: number) {
      const user = await userController.getById(id);

      this.userSelected = user;
    },
  },
});
