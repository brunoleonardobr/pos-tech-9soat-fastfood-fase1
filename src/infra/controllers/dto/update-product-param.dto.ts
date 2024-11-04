export default class UpdateProductParamDTO {
  constructor(readonly id: string) {
    this.validate();
  }
  private validate() {
    if (!this.id) {
      throw new Error("Id is required");
    }
  }
}
