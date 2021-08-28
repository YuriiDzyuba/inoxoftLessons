const User = require('./users.model');

class UsersService {
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
        const newUser = await User.create(applicantData);
        return newUser;
    }

    async updateUser(id, data) {
        const updatedUser = await User.findByIdAndUpdate(id, data);
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    }
}

module.exports = new UsersService();
