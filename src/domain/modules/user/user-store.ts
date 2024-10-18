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
    getUser: (state) => state.users,
    getErrors: (state) => state.errors,
  },

  actions: {
    async create(user: UserEntity) {
      try {
        await userController.create(user);
      } catch (error) {
        if (error instanceof ValidationErrorException) {
          this.errors = error.validationErrors;
        }

        return error;
      }
    },
  },
});
