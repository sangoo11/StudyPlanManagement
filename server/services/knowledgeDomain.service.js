// write service functions to interact with knowledgeDomain model

const KnowledgeDomain = require("../models/knowledgeDomain.model");

class KnowledgeDomainService {
  async getKnowledgeDomains() {
    return await KnowledgeDomain.findAll();
  }

  async getKnowledgeDomain(id) {
    return await KnowledgeDomain.findByPk(id);
  }

  async createKnowledgeDomain(knowledgeDomain) {
    return await KnowledgeDomain.create(knowledgeDomain);
  }

  async updateKnowledgeDomain(id, knowledgeDomain) {
    const currentKnowledgeDomain = await KnowledgeDomain.findByPk(id);
    if (!currentKnowledgeDomain) throw new Error("Knowledge Domain not found");
    return await currentKnowledgeDomain.update(knowledgeDomain);
  }

  async deleteKnowledgeDomain(id) {
    const currentKnowledgeDomain = await KnowledgeDomain.findByPk(id);
    if (!currentKnowledgeDomain) throw new Error("Knowledge Domain not found");
    return await currentKnowledgeDomain.destroy();
  }
}

module.exports = new KnowledgeDomainService();
