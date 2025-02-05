export const isValidEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isValid.test(email)
}

