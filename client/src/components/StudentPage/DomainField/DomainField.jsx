import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DomainField() {
  const [knowledgeFields, setKnowledgeFields] = useState([]);
  const [domainMap, setDomainMap] = useState({
    names: {},
    credits: {},
    groups: {},
  });
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [studentCreditsMap, setStudentCreditsMap] = useState({});

  // Fetch knowledge fields and domain info
  const fetchKnowledgeFields = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/v1/api/knowledge-field');
      const fields = res.data.metadata;

      const groupedFields = {};
      const domainNames = {};
      const domainCredits = {};

      // Fetch domain info only once per domainID
      await Promise.all(
        fields.map(async (field) => {
          const domainID = field.knowledgeDomainID;
          if (!domainNames[domainID]) {
            try {
              const domainRes = await axios.get(
                `http://localhost:8080/v1/api/knowledge-domain/${domainID}`
              );
              domainNames[domainID] = domainRes.data.metadata.name;
              domainCredits[domainID] = domainRes.data.metadata.minCredit;
            } catch (err) {
              domainNames[domainID] = 'Không xác định';
              domainCredits[domainID] = 0;
            }
          }

          if (!groupedFields[domainID]) groupedFields[domainID] = [];
          groupedFields[domainID].push(field);
        })
      );

      setKnowledgeFields(fields);
      setDomainMap({
        names: domainNames,
        credits: domainCredits,
        groups: groupedFields,
      });
    } catch (error) {
      console.error('Failed to fetch fields:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch student credit info
  const fetchStudentCredits = async () => {
    const accountID = localStorage.getItem('accountID');
    if (!accountID) return;

    try {
      const { data } = await axios.get(
        `http://localhost:8080/v1/api/account/get-user-data/${accountID}`
      );
      const student = data.metadata;
      setStudentData(student);

      const studentID = student.id;
      const res = await axios.get(
        `http://localhost:8080/v1/api/knowledge-field/student/${studentID}`
      );

      const studentSubject = res.data.metadata.studentSubjects;

      const creditMap = {};
      if (studentSubject && studentSubject.knowledgeFieldID) {
        creditMap[studentSubject.knowledgeFieldID] = studentSubject.totalCredits;
      }

      setStudentCreditsMap(creditMap);
    } catch (err) {
      console.error('Failed to fetch student credits:', err);
    }
};

  useEffect(() => {
    fetchKnowledgeFields();
    fetchStudentCredits();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-center mt-[8vh]">
        <h1 className="text-2xl font-bold text-[#1DA599]">Khối kiến thức</h1>
      </div>

      {loading ? (
        <p className="text-center mt-10">Đang tải...</p>
      ) : (
        <div className="mt-10 space-y-10">
          {Object.entries(domainMap.groups).map(([domainID, fields]) => (
            <div
              key={domainID}
              className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6"
            >
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
                    <th className="p-3 border text-left">Tiến độ đạt được (%)</th>
                    <th className="p-3 border text-left">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field) => {
                    const minCredit = field.minCredit || 1;
                    const totalCredits = studentCreditsMap[field.id] || 0;
                    // Calculate progress and cap at 100
                    const rawProgress = (totalCredits / minCredit) * 100;
                    const progress = rawProgress > 100 ? 100 : rawProgress;
                    // Status logic: if progress == 100%, completed
                    const status = progress === 100 ? 'Đã hoàn thành' : 'Chưa hoàn thành';

                    return (
                      <tr key={field.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 border break-words whitespace-pre-line max-w-xs">
                          {field.name}
                        </td>
                        <td className="p-3 border break-words whitespace-pre-line max-w-xs">
                          {field.description}
                        </td>
                        <td className="p-3 border">{minCredit}</td>
                        <td className="p-3 border">{totalCredits}</td>
                        <td className="p-3 border">{progress.toFixed(2)}%</td>
                        <td className="p-3 border text-sm">
                          <span
                            className={
                              status === 'Đã hoàn thành'
                                ? 'text-green-600 font-medium'
                                : 'text-red-600 font-medium'
                            }
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DomainField;
