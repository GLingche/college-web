import axiosHttp from "./axiosHttp";
import store from ".././store";
import Cookie from "js-cookie";
let token =
  Cookie.get("token") ||
  sessionStorage.getItem("token") ||
  localStorage.getItem("token");
console.log(
  sessionStorage.getItem("token"),
  "token11111111111111111112222223222"
);
export const login = (param) => {
  console.log(param, "login");
  return axiosHttp.request({
    url: "/CEMS/login/verify",
    method: "post",
    params: {
      Account: param.Account,
      Password: param.Password,
      how: param.how,
      ip: param.ip,
    },
  });
};

export const Logout = (param) => {
  console.log(param, "login");
  return axiosHttp.request({
    url: "CEMS/SPAdmin/Logout",
    method: "PUT",
    params: {
      ID: param.ID,
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
    url: "/CEMS/login/sign",
    method: "post",
    params: {
      Name: param.Name,
      Account: param.Account,
      Password: param.Password,
    },
  });
};

export const indentify = (param) => {
  // console.log(param, "fdsfa");
  console.log(
    sessionStorage.getItem("token"),
    "token11111111111111111112222223222"
  );
  console.log(token, "up111111111");
  return axiosHttp.request({
    url: "/CEMS/Visitor/RealName",
    method: "post",
    params: {
      token: token,
      UserName: param.UserName,
      Sex: param.Sex,
      Nation: param.Nation,
      birthday: param.birthday,
      DocumentType: param.DocumentType,
      DocumentNumber: param.DocumentNumber,
      Number: param.Number,
      Unit: param.Unit,
      Origin: param.Origin,
      MAddress: param.MAddress,
      UserType: param.UserType,
    },
  });
};

// 获取用户信息分页
export const getUserInfo = (param) => {
  console.log(param, "fdsfa");
  return axiosHttp.request({
    url: "/SPAdmin/SelectAdmin",
    method: "get",
    params: {
      size: 10,
    },
  });
};

export const SelectUser = (param) => {
  console.log(param, "fdsfa");
  return axiosHttp.request({
    url: "/CEMS/SPAdmin/SelectUser",
    method: "POST",
    params: {
      size: 10,
      token: "fdafadsf",
      page: param.page,
      sponsors: "",
      type: "",
    },
  });
};

// 账号管理

export const deleteUser = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Visitor/DeleteById",
    method: "delete",
    data: {
      ID: param.ID,
    },
  });
};

export const SPUpUserType = (param) => {
  return axiosHttp.request({
    url: "/CEMS/User/SPUpUserType",
    method: "PUT",
    params: {
      id: param.id,
      usertype: "管理员",
    },
  });
};

export const UpdateAdmin = (param) => {
  return axiosHttp.request({
    url: "/CEMS/User/UpdateAdmin",
    method: "PUT",
    data: {
      ID: param.ID,
    },
  });
};

export const Enable = (param) => {
  return axiosHttp.request({
    url: "/CEMS/SPAdmin/Enable",
    method: "PUT",
    params: {
      ID: param.ID,
      UserType: param.UserType,
    },
  });
};

export const DeleteAll = (param) => {
  return axiosHttp.request({
    url: "/CEMS/SPAdmin/DeleteAll",
    method: "DELETE",
    params: {
      id: param.id,
      usertype: param.userType,
    },
  });
};
export const cancels = (param) => {
  return axiosHttp.request({
    url: "/CEMS/SPAdmin/Logout",
    method: "PUT",
    params: {
      ID: param.ID,
      UserType: param.UserType,
    },
  });
};
export const Usercancels = (param) => {
  console.log(param, "this11111111111111");
  return axiosHttp.request({
    url: "/CEMS/User/DeleteById",
    method: "DELETE",
    params: {
      ID: param.ID,
    },
  });
};

export const SeleteByAccount = (param) => {
  return axiosHttp.request({
    url: "/CEMS/User/SeleteByAccount",
    method: "POST",
    data: {
      Account: param.Account,
      page: param.page,
      size: param.size,
      token: "fdafadsf",
    },
  });
};

export const SelectAdmin = (param) => {
  return axiosHttp.request({
    url: "/CEMS/SPAdmin/SelectAdmin",
    method: "POST",
    params: {
      size: 10,
      token: "fdafadsf",
      page: param.page,
      sponsors: "",
      type: "",
    },
  });
};
//用户信息

// export const SelectUser = (param) => {
//   return axiosHttp.request({
//     url: "/CEMS/User/SelectUser",
//     method: "POST",
//     data: {
//       size: param.size,
//       page: param.page
//     },
//   });
// };

// 赛事管理

//选手

export const UserUpdateById = (param) => {
  return axiosHttp.request({
    url: "/CEMS/User/UpdateById",
    method: "put",
    params: {
      usertype: "赞助商",
      account: "vis5",
      userName: "test",
      sex: "test",
      id: 32,
      unit: "2020-10-10",
      address: "test",
      age: "1852221156",
      number: "4290052005566",
      origin: "tset",
    },
  });
};

export const Update2ById = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Player/Update2ById",
    method: "put",
    params: {
      id: 4,
      name: "test",
      sex: "男",
      school: "test",
      type: "test",
      items: "test",
      time: "2020-10-10",
      address: "test",
      position: "test",
      status: "11fdafa",
    },
  });
};
export const Delete2ById = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Player/Delete2ById",
    method: "delete",
    params: {
      id: param.id,
      usertype: param.userType,
    },
  });
};

//活动
export const SeleteAll = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Match/SeleteAll",
    method: "post",
    params: {
      page: param.page,
      size: param.size,
      token: token,
      sponsors: param.sponsors,
      type: param.type,
    },
  });
};

export const UpdateById = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Match/UpdateById",
    method: "put",
    params: {
      unit: param.unit,
      id: param.id,
      unitAddress: param.unitAddress,
      type: param.type,
      items: param.items,
      matchTime: param.matchTime,
      place: param.place,
      number: param.number,
      documentNumber: param.documentNumber,
      state: param.state,
    },
  });
};

export const BuildMatch = (param) => {
  // console.log(param, "fdsfa");
  return axiosHttp.request({
    url: "/CEMS/Match/BuildMatch",
    method: "post",
    params: {
      Unit: param.unit,
      UnitAddress: param.unitAddress,
      Type: param.type,
      Items: param.items,
      MatchTime: param.matchTime,
      Place: param.place,
      Number: param.number,
      DocumentNumber: param.documentNumber,
      token: token,
    },
  });
};
export const DeleteById = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Match/DeleteById",
    method: "delete",
    params: {
      ID: param.id,
    },
  });
};

export const ChangeMatchState = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Vetting/ChangeState",
    method: "PUT",
    params: {
      id: "34",
      MatchId: "",
      Account: "user100",
      State: "Y",
    },
  });
};

//消息模块
//审核
export const SelectAdminNotice = (param) => {
  return axiosHttp.request({
    url: "CEMS/Vetting/SeleteByToken",
    method: "POST",
    params: {
      token: token,
      page: param.page,
      size: param.size,
    },
  });
};
//通知
export const SelectByAccount = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Notice/SelectByToken",
    method: "POST",
    params: {
      token: token,
      page: param.page,
      size: param.size,
    },
  });
};

export const SeleteByUserType = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Vetting/SeleteByUserType",
    method: "POST",
    params: {
      UserType: "管理员",
      page: 1,
      size: 10,
      token: "tset",
    },
  });
};

export const SelectUserNotice = (param) => {
  return axiosHttp.request({
    url: "//CEMS/User/SelectUserNotice",
    method: "POST",
    data: {
      page: param.page,
      size: param.size,
    },
  });
};
export const ChangeUserState = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Vetting/ChangeUserState",
    method: "PUT",
    params: {
      id: param,
      State: "Y",
    },
  });
};

///个人信息
export const SeleteByAccountLog = (param) => {
  return axiosHttp.request({
    url: "/CEMS/User/SelectByToken",
    method: "POST",
    params: {
      token: token,
    },
  });
};
export const SeleteByAccountLogin = (param) => {
  return axiosHttp.request({
    url: "/CEMS/login/SeleteByToken",
    method: "POST",
    params: {
      token: token,
      page: 1,
      size: 50,
    },
  });
};
export const UpdateByIdLog = (param) => {
  console.log(token, "token1111111111111111111");
  return axiosHttp.request({
    url: "/CEMS/User/UpdateByToken",
    method: "put",
    params: {
      username: param.adminName || param.userName,
      sex: param.sex,
      token: token,
      unit: param.unit,
      address: param.address,
      age: param.age,
      number: param.number,
      origin: param.origin,
    },
  });
};
//用户信息管理
export const SeleteByAccountInfo = (param) => {
  return axiosHttp.request({
    url: "/CEMS/User/SelectByAccount",
    method: "POST",
    data: {
      token: "11fdafa",
      page: param.page,
      size: param.size,
    },
  });
};
export const SelectPlayer = (param) => {
  console.log(param, "fddsfa");
  return axiosHttp.request({
    url: "/CEMS/SPAdmin/SelectPlayer",
    method: "POST",
    params: {
      token: "11fdafa",
      page: param.page,
      size: param.size,
      sponsors: param.sponsors,
      type: param.type,
    },
  });
};
export const SelectAdmin2 = (param) => {
  console.log(param, "fddsfa");
  return axiosHttp.request({
    url: "/CEMS/SPAdmin/SelectAdmin",
    method: "POST",
    params: {
      token: "11fdafa",
      page: param.page,
      size: param.size,
      sponsors: param.sponsors,
      type: param.type,
    },
  });
};

export const UserUpdateById2 = (param) => {
  return axiosHttp.request({
    url: "/CEMS/User/UpdateById",
    method: "put",
    params: {
      usertype: param.userType,
      account: param.account,
      username: param.adminName,
      sex: param.sex,
      id: param.id,
      unit: param.unit,
      address: param.address,
      age: param.age,
      number: param.number,
      origin: param.origin,
    },
  });
};

// 实名认证

export const RealName = (param) => {
  return axiosHttp.request({
    url: "/CEMS/User/RealName",
    method: "POST",
    data: {
      page: param.page,
      size: param.size,
    },
  });
};

export const selePMess = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Player/selePMess",
    method: "post",
    params: {
      page: 1,
      size: 5,
      token: "11fdafa",
      sponsors: "AC",
      type: "事项",
    },
  });
};

export const changePMess = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Player/changePMess",
    method: "put",
    params: {
      id: 1,
      headshot: "httpss/s",
      nickname: "test",
      name: "testreal",
      school: "testshchool",
      address: "testaddress",
      sex: "女",
      phone: 18520726851,
      age: 8,
    },
  });
};

export const delePMess = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Player/delePMess",
    method: "delete",
    params: {
      id: 1,
    },
  });
};

export const updateAds = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Ads/updateAds",
    method: "PUT",
    params: {
      adsID: param.adsID,
      sponsors: param.sponsors,
      adsType: param.adsType,
      videlAdress: param.videlAdress,
      imageAdress: param.imageAdress,
      state: param.state,
      Items: param.Items,
      id: param.id,
      UAccount: param.UAccount,
    },
  });
};

export const AupdateAds = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Ads/adminUpdateAds",
    method: "PUT",
    params: {
      adsID: param.adsID,
      sponsors: param.sponsors,
      adsType: param.adsType,
      videlAdress: param.videlAdress,
      imageAdress: param.imageAdress,
      state: param.state,
      Items: param.Items,
      id: param.id,
      UAccount: param.UAccount,
    },
  });
};

export const deleteAds = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Ads/deleteAds",
    method: "delete",
    params: {
      id: param.id,
      UAccount: param.UAccount,
      adsID: param.adsID,
    },
  });
};

export const AcreateAds = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Ads/adminCreateAds",
    method: "POST",
    params: {
      sponsors: param.sponsors,
      adsType: param.adsType,
      videlAdress: param.videlAdress,
      imageAdress: param.imageAdress,
      state: param.state,
      Items: param.Items,
      id: param.id,
    },
  });
};

export const createAds = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Ads/createAds",
    method: "POST",
    params: {
      sponsors: param.sponsors,
      adsType: param.adsType,
      videlAdress: param.videlAdress,
      imageAdress: param.imageAdress,
      state: param.state,
      Items: param.Items,
      id: param.id,
      UAccount: param.UAccount,
    },
  });
};

export const AdeleteAds = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Ads/adminDeleteAds",
    method: "delete",
    params: {
      adsID: param.id,
    },
  });
};

export const selectAds = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Ads/seleteByPage",
    method: "get",
    params: {
      pageNumber: param.page,
      pageSize: param.size,
      sponsors: param.sponsors,
    },
  });
};

//奖品

export const seleteByPage = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Prize/seleteByPage",
    method: "get",
    params: {
      pageNumber: param.page,
      pageSize: param.size,
      activityname: param.activityname,
    },
  });
};

export const adminInsertPrize = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Prize/adminInsertPrize",
    method: "post",
    params: {
      Sponsorshipfeeds: param.sponsorshipfeeds,
      Sponsorshipgoals: param.sponsorshipgoals,
      activityname: param.activityname,
      level: param.level,
      details: param.details,
      image: param.image,
      state: param.state,
      raceID: param.raceID,
      UAccount: param.UAccount,
    },
  });
};
export const InsertPrize = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Prize/InsertPrize",
    method: "post",
    params: {
      Sponsorshipfeeds: param.sponsorshipfeeds,
      Sponsorshipgoals: param.sponsorshipgoals,
      activityname: param.activityname,
      level: param.level,
      details: param.details,
      image: param.image,
      state: param.state,
      raceID: param.raceID,
      UAccount: param.UAccount,
    },
  });
};
export const adminUpdatePrize = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Prize/adminUpdatePrize",
    method: "put",
    params: {
      id: param.id,
      Sponsorshipfeeds: param.sponsorshipfeeds,
      Sponsorshipgoals: param.sponsorshipgoals,
      activityname: param.activityname,
      level: param.level,
      details: param.details,
      image: param.image,
      state: param.state,
      raceID: param.raceID,
    },
  });
};

export const UpdatePrize = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Prize/UpdatePrize",
    method: "put",
    params: {
      id: param.id,
      Sponsorshipfeeds: param.sponsorshipfeeds,
      Sponsorshipgoals: param.sponsorshipgoals,
      activityname: param.activityname,
      level: param.level,
      details: param.details,
      image: param.image,
      state: param.state,
      raceID: param.raceID,
      UAccount: param.UAccount,
    },
  });
};

export const adminDeletePrize = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Prize/adminDeletePrize",
    method: "DELETE",
    params: {
      id: param.id,
    },
  });
};

export const DeletePrize = (param) => {
  return axiosHttp.request({
    url: "/CEMS/Prize/DeletePrize",
    method: "DELETE",
    params: {
      id: param.id,
      UAccount: param.UAccount,
      raceID: param.raceID,
    },
  });
};

//赛事选手

export const refresh = (param) => {
  return axiosHttp.request({
    url: "/CEMS/login/refresh",
    method: "POST",
    params: {
      token: token,
    },
  });
};

export const getusertype = (param) => {
  return axiosHttp.request({
    url: "/CEMS/login/getusertype",
    method: "POST",
    params: {
      token: token,
    },
  });
};
