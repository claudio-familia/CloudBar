import {  LoginModel } from "../models/login";

export interface SecurityState {
    currentUser: LoginModel;
    isLoggedIn: boolean | null;
}