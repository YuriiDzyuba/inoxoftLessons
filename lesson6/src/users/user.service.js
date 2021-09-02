const User = require('./user.model');

const userService = {
    getAllUsers: async () => {
        const users = await User.find({}).select('-password');
        return users;
    },

    getOneUser: async (id) => {
        const user = await User.findById(id).select('-password').lean();
        return user;
    },

    updateUser: async (id, data) => {
        const updatedUser = await User.findByIdAndUpdate(id, data).select('-password');
        return updatedUser;
    },

    deleteUser: async (id) => {
        const deletedUser = await User.findByIdAndDelete(id).select('-password');
        return deletedUser;
    }
};

module.exports = userService;
