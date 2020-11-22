import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamErro } from '../erros/missing-param-erro';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
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
  }
}
