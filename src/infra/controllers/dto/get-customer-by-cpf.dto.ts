export default class GetCustomerByCpfDTO {
  constructor(readonly cpf: string) {
    this.validate();
  }
  private validate() {
    if (!this.cpf) {
      throw new Error("CPF is required");
    }
  }
}
