import { SignUpController } from './signUp';
import { MissingParamErro } from '../erros/missing-param-erro';
import { InvalidParamErro } from '../erros/invalid-param-erro';
import { Validator } from '../protocols/emailValidator';
import { ServerErro } from '../erros/server_error';

interface SignType {
  sut: SignUpController;
  emailValidatorStub: Validator;
}
//Factory
const makeSut = (): SignType => {
  class EmailValidatorStub implements Validator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('signUp Controller', () => {
  test('Should return 400 if no name is provider', () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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

  test('Should return 400 if an invalid email provider', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_@email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamErro('email'));
  });

  test('Should call EmailValidator with corret email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_@email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toBeCalledWith('any_@email');
  });

  test('Should return 500 if EmailValidator throw', () => {
    class EmailValidatorStub implements Validator {
      isValid(email: string): boolean {
        throw new Error();
      }
    }
    const emailValidator = new EmailValidatorStub();
    const sut = new SignUpController(emailValidator);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_@email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerErro());
  });
});
