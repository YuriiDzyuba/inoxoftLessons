const User = require('./house.model');

class HouseService {
    async getUserHouses(userID) {
        const users = await User.find({ user: userID });
        return users;
    }

    async getAllHouses() {
        const users = await User.find({});
        return users;
    }

    async getOneHouse(id) {
        const user = await User.findById(id);
        return user;
    }

    async addNewHouse(applicantData) {
        const newUser = await User.create(applicantData);
        return newUser;
    }

    async updateHouse(id, data) {
        const updatedUser = await User.findByIdAndUpdate(id, data);
        return updatedUser;
    }

    async deleteHouse(id) {
        const deletedUser = await User.findByIdAndDelete(id);
        return deletedUser;
    }
}

module.exports = new HouseService();
