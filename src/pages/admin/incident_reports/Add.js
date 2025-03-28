import axios from "../../../config/axios";
import { ErrorMessage, useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";

function Add() {
    const [error, setError] = useState("");
    const [buildingData, setBuildingData] = useState([]);
    const [filteredClassrooms, setFilteredClassrooms] = useState([]);
    const email = localStorage.getItem("email");
    // Fetch data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/api/building_room");
                setBuildingData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            building_id: "",
            classroom_id: "",
            description: "", // Add description field
        },

        validationSchema: Yup.object({
            building_id: Yup.string().required("Vui lòng chọn tòa nhà"),
            classroom_id: Yup.string().required("Vui lòng chọn phòng học"),
            description: Yup.string().required("Vui lòng nhập mô tả sự cố"), // Add validation
        }),

        onSubmit: async (values, { setSubmitting }) => {
            try {
                const payload = {
                    email: email,
                    classroom_id: parseInt(values.classroom_id),
                    description: values.description,
                };

                console.log("Sending data:", payload);
                const response = await axios.post(
                    "/api/incident_reports",
                    payload
                );
                console.log("Response:", response.data);
                window.location.href = "/admin/incident-reports";
            } catch (error) {
                console.error("Error:", error);
                setError("Thêm báo cáo sự cố thất bại");
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Handle building selection change
    const handleBuildingChange = (e) => {
        const buildingId = e.target.value;
        formik.setFieldValue("building_id", buildingId);
        formik.setFieldValue("classroom_id", ""); // Reset classroom selection

        // Filter classrooms based on selected building
        const selectedBuilding = buildingData.find(
            (b) => b.building_id.toString() === buildingId
        );
        setFilteredClassrooms(
            selectedBuilding ? selectedBuilding.classrooms : []
        );
    };

    return (
        <div className="w-[50%] mx-auto p-8 mt-20 mb-36 bg-white rounded shadow-xl">
            <h1 className="text-center text-2xl font-semibold">
                Thêm báo cáo sự cố
            </h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="text-red-500 text-lg">{error}</div>

                {/* Building Select */}
                <div className="mb-6">
                    <label
                        htmlFor="building_id"
                        className="block text-gray-800 font-bold"
                    >
                        Tên tòa nhà
                    </label>
                    <select
                        id="building_id"
                        name="building_id"
                        value={formik.values.building_id}
                        onChange={handleBuildingChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2"
                    >
                        <option value="">--Chọn tòa nhà--</option>
                        {buildingData.map((building) => (
                            <option
                                key={building.building_id}
                                value={building.building_id}
                            >
                                {building.building_name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.building_id &&
                        formik.errors.building_id && (
                            <div className="text-red-500">
                                {formik.errors.building_id}
                            </div>
                        )}
                </div>

                {/* Classroom Select */}
                <div className="mb-6">
                    <label
                        htmlFor="classroom_id"
                        className="block text-gray-800 font-bold"
                    >
                        Tên phòng học
                    </label>
                    <select
                        id="classroom_id"
                        name="classroom_id"
                        value={formik.values.classroom_id}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 p-2 rounded mt-2"
                        disabled={!formik.values.building_id}
                    >
                        <option value="">--Chọn phòng học--</option>
                        {filteredClassrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}
                    </select>
                    {formik.touched.classroom_id &&
                        formik.errors.classroom_id && (
                            <div className="text-red-500">
                                {formik.errors.classroom_id}
                            </div>
                        )}
                </div>

                {/* Description Textarea */}
                <div className="mb-6">
                    <label
                        htmlFor="description"
                        className="block text-gray-800 font-bold"
                    >
                        Mô tả sự cố
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        rows="4"
                        className="w-full border border-gray-300 p-2 rounded mt-2 resize-none"
                        placeholder="Nhập mô tả chi tiết về sự cố..."
                    />
                    {formik.touched.description &&
                        formik.errors.description && (
                            <div className="text-red-500">
                                {formik.errors.description}
                            </div>
                        )}
                </div>

                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-center rounded"
                >
                    {formik.isSubmitting ? "Đang lưu..." : "Lưu"}
                </button>
            </form>
        </div>
    );
}

export default Add;
