export default class ListProductByCategoryDTO {
  constructor(readonly category: string) {
    this.validate();
  }
  private validate() {
    if (!this.category) {
      throw new Error("Category is required");
    }
  }
}
