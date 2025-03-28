import React, { useState, useEffect } from "react";
import axios from "../../../config/axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import Swal from "sweetalert2";

const List = () => {
    const [rowData, setRowData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        setLoading(false);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/classrooms");
            setRowData(response.data);
            console.log(response.data);
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
            await axios.delete(`/api/classrooms/${id}`);
        } catch (error) {
            console.error("Error deleting data:", error);

            // Nếu có lỗi, phục hồi lại dữ liệu
            setRowData((prevData) => [...prevData]);
        } finally {
            setLoading(false);
        }
    };

    // Sửa lại hàm handleRowClick
    const handleRowClick = (params) => {
        // Kiểm tra xem có phải đang click vào cột Thao tác không
        const isActionColumn = params?.column?.colId === "Thao tác";
        const clickedElement = params.event.target;

        // Nếu không phải click vào cột Thao tác và không phải click vào button
        if (!isActionColumn && !clickedElement.closest("button")) {
            navigate(`/admin/classrooms-equipment/${params.data.id}`);
        }
    };

    // Cột trong bảng
    const columnDefs = [
        {
            headerName: "STT",
            valueGetter: (params) => {
                return params.node.rowIndex + 1; // Sử dụng params.node.rowIndex để lấy chỉ số dòng và cộng thêm 1
            },
            sortable: true,
            filter: true,
        },

        {
            headerName: "Tên phòng",
            field: "name",
            sortable: true,
            filter: true,
        },

        {
            headerName: "Loại phòng",
            field: "room_type_name",
            sortable: true,
            filter: true,
        },
        {
            headerName: "Tên tòa nhà",
            field: "building_name",
            sortable: true,
            filter: true,
        },

        {
            headerName: "Thao tác",
            colId: "Thao tác", // Thêm colId để nhận diện cột
            cellRenderer: (params) => (
                <div className="flex gap-2">
                    <Link
                        to={`${config.routes.classroomEdit.replace(
                            ":id",
                            params.data.id
                        )}`}
                    >
                        <button class="flex bg-yellow-400 hover:bg-yellow-500 text-white font-semibold justify-center items-center  px-3 rounded">
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
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>

                            <div>Sửa</div>
                        </button>
                    </Link>
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
                Quản lý phòng{" "}
            </h1>
            <Link
                to={config.routes.classroomAdd}
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
                            cursor: "pointer", // Thêm con trỏ để hiển thị có thể click
                        },
                    }}
                    onRowClicked={handleRowClick} // Thêm sự kiện click vào hàng
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 20, 50, 100]}
                    domLayout="normal"
                    rowHeight={60}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={(params) => params.api.sizeColumnsToFit()}
                />
            </div>
        </div>
    );
};

export default List;
