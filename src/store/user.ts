import {defineStore} from "pinia";
import {login, user} from "@/api/auth";

//定义state中的数据类型
export interface IUserState {
    token: string;
    username: string;
    avatar_url: string;
    permissions: string[];
    info: any;
}

export const useUserStore = defineStore({
    id: "app-user",
    state: (): IUserState => ({
        token: localStorage.getItem("token") || "",
        username: "",
        avatar_url: "",
        permissions: [],
        info: {},
    }),
    getters: {
        getToken(): string {
            return this.token;
        },
        getAvatar(): string {
            return this.avatar_url;
        },
        getUserName(): string {
            return this.username;
        },
        getPermissions(): string[] {
            return this.permissions;
        },
    },
    actions: {
        setToken(token: string) {
            localStorage.setItem("token", token);
            this.token = token;
        },
        setAvatar(avatar_url: string) {
            this.avatar_url = avatar_url;
        },
        setUserInfo(info: object) {
            this.info = info;
        },
        setUserName(username: string) {
            this.username = username;
        },
        setPermissions(permissions: string[]) {
            this.permissions = permissions;
        },
        //异步的登陆方法
        async login(userInfo: object) {
            try {
                const response: any = await login(userInfo);
                console.log(response);
                if (response.access_token) {
                    this.setToken(response.access_token);

                    return await this.getUser();
                }
            } catch (error) {
                console.log(error);
            }
        },
        //异步的获取用户信息
        async getUser() {
            try {
                const response: any = await user();
                this.setUserName(response.name);
                this.setAvatar(response.avatar_url);
                this.setUserInfo(response);
                return response;
            } catch (error) {
            }
        },
    },
});
