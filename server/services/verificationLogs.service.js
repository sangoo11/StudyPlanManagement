const VerificationLogs = require('../models/verificationLogs.model');
const Certificate = require('../models/certificate.model');

const getAll = async () => {
    return await VerificationLogs.findAll();
};

const getById = async (id) => {
    return await VerificationLogs.findByPk(id);
};

const getByCertificateId = async (certificateID) => {
    return await VerificationLogs.findAll({ where: { certificateID } });
};

const create = async (data) => {
    // Create the verification log
    const log = await VerificationLogs.create(data);
    // Update certificate status based on result
    const certificate = await Certificate.findByPk(data.certificateID);
    if (certificate) {
        let newStatus = certificate.status;
        if (data.result === 'valid') newStatus = 'valid';
        else if (data.result === 'invalid' || data.result === 'expired') newStatus = 'invalid';
        await certificate.update({ status: newStatus });
    }
    return log;
};

module.exports = {
    getAll,
    getById,
    getByCertificateId,
    create,
}; 