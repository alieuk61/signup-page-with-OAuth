export interface User {
    email: string,
    password: string
}

export interface contextValues {
    submitLogin : (userLogin: User) => Promise<boolean>;
    // this function will return the success boolean ,if true that means the user is authenticated else they will be told to make sure the user/password is correct
}
