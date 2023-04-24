import axiosHttp from "./axiosHttp";

export const getUser = () => {
  return axiosHttp.request({
    url: "/busComments",
    method: "get",
  });
};

export const login = (param) => {
  console.log(param, "login");
  return axiosHttp.request({
    url: "/login/verify",
    method: "post",
    params: {
      Account: param.Account,
      Password: param.Password,
    },
  });
};

export const getSideBar = () => {
  return axiosHttp.request({
    url: "/userInfo",
    method: "post",
  });
};

export const registerUser = (param) => {
  console.log(param, "fdsfa");
  console.log(param.Name, "up");
  return axiosHttp.request({
    url: "/login/sign",
    method: "post",
    params: {
      Name: param.Name,
      Account: param.Account,
      Password: param.Password,
    },
  });
};
