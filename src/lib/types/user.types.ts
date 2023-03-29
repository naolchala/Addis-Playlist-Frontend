export interface UserResponse {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	photoURL: string;
	token: string;
}

export interface ErrorResponse {
	msg: string;
	field?: string;
}

export interface SharedUsersResponse {}
