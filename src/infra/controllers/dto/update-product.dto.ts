export default class UpdateProductDTO {
  constructor(
    readonly description: string,
    readonly price: number,
    readonly category: string
  ) {}
}
