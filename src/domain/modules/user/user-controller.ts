import { UserService } from './user-service';
import { UserEntity } from './user-entity';
import { UserCreateDTO } from './dto/user-create.dto';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async create(data: UserEntity) {
    const user = UserCreateDTO.parse(data);

    if (!user) throw new Error('Error create user');

    await this.userService.create(data);
  }
}
