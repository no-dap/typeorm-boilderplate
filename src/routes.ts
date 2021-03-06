import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/user/:id",
    controller: UserController,
    action: "getById"
},{
    method: "get",
    route: "/user/search",
    controller: UserController,
    action: "getByTerm"
},{
    method: "post",
    route: "/user",
    controller: UserController,
    action: "create"
}];
