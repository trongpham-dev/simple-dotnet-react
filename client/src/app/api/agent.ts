import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:5011/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        history.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => request.get("Products"),
  details: (id: number) => request.get(`Products/${id}`),
};

const TestErrors = {
  get400Error: () => request.get("Buggy/bad-request"),
  get401Error: () => request.get("Buggy/unauthorised"),
  get404Error: () => request.get("Buggy/not-found"),
  get500Error: () => request.get("Buggy/server-error"),
  getValidationError: () => request.get("Buggy/validation-error"),
};

const Basket = {
  get: () => request.get("basket"),
  addItem: (productId: number, quantity = 1) =>
    request.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    request.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  Catalog,
  TestErrors,
  Basket,
};

export default agent;
