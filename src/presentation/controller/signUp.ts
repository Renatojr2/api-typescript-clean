import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamErro } from '../erros/missing-param-erro';
import { badRequest } from '../helpers/http-helper';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamErro('name'));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamErro('email'));
    }
  }
}
