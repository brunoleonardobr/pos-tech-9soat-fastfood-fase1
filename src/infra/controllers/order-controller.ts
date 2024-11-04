import Checkout from "../../application/usecases/order/checkout";
import ListOrders from "../../application/usecases/order/list-orders";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";
import CheckoutDTO from "./dto/checkout.dto";

export default class OrderController {
  @inject("httpServer")
  httpServer?: HttpServer;
  @inject("checkout")
  checkout?: Checkout;
  @inject("listOrders")
  listOrders?: ListOrders;

  constructor() {
    this.httpServer?.register(
      "post",
      "/checkout",
      async (params: any, body: CheckoutDTO) => {
        const checkoutDTO = new CheckoutDTO(body.items, body.clientId);
        const order = await this.checkout?.execute(checkoutDTO);
        return { message: "Order created successfully", order };
      }
    );
    this.httpServer?.register("get", "/orders", async () => {
      const orders = await this.listOrders?.execute();
      return orders;
    });
  }
}
