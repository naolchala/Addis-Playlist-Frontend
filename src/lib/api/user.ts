import { apiUrl } from "$config/api/api";
import { UserResponse } from "$types/user.types";
import axios from "axios";

export interface LoginParameters {
	email: string;
	password: string;
}
const login = async ({ email, password }: LoginParameters) => {
	const user = await axios
		.post<UserResponse>(apiUrl + "/user/login", { email, password })
		.then((res) => res.data);
	return user;
};

export interface SignupParameters {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
const signUp = async (values: SignupParameters) => {
	const user = await axios
		.post<UserResponse>(apiUrl + "/user/register", values)
		.then((res) => res.data);
	return user;
};

export default { login, signUp };
