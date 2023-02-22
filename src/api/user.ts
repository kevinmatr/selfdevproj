import request from "../utils/request";

// 获取个人数据

export interface IUser {
  userid: number;
  name: string;
  sex: string;
  age: string;
  tel: string;
  vaccination: string;
}

export const getuserlist = () => request.get("/userinfo");

// 新增个人数据
export const adduser = (data: IUser) => request.post("/userinfo", data);
