import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import { toast } from 'react-toastify';

function DomainField() {
  const [knowledgeFields, setKnowledgeFields] = useState([]);
  const [domainMap, setDomainMap] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchKnowledgeFields = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/v1/api/knowledge-field');
      const fields = res.data.metadata;

      const groupedFields = {};
      const domainNames = {};
      const domainCredits = {};

      await Promise.all(fields.map(async (field) => {
        const domainID = field.knowledgeDomainID;
        if (!domainNames[domainID]) {
          try {
            const domainRes = await axios.get(`http://localhost:8080/v1/api/knowledge-domain/${domainID}`);
            domainNames[domainID] = domainRes.data.metadata.name;
            domainCredits[domainID] = domainRes.data.metadata.minCredit;
          } catch (err) {
            console.error(`Failed to fetch domain ${domainID}`, err);
            domainNames[domainID] = 'Không xác định';
            domainCredits[domainID] = 'Không xác định';
          }
        }

        if (!groupedFields[domainID]) groupedFields[domainID] = [];
        groupedFields[domainID].push(field);
      }));

      setKnowledgeFields(fields);
      setDomainMap({ names: domainNames, credits: domainCredits, groups: groupedFields });
    } catch (error) {
      console.error('Failed to fetch fields:', error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
        fetchKnowledgeFields();
    }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-center mt-[8vh]">
        <h1 className="text-2xl font-bold text-[#1DA599]">Lĩnh vực kiến thức</h1>
      </div>

      {loading ? (
        <p className="text-center mt-10">Đang tải...</p>
      ) : (
        <div className="mt-10 space-y-10">
          {Object.entries(domainMap.groups || {}).map(([domainID, fields]) => (
            <div key={domainID} className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-[#1DA599] mb-4">
                {domainMap.names[domainID]}
              </h2>
              <h4 className="font-bold mb-4">
                Số tín chỉ tối thiểu {domainMap.credits[domainID]}
              </h4>

                <table className="min-w-full table-auto border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 border text-left w-1/4">Tên lĩnh vực</th>
                      <th className="p-3 border text-left">Mô tả</th>
                      <th className="p-3 border text-left">Số tín chỉ</th>
                      <th className="p-3 border text-left">Số tín chỉ tích lũy</th>
                      <th className="p-3 border text-left">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field) => (
                      <tr key={field.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 border break-words whitespace-pre-line max-w-xs">{field.name}</td>
                        <td className="p-3 border break-words whitespace-pre-line max-w-xs">{field.description}</td>
                        <td className="p-3 border">{field.minCredit}</td>
                        <td className="p-3 border">4</td>
                        <td className="p-3 border text-sm">
                          <span className={field.active ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                            {field.active ? 'Chưa hoàn thành' : 'Đã hoàn thành'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h2 className="flex text-xl font-bold mb-4 justify-end">
                  Tiến độ đạt được : 37,2%
                </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DomainField;
