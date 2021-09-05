const User = require('./user.model');

const userService = {
    getAllUsers: async (fieldsToRemove = ['-createdAt', '-updatedAt', '-__v', '-role']) => {
        const users = await User.find({}).select(`${fieldsToRemove.join(' ')} -password`);
        return users;
    },

    getOneUser: async (id) => {
        const user = await User.findById(id).select('-password');
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
