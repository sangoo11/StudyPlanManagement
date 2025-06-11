const AwardType = require("../models/awardType.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");

class AwardTypeService {
    // Create a new award type
    async createAwardType(awardTypeData) {
        try {
            // Validate required fields
            if (!awardTypeData.title || !awardTypeData.date_awarded) {
                throw new BadRequestError('Title and date_awarded are required fields');
            }

            const awardType = await AwardType.create(awardTypeData);
            return awardType;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new BadRequestError('An award type with this title already exists');
            }
            if (error.name === 'SequelizeValidationError') {
                throw new BadRequestError(error.message);
            }
            throw error;
        }
    }

    // Get all award types
    async getAllAwardTypes() {
        try {
            const awardTypes = await AwardType.findAll({
                order: [['createdAt', 'DESC']]
            });
            return awardTypes;
        } catch (error) {
            throw new BadRequestError('Error fetching award types');
        }
    }

    // Get award type by ID
    async getAwardTypeById(id) {
        try {
            if (!id) {
                throw new BadRequestError('Award type ID is required');
            }

            const awardType = await AwardType.findByPk(id);
            if (!awardType) {
                throw new NotFoundError('Award type not found');
            }
            return awardType;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new BadRequestError('Error fetching award type');
        }
    }

    // Update award type
    async updateAwardType(id, updateData) {
        try {
            if (!id) {
                throw new BadRequestError('Award type ID is required');
            }

            const awardType = await AwardType.findByPk(id);
            if (!awardType) {
                throw new NotFoundError('Award type not found');
            }

            // Validate update data
            if (updateData.title === '') {
                throw new BadRequestError('Title cannot be empty');
            }

            await awardType.update(updateData);
            return awardType;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new BadRequestError('An award type with this title already exists');
            }
            throw new BadRequestError('Error updating award type');
        }
    }

    // Delete award type
    async deleteAwardType(id) {
        try {
            if (!id) {
                throw new BadRequestError('Award type ID is required');
            }

            const awardType = await AwardType.findByPk(id);
            if (!awardType) {
                throw new NotFoundError('Award type not found');
            }

            // Check if award type is being used
            const awardCount = await awardType.countAwards();
            if (awardCount > 0) {
                throw new BadRequestError('Cannot delete award type that is being used by awards');
            }

            await awardType.destroy();
            return { message: 'Award type deleted successfully' };
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new BadRequestError('Error deleting award type');
        }
    }
}

module.exports = new AwardTypeService(); 