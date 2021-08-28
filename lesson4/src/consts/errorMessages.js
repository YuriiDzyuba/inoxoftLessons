module.exports = {
    noUsers: {
        code: 410,
        message: 'Users deleted'
    },
    noUser: {
        code: 404,
        message: 'Cant find user'
    },
    userExist: {
        code: 406,
        message: 'user with this email exists'
    },
    notFound: {
        code: 404,
        message: 'not found'
    },
    invalidEmail: {
        code: 409,
        message: 'invalid email format'
    },
    invalidPassword: {
        code: 409,
        message: 'invalid password format'
    },
    invalidName: {
        code: 409,
        message: 'invalid name format'
    },
    invalidAge: {
        code: 409,
        message: 'invalid age  format'
    },
    invalidIdReq: {
        code: 409,
        message: 'invalid ID in request params'
    },
    reqQueryNotEmpty: {
        code: 406,
        message: 'http request must be without queries'
    },
    noHouses: {
        code: 410,
        message: 'All houses deleted'
    },
    noHouse: {
        code: 404,
        message: 'Cant find this house'
    },
};
