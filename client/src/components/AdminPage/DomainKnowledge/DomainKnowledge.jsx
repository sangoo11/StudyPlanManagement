import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddButton from '../../../assets/images/addButton.png';
import AddDN from './AddDN';
import EditDN from './EditDN';
import DeleteDN from './DeleteDN';
import { toast } from 'react-toastify';

function DomainKnowledge() {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // Get all knowledge domains
    const fetchDomains = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/v1/api/knowledge-domain');
            setDomains(response.data.metadata);
        } catch (error) {
            console.error('Failed to fetch domains:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDomains();
    }, []);

    // Delete a domain by ID
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/v1/api/knowledge-domain/${id}`);
            toast.success('Xoá thành công!');
            await fetchDomains(); 
        } catch (error) {
            console.error('Failed to delete domain:', error);
            toast.error('Xoá không thành công. Vui lòng thử lại.');
        }
    };

    // Handle edit click
    const handleEditClick = (id) => {
        setSelectedId(id);
        setShowEditModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex items-center justify-center mt-[8vh]">
                <h1 className="text-2xl font-bold text-[#1DA599]">Khối kiến thức</h1>
            </div>

            <div className="flex justify-end mr-8 mt-4">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="w-10 h-10 bg-[#1DA599] text-white rounded-full hover:border-4 hover:border-yellow-400 hover:text-gray-700 flex items-center justify-center"
                    >
                      <img src={AddButton} alt="Add" />
                    </button>
                  </div>

            <div className="mt-10 max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="space-y-4">
                        {domains.map((domain) => (
                            <li
                                key={domain.id}
                                className="border border-gray-200 rounded p-4 flex justify-between items-start"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold text-[#1DA599]">{domain.name}</h2>
                                    <p className="text-gray-600">{domain.description}</p>
                                    <p className="text-sm text-gray-500">Số tín chỉ tối thiểu: {domain.minCredit}</p>
                                    <p className={`text-sm font-semibold ${domain.active ? 'text-green-600' : 'text-red-600'}`}>
                                        {domain.active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                                    </p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleDelete(domain.id)}
                                    >
                                        Xoá
                                    </button>
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        onClick={() => handleEditClick(domain.id)}
                                    >
                                        Sửa
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Modals */}
            {showAddModal && (
                <AddDN
                    onClose={() => setShowAddModal(false)}
                    onAddedDN={fetchDomains}
                />
            )}
            {showEditModal && selectedId && (
                <EditDN
                    id={selectedId}
                    onClose={() => setShowEditModal(false)}
                    onEditedDN={fetchDomains}
                />
            )}
        </div>
    );
}

export default DomainKnowledge;
