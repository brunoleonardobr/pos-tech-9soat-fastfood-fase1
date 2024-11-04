import { CreateProduct, UpdateProduct } from "../../application/usecases";
import ListProductsByCategory from "../../application/usecases/product/list-products-by-category";
import DeleteProduct from "../../application/usecases/product/remove-product";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";
import CreateProductDTO from "./dto/create-product.dto";
import DeleteProductParamDTO from "./dto/delete-product-param.dto";
import ListProductByCategoryDTO from "./dto/list-product-by-category.dto";
import UpdateProductParamDTO from "./dto/update-product-param.dto";
import UpdateProductDTO from "./dto/update-product.dto";

export default class ProductsController {
  @inject("httpServer")
  httpServer?: HttpServer;
  @inject("createProduct")
  createProduct?: CreateProduct;
  @inject("updateProduct")
  updateProduct?: UpdateProduct;
  @inject("deleteProduct")
  deleteProduct?: DeleteProduct;
  @inject("listProductsByCategory")
  listProductsByCategory?: ListProductsByCategory;

  constructor() {
    this.httpServer?.register(
      "post",
      "/product",
      async (params: any, body: any) => {
        const createProductDTO = new CreateProductDTO(
          body.description,
          body.price,
          body.category
        );
        const product = await this.createProduct?.execute({
          ...createProductDTO,
        });
        return { message: "Product created successfully", product };
      }
    );
    this.httpServer?.register(
      "patch",
      "/product/:id",
      async (params: UpdateProductParamDTO, body: UpdateProductDTO) => {
        const { id } = params;
        const updateProductDTO = new UpdateProductDTO(
          body.description,
          body.price,
          body.category
        );
        const updateProductParamDTO = new UpdateProductParamDTO(id);
        await this.updateProduct?.execute({
          id: updateProductParamDTO.id,
          ...updateProductDTO,
        });
        return { message: "Product updated successfully" };
      }
    );
    this.httpServer?.register(
      "delete",
      "/product/:id",
      async (params: DeleteProductParamDTO, body: any) => {
        const deleteProductParamDTO = new DeleteProductParamDTO(params.id);
        await this.deleteProduct?.execute({ id: deleteProductParamDTO.id });
        return { message: "Product deleted successfully" };
      }
    );
    this.httpServer?.register(
      "get",
      "/product/:category",
      async (params: ListProductByCategoryDTO, body: any) => {
        const listProductsByCategoryDTO = new ListProductByCategoryDTO(
          params.category
        );
        const products = await this.listProductsByCategory?.execute({
          category: listProductsByCategoryDTO.category,
        });
        return { products };
      }
    );
  }
}
