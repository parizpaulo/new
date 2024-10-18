import { UserService } from './user-service';
import { UserEntity } from './user-entity';
import { UserCreateDTO } from './dto/user-create.dto';
import { useValidate } from '../../../composables/use-validate';
import { ValidationErrorException } from '../../../utils/validation-error-exception';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(data: UserEntity): Promise<UserEntity | Error> {
    const { errors } = await useValidate().schema(UserCreateDTO).form(data);

    if (errors) throw new ValidationErrorException(errors);

    return this.userService.create(data);
  }

  async getAll(): Promise<UserEntity[] | Error> {
    return this.userService.getAll();
  }
}
