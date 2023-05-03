import Mock from "mockjs";
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body);
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === "admin" && password === "admin") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "home/index",
            },
            {
              label: "赛事管理",
              icon: "video-play",
              path: "/match",
              children: [
                {
                  path: "/activity",
                  name: "activity",
                  label: "赛事活动管理",
                  icon: "setting",
                  url: "match/activity.vue",
                },
                {
                  path: "/competitor",
                  name: "competitor",
                  label: "赛事选手管理",
                  icon: "setting",
                  url: "match/competitor.vue",
                },
              ],
            },
            {
              label: "用户管理",
              icon: "user",
              path: "/user",
              children: [
                {
                  path: "/account",
                  name: "account",
                  label: "账号管理",
                  icon: "setting",
                  url: "user/account.vue",
                },
                {
                  path: "/user",
                  name: "user",
                  label: "用户信息管理",
                  icon: "setting",
                  url: "user/user.vue",
                },
              ],
            },
            {
              label: "赞助管理",
              icon: "location",
              path: "/sponsor",
              children: [
                {
                  path: "/ad",
                  name: "ad",
                  label: "广告信息管理",
                  icon: "setting",
                  url: "sponsor/ad.vue",
                },
                {
                  path: "/price",
                  name: "price",
                  label: "奖品信息管理",
                  icon: "setting",
                  url: "sponsor/price.vue",
                },
              ],
            },
          ],
          token: "Mock.Random.guid()ffffffffffffffffffffffffffffff",
          message: "获取成功",
        },
      };
    } else if (username === "user1" && password === "user1") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "home/index",
            },
            {
              label: "赞助管理",
              icon: "location",
              path: "/sponsor",
              children: [
                {
                  path: "/ad",
                  name: "ad",
                  label: "广告信息管理",
                  icon: "setting",
                  url: "sponsor/ad.vue",
                },
                {
                  path: "/price",
                  name: "price",
                  label: "奖品信息管理",
                  icon: "setting",
                  url: "sponsor/price.vue",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "user2" && password === "user2") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "home/index",
            },
            {
              label: "赛事管理",
              icon: "video-play",
              path: "/match",
              children: [
                {
                  path: "/activity",
                  name: "activity",
                  label: "赛事活动管理",
                  icon: "setting",
                  url: "match/activity.vue",
                },
                {
                  path: "/competitor",
                  name: "competitor",
                  label: "赛事选手管理",
                  icon: "setting",
                  url: "match/competitor.vue",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "user" && password === "user") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "home/index",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else if (username === "test" && password === "test") {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "首页",
              icon: "s-home",
              url: "home/index",
            },
          ],
          token: Mock.Random.guid(),
          message: "获取成功",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          message: "密码错误",
        },
      };
    }
  },
};
