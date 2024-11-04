import CreateCustomer from "../../application/usecases/customer/create-customer";
import GetCustomerByCpf from "../../application/usecases/customer/get-customer-by-cpf";
import { inject } from "../di/registry";
import HttpServer from "../http/http-server";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import GetCustomerByCpfDTO from "./dto/get-customer-by-cpf.dto";

export default class CustomerController {
  @inject("httpServer")
  httpServer?: HttpServer;
  @inject("createCustomer")
  createCustomer?: CreateCustomer;
  @inject("getCustomerByCpf")
  getCustomerByCpf?: GetCustomerByCpf;

  constructor() {
    this.httpServer?.register(
      "post",
      "/customer",
      async (params: any, body: CreateCustomerDTO) => {
        const createCustomerDTO = new CreateCustomerDTO(
          body.cpf,
          body.name,
          body.email
        );
        const customer = await this.createCustomer?.execute(createCustomerDTO);
        return { message: "Customer created successfully", customer };
      }
    );

    this.httpServer?.register(
      "get",
      "/customer/:cpf",
      async (params: GetCustomerByCpfDTO, body: any) => {
        const getCustomerByCpfDTO = new GetCustomerByCpfDTO(params.cpf);
        const customer = await this.getCustomerByCpf?.execute({
          cpf: getCustomerByCpfDTO.cpf,
        });
        return { message: "Customer found", customer };
      }
    );
  }
}
