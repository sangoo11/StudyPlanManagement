import React, { useState, useEffect } from "react";
import axios from "axios";

function DeleteAward({ onClose, awardId }) {
    const [awardTitle, setAwardTitle] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAwardDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/api/award-type/${awardId}`);
                setAwardTitle(response.data.metadata.title);
            } catch (err) {
                console.error("Error fetching award details:", err);
                setError("Failed to fetch award details.");
            }
        };

        fetchAwardDetails();
    }, [awardId]);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(
                `http://localhost:8080/v1/api/award-type/${awardId}`
            );

            if (response.status === 200 || response.status === 204) {
                alert("Xóa giải thưởng thành công");
                onClose(); // Close the modal
            } else {
                setError("Đã xảy ra lỗi. Vui lòng kiểm tra lại!");
            }
        } catch (err) {
            console.error("Error deleting award:", err);
            setError("Không thể xóa giải thưởng. Vui lòng kiểm tra lại");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="flex flex-col w-[50vw] h-auto bg-gray-200 p-6 rounded">
                <h2 className="flex w-full justify-center text-3xl font-bold mb-4">Xóa giải thưởng</h2>
                <h2 className="flex w-full justify-center text-xl mb-4 text-red-500">
                    Bạn có chắc muốn xóa giải thưởng <strong className="ml-1 text-green-500">{awardTitle}</strong>?
                </h2>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <form className="flex flex-col space-y-4" onSubmit={handleDelete}>
                    <div className="flex space-x-4 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 bg-white text-[#1DA599] font-bold rounded hover:bg-[#1DA599] hover:text-white border-2 border-[#1DA599]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DeleteAward;