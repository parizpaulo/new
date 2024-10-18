import { z } from 'zod';

export const UserCreateDTO = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('E-mail inválido'),
  age: z.number().min(18, '+18'),
});
