const User = require('../users/user.model');

class AuthService {
    async getAllUsers() {
        const users = await User.find({});
        return users;
    }

    async getOneUser(id) {
        const user = await User.findById(id);
        return user;
    }

    async checkEmail(email) {
        const existingEmail = await User.findOne({ email });
        return existingEmail;
    }

    async addNewUser(applicantData) {
        const { email, name, born_year } = await User.create(applicantData);
        return { email, name, born_year };
    }
}

module.exports = new AuthService();
