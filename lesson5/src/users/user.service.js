const User = require('./user.model');

class UserService {
    async getAllUsers() {
        const users = await User.find({});
        return users;
    }

    async getOneUser(id) {
        const user = await User.findById(id);
        return user;
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

module.exports = new UserService();
