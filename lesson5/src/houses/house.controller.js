const houseService = require('./house.service');
const CustomError = require('../../exeptions/customError');
const { noHouses, noHouse } = require('../../consts/errorMessages');

class HouseController {
    async getAllHouses(req, res, next) {
        try {
            const houses = await houseService.getAllHouses();

            if (!Object.keys(houses).length) {
                throw new CustomError(noHouses.message, noHouses.code);
            }

            res.status(200).json(houses);
        } catch (e) {
            next(e);
        }
    }

    async getOneHouse(req, res, next) {
        try {
            const { id } = req.params;

            const chosenHouse = await houseService.getOneHouse(id);

            if (!chosenHouse) {
                throw new CustomError(noHouse.message, noHouse.code);
            }

            res.status(200).json(chosenHouse);
        } catch (e) {
            next(e);
        }
    }

    async addNewHouse(req, res, next) {
        try {
            const applicantData = req.body;

            const newHouse = await houseService.addNewHouse(applicantData);

            if (!newHouse) {
                throw new CustomError(noHouse.message, noHouse.code);
            }

            res.status(200).json(applicantData);
        } catch (e) {
            next(e);
        }
    }

    async updateHouse(req, res, next) {
        try {
            const { id } = req.params;
            const houseData = req.body;

            const updatedHouse = await houseService.updateHouse(id, houseData);

            if (!updatedHouse) {
                throw new CustomError(noHouse.message, noHouse.code);
            }

            res.status(200).json(updatedHouse);

        } catch (e) {
            next(e);
        }
    }

    async deleteHouse(req, res, next) {
        try {
            const { id } = req.params;

            const deletedHouse = await houseService.deleteHouse(id);

            if (!deletedHouse) {
                throw new CustomError(noHouse.message, noHouse.code);
            }

            res.status(200).json(deletedHouse);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new HouseController();
