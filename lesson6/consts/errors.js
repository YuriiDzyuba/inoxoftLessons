module.exports = {
    serverErr: {
        code: 500,
        message: 'server error'
    },
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
        message: 'user with this account exists'
    },
    notFound: {
        code: 404,
        message: 'not found'
    },
    invalidEmail: {
        code: 409,
        message: 'invalid account format'
    },
    invalidPassword: {
        code: 409,
        message: 'invalid password'
    },
    invalidName: {
        code: 409,
        message: 'invalid name format'
    },
    invalidAge: {
        code: 409,
        message: 'invalid age format'
    },
    invalidIdReq: {
        code: 409,
        message: 'invalid ID in request params'
    },
    reqQueryNotEmpty: {
        code: 406,
        message: 'http request must be without queries'
    },
    reqBodyNotEmpty: {
        code: 406,
        message: 'body must be empty'
    },
    noHouses: {
        code: 410,
        message: 'All houses deleted'
    },
    cantFindHouses: {
        code: 410,
        message: 'cant find any houses'
    },
    noHouse: {
        code: 404,
        message: 'Cant find this house'
    },
    invalidStreet: {
        code: 404,
        message: 'invalid street format'
    },
    invalidIndexType: {
        code: 404,
        message: 'invalid type of Index. Need number'
    },
    invalidIndexValue: {
        code: 404,
        message: 'invalid index value'
    },
    forbidden: {
        code: 403,
        message: 'you don\'t have permission to access'
    },
    noQueries: {
        code: 403,
        message: 'no queries'
    },
};
