import request from "../utils/request";

export interface IUser {
  userid: number;
  name: string;
  sex: string;
  age: string;
  tel: string;
  vaccination: string;
}

// 获取个人信息
export const getuser = (id: number) => request.get("/userinfo/" + id);

// 获取个人数据列表
export const getuserlist = () => request.get("/userinfo");

// 新增个人数据
export const adduser = (data: IUser) => request.post("/userinfo", data);

// 编辑个人信息

export const edituser = (id: string, data: IUser) =>
  request.patch("/userinfo/" + id, data);
