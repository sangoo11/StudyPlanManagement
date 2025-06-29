import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import addButton from "../../../assets/images/addButton.png";
import minusButton from "../../../assets/images/minusButton.png";
import ShowMore from "../../../assets/images/showmore.png";
import ShowLess from "../../../assets/images/showless.png";
import AddClassroom from "./components/AddClassroom";
import DeleteClassroom from "./components/DeleteClassroom";
import AddSubject from "./components/AddSubject";
import DeleteSubject from "./components/DeleteSubject";
import EditSubject from "./components/EditSubject";

function SubjectManagement() {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [mappedCourses, setMappedCourses] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState("Công nghệ phần mềm");
    const [visibleClasses, setVisibleClasses] = useState({});
    const [learningOutcomes, setLearningOutcomes] = useState([]);

    const [modals, setModals] = useState({
        addSubject: false,
        editSubject: { visible: false, subjectId: null },
        deleteSubject: { visible: false, subjectId: null },
        addClassroom: { visible: false, subjectId: null },
        deleteClassroom: { visible: false, courseId: null },
    });

    const toggleClassesVisibility = (subjectId) => {
        setVisibleClasses((prev) => ({
            ...prev,
            [subjectId]: !prev[subjectId],
        }));
    };

    const fetchData = async () => {
        try {
            const [subjectRes, courseRes] = await Promise.all([
                axios.get("http://localhost:8080/v1/api/subject/get-all-subject"),
                axios.get("http://localhost:8080/v1/api/course/get-all-courses"),
            ]);

            const subjects = subjectRes.data.metadata || [];
            const courses = courseRes.data.metadata || [];

            const mapped = subjects.map((subject) => ({
                ...subject,
                courses: courses.filter((course) => course.subjectID === subject.id),
            }));

            setSubjects(subjects);
            setMappedCourses(mapped);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchLearningOutcomes = async () => {
        const visibleSubjectIDs = Object.keys(visibleClasses).filter(
            (key) => visibleClasses[key]
        );

        if (visibleSubjectIDs.length > 0) {
            try {
                const res = await axios.get(
                    `http://localhost:8080/v1/api/learning-outcome/get-all-learning-outcome/${visibleSubjectIDs[0]}`
                );
                setLearningOutcomes(res.data.metadata || []);
            } catch (error) {
                console.error("Error fetching learning outcomes:", error);
            }
        } else {
            setLearningOutcomes([]);
        }
    };

    useEffect(() => {
        fetchLearningOutcomes();
    }, [visibleClasses]);

    return (
        <div className="min-h-screen mt-[8vh] bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-center text-[#1DA599] mb-6">
                Quản lý môn học
            </h1>

            <div className="flex items-center justify-between mb-4">

                <button
                    className="w-10 h-10 bg-[#1DA599] text-white rounded-full"
                    onClick={() => setModals((prev) => ({ ...prev, addSubject: true }))}
                >
                    <img src={addButton} alt="Add" />
                </button>
            </div>

            <div className="space-y-4">
                {mappedCourses.map((subject) => (
                    <div key={subject.id} className="bg-white shadow-lg rounded-lg border border-gray-300">
                        <div className="p-4 bg-[#f9f9f9] border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className={`font-bold ${subject.active ? 'text-green-500' : 'text-red-500'}`}>
                                        {subject.subjectCode} - {subject.subjectName}
                                    </h2>
                                    <a
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-base font-medium text-[#1A56DB] underline"
                                      href={`http://localhost:8080/${subject.image}`}
                                    >
                                      {subject.subjectCode} Syllabus
                                    </a>


                                </div>
                                <div className="flex">
                                    <button
                                        className="px-4 py-2 text-white bg-[#1DA599] rounded-md mr-2 hover:bg-green-400 font-bold"
                                        onClick={() =>
                                            setModals((prev) => ({
                                                ...prev,
                                                editSubject: { visible: true, subjectId: subject.id },
                                            }))
                                        }
                                    >
                                        Chỉnh sửa môn học
                                    </button>
                                    <button
                                        className="px-4 py-2 text-white bg-red-400 rounded-md mr-2 hover:bg-red-600 font-bold"
                                        onClick={() =>
                                            setModals((prev) => ({
                                                ...prev,
                                                deleteSubject: { visible: true, subjectId: subject.id },
                                            }))
                                        }
                                    >
                                        Xóa môn học
                                    </button>
                                    <button
                                        className="w-8 h-8 rounded-full hover:bg-gray-200"
                                        onClick={() => toggleClassesVisibility(subject.id)}
                                    >
                                        <img
                                            src={visibleClasses[subject.id] ? ShowLess : ShowMore}
                                            alt="Toggle"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {visibleClasses[subject.id] && (
                            <div className="p-4">
                                <div className="flex mt-8 justify-center mb-12 items-center">
                                    <table className="w-[40vw] border-collapse border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-300 px-4 py-2">Mã chuẩn đầu ra</th>
                                                <th className="border border-gray-300 px-4 py-2">Mức độ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {learningOutcomes.map((outcome) => (
                                                <tr key={outcome.learningOutcomeID}>
                                                    <td className="border border-gray-300 px-4 py-2">{outcome.learningOutcomeID}</td>
                                                    <td className="border border-gray-300 px-4 py-2">{outcome.level}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {subject.courses.map((course) => (
                                    <button
                                        key={course.id}
                                        className="flex justify-between items-center p-2 border-b hover:bg-green-300 w-full"
                                        onClick={() => navigate(`/admin/detailclassroom/${course.id}`)}
                                    >
                                        <span>Lớp: {course.courseCode}</span>
                                        <span className={`font-bold ${course.active ? 'text-green-500' : 'text-red-500'}`}>
                                            Status: {course.active ? 'Active' : 'Inactive'}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setModals((prev) => ({
                                                    ...prev,
                                                    deleteClassroom: { visible: true, courseId: course.id },
                                                }));
                                            }}
                                            className="w-8 h-8 rounded-full hover:bg-red-200"
                                        >
                                            <img src={minusButton} alt="Delete" />
                                        </button>
                                    </button>
                                ))}
                                <button
                                    className="px-4 py-2 text-white bg-[#1DA599] rounded-md mt-4 hover:bg-green-400 font-bold"
                                    onClick={() =>
                                        setModals((prev) => ({
                                            ...prev,
                                            addClassroom: { visible: true, subjectId: subject.id },
                                        }))
                                    }
                                >
                                    Thêm lớp học
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {modals.addSubject && <AddSubject onClose={() => setModals((prev) => ({ ...prev, addSubject: false }))} onAddedSubject={fetchData} />}
            {modals.editSubject.visible && (
                <EditSubject
                    subjectID={modals.editSubject.subjectId}
                    onClose={() => setModals((prev) => ({ ...prev, editSubject: { visible: false, subjectId: null } }))}
                    onEditedSubject={fetchData}
                />
            )}
            {modals.deleteSubject.visible && (
                <DeleteSubject
                    subjectID={modals.deleteSubject.subjectId}
                    onClose={() => setModals((prev) => ({ ...prev, deleteSubject: { visible: false, subjectId: null } }))}
                    onDeletedSubject={fetchData}
                />
            )}
            {modals.addClassroom.visible && (
                <AddClassroom
                    subjectID={modals.addClassroom.subjectId}
                    onClose={() => setModals((prev) => ({ ...prev, addClassroom: { visible: false, subjectId: null } }))}
                    onAddedCourse={fetchData}
                />
            )}
            {modals.deleteClassroom.visible && (
                <DeleteClassroom
                    courseID={modals.deleteClassroom.courseId}
                    onClose={() => setModals((prev) => ({ ...prev, deleteClassroom: { visible: false, courseId: null } }))}
                    onDeletedCourse={fetchData}
                />
            )}
        </div>
    );
}

export default SubjectManagement;
