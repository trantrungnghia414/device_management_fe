import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import Swal from "sweetalert2";

function Assignment() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("assigned");
    const [notes, setNotes] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const email = localStorage.getItem("email");

    // Add states for modal
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [proofImage, setProofImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/assignment-list-user", {
                    params: { email: email },
                });

                setAssignments(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setAssignments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Đã hoàn thành":
                return "bg-green-100 text-green-800";
            case "Xử lý":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getDisplayStatus = (assignment) => {
        if (assignment.completion_time) {
            return "Đã hoàn thành";
        }
        if (assignment.incident_status === "assigned") {
            return "Xử lý";
        }
        return assignment.incident_status;
    };

    const filteredAssignments = assignments.filter((item) => {
        if (!filter) return true;
        const status = getDisplayStatus(item);
        return (
            (filter === "assigned" && status !== "Đã hoàn thành") ||
            (filter === "completed" && status === "Đã hoàn thành")
        );
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProofImage(file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!notes.trim()) {
                Swal.fire("Lỗi", "Vui lòng nhập mô tả công việc", "error");
                return;
            }
            if (!proofImage) {
                Swal.fire("Lỗi", "Vui lòng tải lên ảnh minh chứng", "error");
                return;
            }

            setLoading(true);
            const formData = new FormData();
            formData.append("notes", notes);
            formData.append("proof_image", proofImage);

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            const responseda = await axios.post(
                `/api/post-assignment-user/${selectedId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Kết quả1:", responseda.data);

            // Refresh data
            const response = await axios.get("/api/assignment-list-user", {
                params: { email },
            });
            setAssignments(response.data);
            console.log("Kết quả2:", response.data);
            // Reset form
            setShowModal(false);
            setNotes("");
            setProofImage(null);
            setImagePreview("");

            Swal.fire({
                title: "Thành công!",
                text: "Cập nhật trạng thái thành công",
                icon: "success",
                timer: 1500,
            });
        } catch (error) {
            console.error("Error:", error);
            Swal.fire(
                "Lỗi",
                error.response?.data?.message || "Có lỗi xảy ra khi cập nhật",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 container mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Danh Sách Công Việc Được Phân Công
                </h1>
                <div className="flex gap-4 max-md:w-full">
                    <select
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 max-md:flex-1"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="assigned">Xử lý</option>
                        <option value="completed">Đã hoàn thành</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr className="max-md:hidden">
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Phòng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Sự cố
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Thời gian bắt đầu
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Thời gian hoàn thành
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            {filter === "assigned" && (
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={filter === "assigned" ? "6" : "5"}
                                    className="text-center py-4"
                                >
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredAssignments.length > 0 ? (
                            filteredAssignments.map((assignment, index) => (
                                <tr
                                    key={assignment.id}
                                    className={`max-md:block max-md:border-b max-md:p-4 hover:bg-gray-50 transition-colors cursor-pointer group
                    ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                                >
                                    <td className="px-6 py-4 max-md:block max-md:px-0 max-md:py-1">
                                        <span className="max-md:font-semibold md:hidden">
                                            Phòng:{" "}
                                        </span>
                                        <span className="text-sm text-gray-900">
                                            {assignment.classroom_name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-md:block max-md:px-0 max-md:py-1  md:max-w-[600px]">
                                        <span className="max-md:font-semibold md:hidden">
                                            Sự cố:{" "}
                                        </span>
                                        <span className="text-sm text-gray-900">
                                            {assignment.incident_description}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-md:block max-md:px-0 max-md:py-1">
                                        <span className="max-md:font-semibold md:hidden">
                                            Thời gian bắt đầu:{" "}
                                        </span>
                                        <span className="text-sm text-gray-900">
                                            {formatDateTime(
                                                assignment.assignment_time
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-md:block max-md:px-0 max-md:py-1">
                                        <span className="max-md:font-semibold md:hidden">
                                            Thời gian hoàn thành:{" "}
                                        </span>
                                        <span className="text-sm text-gray-900">
                                            {assignment.completion_time
                                                ? formatDateTime(
                                                      assignment.completion_time
                                                  )
                                                : "Chưa hoàn thành"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-md:block max-md:px-0 max-md:py-1">
                                        <span className="max-md:font-semibold md:hidden">
                                            Trạng thái:{" "}
                                        </span>
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                                                getDisplayStatus(assignment)
                                            )}`}
                                        >
                                            {getDisplayStatus(assignment)}
                                        </span>
                                    </td>
                                    {filter === "assigned" && (
                                        <td className=" py-4 max-md:block max-md:px-0 max-md:py-1">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-300 ease-in-out flex items-center gap-2"
                                                onClick={() => {
                                                    setSelectedId(
                                                        assignment.id
                                                    );
                                                    setShowModal(true);
                                                }}
                                            >
                                                Cập nhật trạng thái
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={filter === "assigned" ? "6" : "5"}
                                    className="text-center py-4 text-gray-500"
                                >
                                    Không có dữ liệu phân công
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[500px]">
                        <h2 className="text-xl font-semibold mb-4">
                            Cập nhật trạng thái công việc
                        </h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mô tả công việc đã thực hiện
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                                rows="4"
                                placeholder="Nhập mô tả công việc..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Minh chứng (Hình ảnh)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-40 rounded-lg mx-auto"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"
                            >
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Assignment;
