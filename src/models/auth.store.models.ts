export type LoginDto = {
	user: TUser | null;
	token: string | null;
};

export interface TUser {
	username: string,
	name: string,
	lastName: string,
	email: string
}
export type AuthState = {
	user: TUser | null;
	message: TError | null;
	sessionTime: number | null;
	logged: boolean;
	token: string | null;
	loginError: TError | null;
	isLoadingUser: boolean | null;
	invalidLoginInfo: boolean | null;
}

export type IAuthExport = {
  	data: LoginDto | null;
	message: TError | null;
}

export type TError = {
	name: string;
	message: string;
	status?: number
	time?: string;
	type: "warning" | "error" | "success" | "info";
	token?: string;
	messageDict: string;
	data?: any;
};