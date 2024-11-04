export default class DeleteProductParamDTO {
  constructor(readonly id: string) {
    this.validate();
  }
  private validate() {
    if (!this.id) {
      throw new Error("Id is required");
    }
  }
}
