import Cookie from "js-cookie";

export default {
  state: {
    token: "",
  },
  mutations: {
    setToken(state, val) {
      state.token = val;
      console.log(val, "setToken");
      Cookie.set("token", val);
      sessionStorage.setItem("token", val);
    },
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
      sessionStorage.removeItem("token");
    },
    getToken(state) {
      console.log(state.token, "1");
      console.log(Cookie.get("token"), "3");
      console.log(sessionStorage.getItem("token"), "2");

      state.token =
        state.token || Cookie.get("token") || sessionStorage.getItem("token");
    },
  },
};
