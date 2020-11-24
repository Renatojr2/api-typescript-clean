import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamErro } from '../erros/missing-param-erro';
import { InvalidParamErro } from '../erros/invalid-param-erro';
import { badRequest } from '../helpers/http-helper';
import { Validator } from '../protocols/emailValidator';
import { ServerErro } from '../erros/server_error';

export class SignUpController implements Controller {
  private readonly emailValidator: Validator;
  constructor(emailValidator: Validator) {
    this.emailValidator = emailValidator;
  }
  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (let field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamErro(field));
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamErro('email'));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerErro(),
      };
    }
  }
}
