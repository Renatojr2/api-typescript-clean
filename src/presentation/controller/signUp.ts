import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamErro } from '../erros/missing-param-erro';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return { statusCode: 400, body: new MissingParamErro('name') };
    }
    if (!httpRequest.body.email) {
      return { statusCode: 400, body: new MissingParamErro('email') };
    }
  }
}
