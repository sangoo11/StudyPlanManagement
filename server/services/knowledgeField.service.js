// write for KnowledgeField

const KnowledgeField = require("../models/knowledgeField.model");
const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");
const Subject = require("../models/subject.model");
const KnowledgeDomain = require("../models/knowledgeDomain.model");
const sequelize = require("../configs/sequelize");
const {QueryTypes} = require("sequelize");

class KnowledgeFieldService {
    async getKnowledgeFields({fields, knowledgeDomainID}) {
        let attributes = ['id'];

        if (fields) {
            fields = fields.split(',');
            attributes = [...attributes, ...fields];
        }

        let where = {};

        if (knowledgeDomainID) {
            where = {
                knowledgeDomainID
            }
        }

        return await KnowledgeField.findAll({attributes: fields ? attributes : null, where})
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

    async getKnowledgeFieldStudentLearn(studentID, query) {
        const replacements = {studentID};

        if (query.knowledgeFieldID) {
            replacements.knowledgeFieldID = query.knowledgeFieldID;
        }

        if (query.knowledgeDomainID) {
            replacements.knowledgeDomainID = query.knowledgeDomainID;
        }

        const [studentSubjects] = await sequelize.query(`
            SELECT kf.id                                                                             as knowledgeFieldID,
                   kf.name,
                   kf.minCredit,
                   CAST(COALESCE(SUM(s.credit), 0) AS SIGNED)                                        AS totalCredits,
                   (CAST(COALESCE(SUM(s.credit), 0) AS SIGNED) / CAST(kf.minCredit AS SIGNED)) * 100 AS percentage
            FROM enrollment AS en
                     INNER JOIN course AS c ON en.courseID = c.id
                     INNER JOIN subject AS s ON c.subjectID = s.id
                     INNER JOIN knowledgefield AS kf ON s.knowledgeFieldID = kf.id
                     INNER JOIN knowledgedomain AS kd ON kf.knowledgeDomainID = kd.id
            WHERE en.studentID = :studentID
              AND en.status = ${query.status ? `'${query.status}'` : "'pass'"} ${query.knowledgeFieldID ? 'AND kf.id = :knowledgeFieldID' : ''} ${query.knowledgeDomainID ? 'AND kd.id = :knowledgeDomainID' : ''}
            GROUP BY kf.id, kf.name;
        `, {
            type: QueryTypes.SELECT,
            replacements
        });

        return {
            studentSubjects,
        };
    }
}

module.exports = new KnowledgeFieldService();
