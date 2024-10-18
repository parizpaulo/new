import { ZodSchema, ZodError } from 'zod';

interface ValidateResult {
  errors: { [key: string]: string | null } | null;
}

export function useValidate() {
  let schema: ZodSchema<any>;

  const setSchema = (newSchema: ZodSchema<any>) => {
    schema = newSchema;

    return {
      form: async (formData: any): Promise<ValidateResult> => {
        try {
          schema.parse(formData);

          return { errors: null };
        } catch (error) {
          const errors: { [key: string]: string | null } = {};
          if (error instanceof ZodError) {
            error.errors.forEach((err) => {
              const field: string = err.path.join('.');

              const errorMessage = err.message;
              errors[field] = errorMessage;
            });
          }

          return { errors };
        }
      },
    };
  };

  return {
    schema: setSchema,
  };
}
