import { Category } from "../../../application/enums/category.enum";
import { ERROR_MESSAGES } from "../../../application/enums/error-messages.enum";
import InvalidParameterException from "../../../application/exceptions/invalid-parameter.exception";

export default class CreateProductDTO {
  constructor(
    readonly description: string,
    readonly price: number,
    readonly category: Category
  ) {
    this.validate();
  }
  private validate() {
    if (!this.description || this.description.trim() === "") {
      throw new InvalidParameterException(ERROR_MESSAGES.DESCRIPTION_REQUIRED);
    }
    if (!this.price || typeof this.price !== "number") {
      throw new InvalidParameterException(ERROR_MESSAGES.PRICE_INVALID);
    }
    if (!this.category || !Object.values(Category).includes(this.category)) {
      throw new InvalidParameterException(ERROR_MESSAGES.CATEGORY_INVALID);
    }
  }
}
