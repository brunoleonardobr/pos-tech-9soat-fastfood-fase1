import { ERROR_MESSAGES } from "../../../application/enums/error-messages.enum";
import InvalidParameterException from "../../../application/exceptions/invalid-parameter.exception";

export class CreateCustomerDTO {
  constructor(
    readonly cpf: string,
    readonly name: string,
    readonly email: string
  ) {
    this.validate();
  }
  private validate() {
    if (!this.cpf) {
      throw new InvalidParameterException(ERROR_MESSAGES.CPF_REQUIRED);
    }
    if (this.cpf.length !== 11) {
      throw new InvalidParameterException(ERROR_MESSAGES.INVALID_CPF);
    }
    if (!this.name) {
      throw new InvalidParameterException(ERROR_MESSAGES.NAME_REQUIRED);
    }
    if (!this.email) {
      throw new InvalidParameterException(ERROR_MESSAGES.EMAIL_REQUIRED);
    }
  }
}
