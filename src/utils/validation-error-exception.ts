export class ValidationErrorException extends Error {
  public validationErrors: { [key: string]: string | null };

  constructor(errors: { [key: string]: string | null }) {
    super('Validation Error');
    this.name = 'ValidationErrorException';
    this.validationErrors = errors;
  }
}
