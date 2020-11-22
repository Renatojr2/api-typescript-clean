import { SignUpController } from './signUp';
import { MissingParamErro } from '../erros/missing-param-erro';

//Factory
const makeSut = (): SignUpController => {
  return new SignUpController();
};

describe('signUp Controller', () => {
  test('Should return 400 if no name is provider', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamErro('name'));
  });

  test('Should return 400 if no email is provider', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamErro('email'));
  });

  test('Should return 400 if no password is provider', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_@email',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamErro('password'));
  });

  test('Should return 400 if no passwordConfirmation is provider', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_@email',
        password: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamErro('passwordConfirmation')
    );
  });
});
