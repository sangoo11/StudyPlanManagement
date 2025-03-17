// write for KnowledgeField

const KnowledgeField = require("../models/knowledgeField.model");

class KnowledgeFieldService {
  async getKnowledgeFields() {
    return await KnowledgeField.findAll();
  }

  async getKnowledgeField(id) {
    return await KnowledgeField.findByPk(id);
  }

  async createKnowledgeField(data) {
    return await KnowledgeField.create(data);
  }

  async updateKnowledgeField(id, data) {
    const currentKnowledgeField = await KnowledgeField.findByPk(id);
    if (!currentKnowledgeField) throw new Error("KnowledgeField not found");
    return await currentKnowledgeField.update(data);
  }

  async deleteKnowledgeField(id) {
    const currentKnowledgeField = await KnowledgeField.findByPk(id);
    if (!currentKnowledgeField) throw new Error("KnowledgeField not found");
    return await currentKnowledgeField.destroy();
  }
}

module.exports = new KnowledgeFieldService();
