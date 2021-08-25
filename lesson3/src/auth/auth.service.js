class AuthService {
    checkEmail(email) {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regEx.test(email);
    }

    checkPassword(password) {
        const regEx = /^[a-zA-Z0-9]{4,23}$/;
        return regEx.test(password);
    }

    checkName(name) {
        const regEx = /^[a-zA-Z]{4,22}$/;
        return regEx.test(name);
    }

    checkAge(age) {
        const regEx = /^[0-9]{2,99}$/;
        return regEx.test(age);
    }
}

module.exports = new AuthService();
