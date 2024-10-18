import { defineStore } from 'pinia';
import { UserEntity } from './user-entity';
import { UserController } from './user-controller';
import { ValidationErrorException } from '../../../utils/validation-error-exception';

const userController = new UserController();

interface UserState {
  users: UserEntity[];
  errors: Partial<UserEntity>;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    errors: {},
  }),

  getters: {
    getUsers: (state) => state.users,
    getErrors: (state) => state.errors,
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
  },
});
