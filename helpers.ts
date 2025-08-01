

export const isValidEmail = (email: string): boolean => {
    if (!email) return false;
    const trimmedEmail = email.trim();
    if (trimmedEmail.length < 5 || trimmedEmail.length > 254) return false;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

    return emailRegex.test(trimmedEmail);
};

export const isMatchPassword=(password: string,passwordConfirm:string): boolean => {
    return password===passwordConfirm;
}
export const isValidPassword = (password: string): boolean => {
    return password.length >= 8;
};