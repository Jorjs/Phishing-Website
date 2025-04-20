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
	error: TError | null;
	autoLogoutTimer: ReturnType<typeof setTimeout> | null;
	token: string | null;
	isLoading: boolean;
}

export type IAuthExport = {
  	data: LoginDto | null;
	message: TError | null;
}

export type TError = {
	message: string;
	status?: number
	data?: any;
};