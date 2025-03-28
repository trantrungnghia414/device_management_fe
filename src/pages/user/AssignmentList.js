import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function AssignmentList() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("assigned"); // Mặc định lọc "Chưa xử lý"
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7); // Set fixed number of items per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/assignment-list");
                console.log(response.data);
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
        });
    };

    // Update the getStatusClass function
    const getStatusClass = (status) => {
        switch (status) {
            case "Đã hoàn thành":
                return "bg-green-100 text-green-800";
            case "Đang xử lý":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Update the getDisplayStatus function
    const getDisplayStatus = (assignment) => {
        if (assignment.incident_status === "assigned") {
            // Check if assignment has users array
            if (!assignment.users || assignment.users.length === 0) {
                return "Chưa xử lý";
            }

            // Single repair person case
            if (assignment.users.length === 1) {
                return assignment.users[0].completion_time
                    ? "Đã hoàn thành"
                    : "Đang xử lý";
            }

            // Multiple repair people case
            const allCompleted = assignment.users.every(
                (user) => user.completion_time
            );
            return allCompleted ? "Đã hoàn thành" : "Đang xử lý";
        }

        return assignment.incident_status;
    };

    // Add this function to group assignments
    const groupAssignments = (assignments) => {
        const grouped = {};

        assignments.forEach((assignment) => {
            if (!grouped[assignment.assignment_id]) {
                grouped[assignment.assignment_id] = {
                    ...assignment,
                    users: [
                        {
                            name: assignment.user_name,
                            completion_time: assignment.completion_time,
                        },
                    ],
                };
            } else {
                grouped[assignment.assignment_id].users.push({
                    name: assignment.user_name,
                    completion_time: assignment.completion_time,
                });
            }
        });

        return Object.values(grouped);
    };

    // Update the filter function
    const filteredAssignments = assignments.filter((item) => {
        if (!filter) return true;

        // Get the grouped assignments to check completion status
        const groupedItem = groupAssignments([item])[0];
        const status = getDisplayStatus(groupedItem);

        return (
            (filter === "assigned" && status !== "Đã hoàn thành") ||
            (filter === "completed" && status === "Đã hoàn thành")
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = groupAssignments(filteredAssignments).slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(
        groupAssignments(filteredAssignments).length / itemsPerPage
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    console.log("Dữ liệu từ API:", assignments);
    console.log("Trạng thái đang lọc:", filter);
    console.log(
        "Dữ liệu sau khi lọc:",
        assignments.filter((item) => item.incident_status === filter)
    );

    return (
        <main className="flex-1 container mx-auto py-6 px-4 h-screen flex flex-col">
            {/* Header section */}
            <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Danh Sách Phân Công Sửa Chữa
                </h1>
                <div className="flex gap-4 max-md:w-full">
                    <select
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 max-md:flex-1"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="assigned">Đang xử lý</option>
                        <option value="completed">Đã hoàn thành</option>
                    </select>
                </div>
            </div>

            {/* Table container with fixed height for scrolling */}
            <div className="flex-1 bg-white rounded-lg shadow flex flex-col">
                <div
                    className="overflow-y-auto"
                    style={{ maxHeight: "calc(100vh - 180px)" }}
                >
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr className="max-md:hidden">
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Người được phân công
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Phòng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Mô tả
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
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-4"
                                    >
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentItems.length > 0 ? (
                                currentItems.map((assignment, index) => (
                                    <tr
                                        key={assignment.id}
                                        className={`max-md:block max-md:border-b max-md:p-4 hover:bg-gray-50 transition-colors cursor-pointer group
                      ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap max-md:block max-md:px-0 max-md:py-1">
                                            <div className="flex flex-col gap-1">
                                                {assignment.users.map(
                                                    (user, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="text-sm font-medium text-gray-900 group-hover:text-blue-600"
                                                        >
                                                            {user.name}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </td>
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
                                                {assignment.description}
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
                                            <div className="flex flex-col gap-1">
                                                {assignment.users.map(
                                                    (user, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-sm text-gray-900"
                                                        >
                                                            {user.completion_time
                                                                ? formatDateTime(
                                                                      user.completion_time
                                                                  )
                                                                : "Chưa hoàn thành"}
                                                        </span>
                                                    )
                                                )}
                                            </div>
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
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Không có dữ liệu phân công
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination - Fixed at bottom */}
                {totalPages > 1 && (
                    <div className="px-6 py-3 border-t border-gray-200 bg-white mt-auto">
                        <div className="flex justify-end">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === 1
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-gray-500 hover:bg-gray-50"
                                    }`}
                                >
                                    {/* <span className="sr-only">Previous</span>
                  Trước */}
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    // Show first page, last page, and pages around current page
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 &&
                                            pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() =>
                                                    paginate(pageNumber)
                                                }
                                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                                                    currentPage === pageNumber
                                                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                                        : "text-gray-500 hover:bg-gray-50"
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    }
                                    // Show ellipsis for gaps
                                    if (
                                        pageNumber === currentPage - 2 ||
                                        pageNumber === currentPage + 2
                                    ) {
                                        return (
                                            <span
                                                key={pageNumber}
                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700"
                                            >
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === totalPages
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-gray-500 hover:bg-gray-50"
                                    }`}
                                >
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default AssignmentList;
