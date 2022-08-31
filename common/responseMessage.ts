type ResponseMessage = {
  data: any;
  status: "success" | "error";
  message: "OK" | string;
  errors: string[];
};

const getResponseMessage = (): ResponseMessage => {
  return {
    data: null,
    status: "success",
    message: "OK",
    errors: [],
  };
};
const responseMessage: ResponseMessage = {
  data: null,
  status: "success",
  message: "OK",
  errors: [],
};

export { getResponseMessage };
