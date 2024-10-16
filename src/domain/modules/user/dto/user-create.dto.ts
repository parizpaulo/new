import { z } from 'zod';

export const UserCreateDTO = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(18),
});
