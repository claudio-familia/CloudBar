import { Place } from "../../general/models/place";
import {  LoginModel } from "../models/login";

export interface SecurityState {
    currentUser: LoginModel;
    currentPlace: Place;
    isLoggedIn: boolean | null;
}