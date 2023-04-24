import Cookie from "js-cookie";
export default {
  state: {
    //页面收缩
    isCollapse: false,
    tabsList: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    currentMenu: null,
    menu: [],
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val;
        const result = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          state.tabsList.push(val);
        }
      } else {
        state.currentMenu = null;
      }
    },
    closeTag(state, val) {
      const result = state.tabsList.findIndex((item) => item.name == val.name);

      state.tabsList.splice(result, 1);
    },
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
      sessionStorage.setItem("menu", JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
      sessionStorage.removeItem("menu");
    },
    addMenu(state, router) {
      console.log(sessionStorage.getItem("menu"), "session");
      if (!Cookie.get("menu") && !sessionStorage.getItem("menu")) {
        return;
      }
      const menu = Cookie.get("menu")
        ? JSON.parse(Cookie.get("menu"))
        : JSON.parse(sessionStorage.getItem("menu"));
      state.menu = menu;
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../page/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`../page/${item.url}`);
          menuArray.push(item);
        }
      });
      //路由的动态添加
      menuArray.forEach((item) => {
        router.addRoute("Main", item);
      });
    },
  },
};
