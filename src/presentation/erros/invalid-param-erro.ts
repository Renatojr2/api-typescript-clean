export class InvalidParamErro extends Error {
  constructor(paramName) {
    super(`Invalid param: ${paramName}`);
    this.name = 'InvalidParamErro';
  }
}
