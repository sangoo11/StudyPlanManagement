// write service functions to interact with knowledgeDomain model

const KnowledgeDomain = require("../models/knowledgeDomain.model");
const KnowledgeField = require("../models/knowledgeField.model");
const Subject = require("../models/subject.model");

class KnowledgeDomainService {
  async getKnowledgeDomains() {
    return await KnowledgeDomain.findAll();
  }

  async getKnowledgeDomain(id) {
    return await KnowledgeDomain.findByPk(id, {
      include: {
        model: KnowledgeField,
        as: "fields",
      },
    });
  }

  async createKnowledgeDomain(knowledgeDomain) {
    return KnowledgeDomain.create(knowledgeDomain);
  }

  async updateKnowledgeDomain(id, data) {
    const currentKnowledgeDomain = await KnowledgeDomain.findByPk(id);
    if (!currentKnowledgeDomain) throw new Error("Knowledge Domain not found");
    return await currentKnowledgeDomain.update(data);
  }

  async deleteKnowledgeDomain(id) {
    const currentKnowledgeDomain = await KnowledgeDomain.findByPk(id);
    if (!currentKnowledgeDomain) throw new Error("Knowledge Domain not found");
    return await currentKnowledgeDomain.destroy();
  }
}

module.exports = new KnowledgeDomainService();
