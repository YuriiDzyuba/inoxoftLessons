const User = require('../users/user.model');

const authService = {
    getAllUsers: async () => {
        const users = await User.find({});
        return users;
    },

    getOneUser: async (id) => {
        const user = await User.findById(id);
        return user;
    },

    checkEmail: async (email) => {
        const existingEmail = await User.findOne({ email });
        return existingEmail;
    },

    addNewUser: async (applicantData) => {
        const { email, name, born_year, _id } = await User.create(applicantData);
        return { email, name, born_year, _id };
    }
};

module.exports = authService;
