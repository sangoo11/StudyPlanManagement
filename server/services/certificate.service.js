const Certificate = require('../models/certificate.model');

const getAll = async () => {
    return await Certificate.findAll();
};

const getById = async (id) => {
    return await Certificate.findByPk(id);
};

const create = async (data) => {
    return await Certificate.create(data);
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