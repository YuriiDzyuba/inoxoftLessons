const User = require('./user.model');

class UserService {
    async getAllUsers() {
        const users = await User.find({}).select('-password');
        return users;
    }

    async getOneUser(id) {
        const user = await User.findById(id).select('-password');
        return user;
    }

    async updateUser(id, data) {
        const updatedUser = await User.findByIdAndUpdate(id, data).select('-password');
        return updatedUser;
    }

    async deleteUser(id) {
        const deletedUser = await User.findByIdAndDelete(id).select('-password');
        return deletedUser;
    }
}

module.exports = new UserService();
