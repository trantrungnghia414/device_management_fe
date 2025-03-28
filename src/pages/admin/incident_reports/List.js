import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link } from "react-router-dom";
import config from "../../../config";
import Swal from "sweetalert2";

// Update the helper function
const checkCompletionStatus = (assignmentUsers) => {
    if (!assignmentUsers || assignmentUsers.length === 0) return false;

    // Single repair person case
    if (assignmentUsers.length === 1) {
        return assignmentUsers[0].completion_time ? true : false;
    }

    // Multiple repair people case
    return assignmentUsers.every((user) => user.completion_time);
};

// Update the helper function to handle assignment_users array
const getAssignedUserNames = (assignmentData) => {
    try {
        // Check if assignmentData exists and has assignment_users
        if (!assignmentData || !Array.isArray(assignmentData)) {
            console.log("No assignment data");
            return null;
        }

        const assignment = assignmentData[0];
        if (!assignment || !Array.isArray(assignment.assignment_users)) {
            console.log("No assignment users");
            return null;
        }

        // Map through users and get their names with completion time
        const names = assignment.assignment_users
            .filter((au) => au?.user?.name) // Filter out any invalid user entries
            .map((au) => {
                const name = au.user.name;
                const completionTime = au.completion_time
                    ? new Date(au.completion_time).toLocaleString("vi-VN")
                    : null;

                return completionTime
                    ? `${name} (Hoàn thành: ${completionTime})`
                    : name;
            });

        // Return null if no valid names found
        if (names.length === 0) return null;

        // Join names with line breaks for multiple lines in the cell
        return names.join("\n");
    } catch (error) {
        console.error("Error getting user names:", error);
        return null;
    }
};

const List = () => {
    const [rowData, setRowData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchData();
        setLoading(false);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/incident_reports");
            setRowData(response.data);
            console.log("ghjjknkj", response.data);
        } catch (error) {
            setError("Error fetching data");
            console.error("Error fetching data:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa?",
            text: "Bạn sẽ không thể khôi phục lại bản ghi này!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Hủy",
        });

        // Nếu người dùng không xác nhận, dừng lại
        if (!confirmDelete.isConfirmed) return;

        // Cập nhật UI trước khi xóa để phản ánh thay đổi ngay lập tức
        setRowData((prevData) => prevData.filter((item) => item.id !== id));
        setLoading(true);

        try {
            // Gọi API xóa
            await axios.delete(`/api/incident_reports/${id}`);
        } catch (error) {
            console.error("Error deleting data:", error);

            // Nếu có lỗi, phục hồi lại dữ liệu
            setRowData((prevData) => [...prevData]);
        } finally {
            setLoading(false);
        }
    };

    // Add onCellClicked handler
    const onCellClicked = (params) => {
        // Ignore clicks on the actions column
        if (params.column.colId !== "actions") {
            setSelectedRow(params.data);
            setShowModal(true);
        }
    };

    // Cột trong bảng
    const columnDefs = [
        {
            headerName: "STT",
            maxWidth: 80,
            valueGetter: (params) => {
                return params.node.rowIndex + 1; // Sử dụng params.node.rowIndex để lấy chỉ số dòng và cộng thêm 1
            },
            sortable: true,
            filter: true,
        },
        {
            headerName: "Ngày báo cáo",
            field: "report_time",
            sortable: true,
            filter: true,
            valueFormatter: (params) => {
                if (!params.value) return "";
                const date = new Date(params.value);
                const hours = date.getHours().toString().padStart(2, "0");
                const minutes = date.getMinutes().toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                return `${hours}:${minutes} ${day}/${month}/${year}`;
            },
        },
        {
            headerName: "Người báo cáo",
            field: "user.name",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Tên phòng",
            field: "classroom.name",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Nội dung",
            field: "description",
            sortable: true,
            filter: true,
            minWidth: 250,
            maxWidth: 400,
            cellRenderer: (params) => {
                if (!params.value) return "";

                const lines = params.value.split("\n");
                const displayedText = lines.slice(0, 3).join("\n");
                const hasMoreLines = lines.length > 3;

                return (
                    <div
                        className="py-2 px-3"
                        style={{
                            lineHeight: "1.5",
                            maxHeight: "4.5em", // 3 lines * 1.5 line-height
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        {displayedText}
                        {hasMoreLines && "..."}
                    </div>
                );
            },
            tooltipField: "description",
        },

        {
            headerName: "Trạng thái",
            field: "status",
            sortable: true,
            filter: true,
            cellRenderer: (params) => {
                if (params.value === "reported" || params.value === "viewed") {
                    return (
                        <Link
                            to={config.routes.assignmentAdd.replace(
                                ":id",
                                params.data.id
                            )}
                            className="text-blue-600 hover:text-blue-800 underline font-semibold"
                        >
                            Chưa phân công
                        </Link>
                    );
                }

                const assignmentUsers =
                    params.data.assignment?.assignment_users || [];

                if (assignmentUsers.length === 0) {
                    return (
                        <Link
                            to={config.routes.assignmentAdd.replace(
                                ":id",
                                params.data.id
                            )}
                            className="text-blue-600 hover:text-blue-800 underline font-semibold"
                        >
                            Chưa phân công
                        </Link>
                    );
                }

                if (assignmentUsers.length === 1) {
                    // Single user case
                    if (assignmentUsers[0].completion_time) {
                        return (
                            <div className="bg-green-400 px-2 py-[-2px] rounded">
                                Đã hoàn thành
                            </div>
                        );
                    }
                } else {
                    // Multiple users case
                    const allCompleted = assignmentUsers.every(
                        (user) => user.completion_time
                    );
                    if (allCompleted) {
                        return (
                            <div className="bg-green-400 px-2 py-[-2px] rounded">
                                Đã hoàn thành
                            </div>
                        );
                    }
                }

                return (
                    <div className="bg-yellow-300 px-2 py-[-2px] rounded">
                        Đang xử lý
                    </div>
                );
            },
        },
        {
            headerName: "Người sửa chữa",
            field: "assignment",
            sortable: true,
            filter: true,
            width: 300,
            minWidth: 250,
            autoHeight: true,
            wrapText: true,
            cellRenderer: (params) => {
                try {
                    // Check if we have assignment data and assignment_users
                    if (!params.data?.assignment?.assignment_users) {
                        return <div className="py-2">Chưa phân công</div>;
                    }

                    const assignmentUsers =
                        params.data.assignment.assignment_users;
                    const names = assignmentUsers
                        .map((au) => au?.user?.name)
                        .filter(Boolean);

                    if (names.length === 0) {
                        return <div className="py-2">Chưa phân công</div>;
                    }

                    return (
                        <div className="py-2">
                            {names.map((name, index) => (
                                <div key={index} className="mb-1">
                                    {name}
                                </div>
                            ))}
                        </div>
                    );
                } catch (error) {
                    console.error("Error rendering assigned users:", error);
                    return <div className="py-2">Chưa phân công</div>;
                }
            },
        },
        {
            headerName: "Thao tác",
            colId: "actions",
            cellRenderer: (params) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleDelete(params.data.id)}
                        class="flex bg-red-500 hover:bg-red-600 text-white font-semibold justify-center items-center px-3 rounded"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>
                        <div>Xóa</div>
                    </button>
                </div>
            ),
        },
    ];

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-center text-2xl font-semibold">
                Quản lý sự cố
            </h1>
            <Link
                to={config.routes.incidentReportAdd}
                className="w-28 flex items-center mb-2 justify-center bg-[#6387f1] hover:bg-[#5b5ddb] text-white font-semibold py-2 px-2 rounded"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
                <div>Thêm mới</div>
            </Link>
            <div className="text-red-500 text-lg ">{error}</div>

            <div
                className="ag-theme-alpine"
                style={{
                    width: "100%",
                    height: "500px", // Thêm chiều cao cố định
                    marginTop: "20px",
                }}
            >
                <AgGridReact
                    defaultColDef={{
                        flex: 1,
                        resizable: true,
                        sortable: true,
                        filter: true,
                        cellStyle: {
                            display: "flex",
                            alignItems: "center",
                            borderRight: "1px solid #e0e0e0",
                            cursor: "pointer",
                        },
                    }}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50, 100]}
                    domLayout="normal"
                    rowHeight={60}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={(params) => params.api.sizeColumnsToFit()}
                    onCellClicked={onCellClicked}
                />
            </div>

            {/* Modal */}
            {showModal && selectedRow && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-[1000px] h-[80vh] flex flex-col">
                        {/* Fixed Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-semibold ml-[30%] ">
                                    Chi tiết báo cáo & phân công sự cố
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Split content into two columns */}
                        <div className="p-6 overflow-y-auto flex-1">
                            {/* //<h1 className="text-lg mb-2 font-semibold">Chi tiết sự cố</h1> */}
                            <div className="grid grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                    {/* Reporter */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Người báo cáo
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedRow.user?.name || ""}
                                            readOnly
                                            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                                        />
                                    </div>

                                    {/* Report Time */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Ngày báo cáo
                                        </label>
                                        <input
                                            type="text"
                                            value={(() => {
                                                if (!selectedRow.report_time)
                                                    return "";
                                                const date = new Date(
                                                    selectedRow.report_time
                                                );
                                                const hours = date
                                                    .getHours()
                                                    .toString()
                                                    .padStart(2, "0");
                                                const minutes = date
                                                    .getMinutes()
                                                    .toString()
                                                    .padStart(2, "0");
                                                const day = date
                                                    .getDate()
                                                    .toString()
                                                    .padStart(2, "0");
                                                const month = (
                                                    date.getMonth() + 1
                                                )
                                                    .toString()
                                                    .padStart(2, "0");
                                                const year = date.getFullYear();
                                                return `${hours}:${minutes} ${day}/${month}/${year}`;
                                            })()}
                                            readOnly
                                            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                                        />
                                    </div>

                                    {/* Room Name */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Tên phòng
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                selectedRow.classroom?.name ||
                                                ""
                                            }
                                            readOnly
                                            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                                        />
                                    </div>

                                    {/* Description moved to left column */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Nội dung
                                        </label>
                                        <textarea
                                            value={
                                                selectedRow.description || ""
                                            }
                                            readOnly
                                            rows="5"
                                            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                                        />
                                    </div>
                                </div>

                                {/* Right Column - Assignment Details */}
                                <div className="space-y-4">
                                    {selectedRow.assignment && (
                                        <>
                                            {/* Assignment Time */}
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2">
                                                    Thời gian phân công
                                                </label>
                                                <input
                                                    type="text"
                                                    value={(() => {
                                                        if (
                                                            !selectedRow
                                                                .assignment
                                                                .assignment_time
                                                        )
                                                            return "";
                                                        const date = new Date(
                                                            selectedRow.assignment.assignment_time
                                                        );
                                                        const hours = date
                                                            .getHours()
                                                            .toString()
                                                            .padStart(2, "0");
                                                        const minutes = date
                                                            .getMinutes()
                                                            .toString()
                                                            .padStart(2, "0");
                                                        const day = date
                                                            .getDate()
                                                            .toString()
                                                            .padStart(2, "0");
                                                        const month = (
                                                            date.getMonth() + 1
                                                        )
                                                            .toString()
                                                            .padStart(2, "0");
                                                        const year =
                                                            date.getFullYear();
                                                        return `${hours}:${minutes} ${day}/${month}/${year}`;
                                                    })()}
                                                    readOnly
                                                    className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                                                />
                                            </div>

                                            {/* Assigned Users and Their Details */}
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-bold mb-2">
                                                    Người được phân công
                                                </label>
                                                <div className="space-y-4">
                                                    {selectedRow.assignment.assignment_users?.map(
                                                        (assignedUser) => (
                                                            <div
                                                                key={
                                                                    assignedUser.id
                                                                }
                                                                className="p-2 border rounded-lg bg-gray-100"
                                                            >
                                                                <div className="mb-1">
                                                                    <span className="font-semibold">
                                                                        Họ tên:
                                                                    </span>{" "}
                                                                    {
                                                                        assignedUser
                                                                            .user
                                                                            ?.name
                                                                    }
                                                                </div>

                                                                {assignedUser.completion_time && (
                                                                    <div className="mb-2">
                                                                        <span className="font-semibold">
                                                                            Thời
                                                                            gian
                                                                            hoàn
                                                                            thành:
                                                                        </span>{" "}
                                                                        {(() => {
                                                                            const date =
                                                                                new Date(
                                                                                    assignedUser.completion_time
                                                                                );
                                                                            const hours =
                                                                                date
                                                                                    .getHours()
                                                                                    .toString()
                                                                                    .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                    );
                                                                            const minutes =
                                                                                date
                                                                                    .getMinutes()
                                                                                    .toString()
                                                                                    .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                    );
                                                                            const day =
                                                                                date
                                                                                    .getDate()
                                                                                    .toString()
                                                                                    .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                    );
                                                                            const month =
                                                                                (
                                                                                    date.getMonth() +
                                                                                    1
                                                                                )
                                                                                    .toString()
                                                                                    .padStart(
                                                                                        2,
                                                                                        "0"
                                                                                    );
                                                                            const year =
                                                                                date.getFullYear();
                                                                            return `${hours}:${minutes} ${day}/${month}/${year}`;
                                                                        })()}
                                                                    </div>
                                                                )}

                                                                {assignedUser.notes && (
                                                                    <div className="mb-2">
                                                                        <span className="font-semibold">
                                                                            Ghi
                                                                            chú:
                                                                        </span>{" "}
                                                                        <div className="mt-1 p-2 bg-white rounded">
                                                                            {
                                                                                assignedUser.notes
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <img
                                                                    className="w-[500px]"
                                                                    src={
                                                                        assignedUser.image_url
                                                                    }
                                                                    alt=""
                                                                />

                                                                {!assignedUser.completion_time && (
                                                                    <div className="text-yellow-600">
                                                                        Chưa
                                                                        hoàn
                                                                        thành
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Status */}
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">
                                            Trạng thái
                                        </label>
                                        <div className="w-full px-3 py-2 border rounded-lg bg-gray-100">
                                            {selectedRow.status ===
                                                "reported" && "Chưa phân công"}
                                            {selectedRow.status ===
                                                "completed" && "Đã xử lý"}
                                            {selectedRow.status ===
                                                "assigned" &&
                                                (() => {
                                                    const assignmentUsers =
                                                        selectedRow.assignment
                                                            ?.assignment_users ||
                                                        [];
                                                    if (
                                                        checkCompletionStatus(
                                                            assignmentUsers
                                                        )
                                                    ) {
                                                        return "Đã hoàn thành";
                                                    }
                                                    return "Đang xử lý";
                                                })()}
                                            {selectedRow.status ===
                                                "processing" && "Đang xử lý"}
                                            {selectedRow.status ===
                                                "processed" && "Đã xử lý"}
                                            {!selectedRow.status &&
                                                "Chưa xử lý"}
                                        </div>
                                    </div>

                                    {/* Show assignment button if status is "reported" */}
                                    {selectedRow.status === "reported" && (
                                        <div className="flex justify-end mt-6">
                                            <Link
                                                to={config.routes.assignmentAdd.replace(
                                                    ":id",
                                                    selectedRow.id
                                                )}
                                                className="bg-[#233d7e] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center gap-2"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                                    />
                                                </svg>
                                                Phân công
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
