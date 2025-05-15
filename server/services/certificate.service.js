const Certificate = require('../models/certificate.model');
const { normalizedPath } = require("../utils/utils");
const fs = require('fs').promises;

const getAll = async () => {
    return await Certificate.findAll();
};

const getById = async (id) => {
    return await Certificate.findByPk(id);
};

const create = async ({ certificateNumber, type, point, takenAt, expiredAt, studentID }, image) => {
    if (!certificateNumber || !type || !takenAt || !expiredAt || !studentID || !image) {
        throw new Error('Please provide all required fields');
    }

    const path = image.path;
    let certificate;

    try {
        certificate = await Certificate.create({
            certificateNumber,
            type,
            point,
            takenAt,
            expiredAt,
            studentID,
            image: normalizedPath(path),
        });

        if (!certificate) {
            // If certificate creation fails, delete the uploaded image
            await fs.unlink(path);
            throw new Error("Certificate not created");
        }

        return certificate;
    } catch (error) {
        // If any error occurs during certificate creation, delete the uploaded image
        try {
            await fs.unlink(path);
        } catch (unlinkError) {
            console.error('Error deleting image file:', unlinkError);
        }
        throw error;
    }
};

const update = async (id, data) => {
    const certificate = await Certificate.findByPk(id);
    if (!certificate) return null;
    await certificate.update(data);
    return certificate;
};

const remove = async (id) => {
    const certificate = await Certificate.findByPk(id);
    if (!certificate) return null;
    await certificate.destroy();
    return certificate;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
}; 