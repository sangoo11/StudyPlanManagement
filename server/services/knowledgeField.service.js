// write for KnowledgeField

const KnowledgeField = require("../models/knowledgeField.model");
const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");
const Subject = require("../models/subject.model");
const KnowledgeDomain = require("../models/knowledgeDomain.model");

class KnowledgeFieldService {
  async getKnowledgeFields() {
    return await KnowledgeField.findAll();
  }

    async getKnowledgeField(id) {
        return await KnowledgeField.findByPk(id, {
            include: {
                model: Subject,
                as: "subjects",
            },
        });
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

    async getKnowledgeFieldStudentLearn(studentID) {
        const studentSubject = await Enrollment.findAll({
            where: {
                studentID: studentID
            },
            include: [
              {
                model: Course, // Assuming Enrollment has a relation with Course
                include: [
                  {
                    model: Subject, // Assuming Course has a relation with Subject
                    include: [
                      {
                        model: KnowledgeField, // Assuming Subject has a relation with KnowledgeField
                        include: [
                            {
                                model: KnowledgeDomain // Assuming KnowledgeField has a relation with KnowledgeDomain
                            }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
        })
        return studentSubject;
    }
}

module.exports = new KnowledgeFieldService();
