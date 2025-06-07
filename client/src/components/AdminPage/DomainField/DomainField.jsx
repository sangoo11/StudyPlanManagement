import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import AddDF from './AddDF';
import EditDF from './EditDF';
import {toast} from 'react-toastify';

function DomainField() {
    const [knowledgeFields, setKnowledgeFields] = useState([]);
    const [domainMap, setDomainMap] = useState({});
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

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
            setDomainMap({names: domainNames, credits: domainCredits, groups: groupedFields});
        } catch (error) {
            console.error('Failed to fetch fields:', error);
        } finally {
            setLoading(false);
        }
    };

    const recalculateDomainCredits = async () => {
        try {
            const res = await axios.get('http://localhost:8080/v1/api/knowledge-field');
            const fields = res.data.metadata;

            const domainFieldGroups = {};
            fields.forEach((field) => {
                const domainID = field.knowledgeDomainID;
                if (!domainFieldGroups[domainID]) domainFieldGroups[domainID] = [];
                domainFieldGroups[domainID].push(field.minCredit);
            });

            await Promise.all(Object.entries(domainFieldGroups).map(async ([domainID, credits]) => {
                const totalCredit = credits.reduce((sum, c) => sum + c, 0);
                const res = await axios.get(`http://localhost:8080/v1/api/knowledge-domain/${domainID}`);
                const domain = res.data.metadata;

                await axios.put(`http://localhost:8080/v1/api/knowledge-domain/${domainID}`, {
                    name: domain.name,
                    description: domain.description,
                    active: domain.active,
                    minCredit: totalCredit,
                });
            }));
        } catch (error) {
            console.error('Failed to recalculate domain credits:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/v1/api/knowledge-field/${id}`);
            toast.success('Xoá thành công!');
            await recalculateDomainCredits();
            await fetchKnowledgeFields();
        } catch (error) {
            console.error('Failed to delete field:', error);
            toast.error('Xoá thất bại!');
        }
    };

    const handleEditClick = (id) => {
        setSelectedId(id);
        setShowEditModal(true);
    };
    useEffect(() => {
        fetchKnowledgeFields();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-2xl font-bold text-[#1DA599]">Lĩnh vực kiến thức</h1>
            </div>

            <div className="flex justify-end mr-8 mt-4">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-10 h-10 bg-[#1DA599] text-white rounded-full hover:border-4 hover:border-yellow-400 hover:text-gray-700 flex items-center justify-center"
                >
                    <img src={AddButton} alt="Add"/>
                </button>
            </div>

            {loading ? (
                <p className="text-center mt-10">Đang tải...</p>
            ) : (
                <div className="mt-10 space-y-10">
                    {Object.entries(domainMap.groups || {}).map(([domainID, fields]) => (
                        <div key={domainID} id={`dm-${domainID}`}
                             className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
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
                                    <th className="p-3 border text-left">Trạng thái</th>
                                    <th className="p-3 border text-left">Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {fields.map((field) => (
                                    <tr key={field.id} className="border-t hover:bg-gray-50">
                                        <td className="p-3 border break-words whitespace-pre-line max-w-xs">{field.name}</td>
                                        <td className="p-3 border break-words whitespace-pre-line max-w-xs">{field.description}</td>
                                        <td className="p-3 border">{field.minCredit}</td>
                                        <td className="p-3 border text-sm">
                        <span className={field.active ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {field.active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                        </span>
                                        </td>
                                        <td className="p-3 border space-x-2">
                                            <button
                                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleEditClick(field.id)}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                                onClick={() => handleDelete(field.id)}
                                            >
                                                Xoá
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}

            {/* Modals */}
            {showAddModal && (
                <AddDF
                    onClose={() => setShowAddModal(false)}
                    onAddedDF={async () => {
                        await recalculateDomainCredits();
                        await fetchKnowledgeFields();
                    }}
                />
            )}
            {showEditModal && selectedId && (
                <EditDF
                    id={selectedId}
                    onClose={() => setShowEditModal(false)}
                    onEditedDF={async () => {
                        await recalculateDomainCredits();
                        await fetchKnowledgeFields();
                    }}
                />
            )}
        </div>
    );
}

export default DomainField;
