import axios from "../../../config/axios";
import { ErrorMessage, useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useParams, useSearchParams } from "react-router-dom";
function Add() {
    const [error, setError] = useState("");
    const { id } = useParams();
    const [equipmentInputs, setEquipmentInputs] = useState([
        { id: 0, device_id: "", quantity: 1 },
    ]);
    const [equipments, setEquipments] = useState([]);

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const response = await axios.get("/api/equipments");
                setEquipments(response.data);
            } catch (error) {
                console.error("Error fetching equipments:", error);
                setError("Không thể tải danh sách thiết bị");
            }
        };
        fetchEquipments();
    }, []);
    // Add new equipment input
    const addEquipmentInput = () => {
        const newId = equipmentInputs.length;
        setEquipmentInputs([
            ...equipmentInputs,
            { id: newId, device_id: "", quantity: 1 },
        ]);
    };

    // Remove equipment input
    const removeEquipmentInput = (id) => {
        setEquipmentInputs(equipmentInputs.filter((input) => input.id !== id));
    };

    // Handle equipment input changes
    const handleInputChange = (id, field, value) => {
        setEquipmentInputs(
            equipmentInputs.map((input) =>
                input.id === id ? { ...input, [field]: value } : input
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate inputs
            if (equipmentInputs.some((input) => !input.device_id)) {
                setError("Vui lòng chọn thiết bị cho tất cả các dòng");
                return;
            }

            // Log data before submitting
            // console.log("Classroom ID:", id);
            // console.log("Equipment Inputs:", equipmentInputs);

            // Log each request payload
            equipmentInputs.forEach((input, index) => {
                console.log(`Request ${index + 1}:`, {
                    classroom_id: id,
                    device_id: input.device_id,
                    quantity: input.quantity,
                });
            });

            // Submit all equipment
            await Promise.all(
                equipmentInputs.map((input) =>
                    axios.post("/api/equipment_classrooms", {
                        classroom_id: id,
                        device_id: input.device_id,
                        quantity: input.quantity,
                    })
                )
            );

            window.location.href = `/admin/classrooms-equipment/${id}`;
        } catch (error) {
            setError("Thêm thiết bị thất bại");
        }
    };

    return (
        <div className="w-[50%] mx-auto p-8 mt-20 bg-white rounded shadow-xl">
            <h1 className="text-center text-2xl font-semibold mb-6">
                Thêm thiết bị vào phòng
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="text-red-500 text-lg">{error}</div>

                {equipmentInputs.map((input, index) => (
                    <div key={input.id} className="flex gap-4 mb-6">
                        {/* Equipment select */}
                        <div className="flex-1">
                            <label className="block text-gray-800 font-bold mb-2">
                                Tên thiết bị {index + 1}:
                            </label>
                            <select
                                value={input.device_id}
                                onChange={(e) =>
                                    handleInputChange(
                                        input.id,
                                        "device_id",
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 p-2 rounded"
                            >
                                <option value="">--Chọn thiết bị--</option>
                                {equipments.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.equipment_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity input */}
                        <div className="w-1/4">
                            <label className="block text-gray-800 font-bold mb-2">
                                Số lượng:
                            </label>
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleInputChange(
                                            input.id,
                                            "quantity",
                                            Math.max(1, +input.quantity - 1)
                                        )
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded-l"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={input.quantity}
                                    onChange={(e) =>
                                        handleInputChange(
                                            input.id,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                    min="1"
                                    className="w-full border-t border-b border-gray-300 py-2 px-3 text-center"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleInputChange(
                                            input.id,
                                            "quantity",
                                            +input.quantity + 1
                                        )
                                    }
                                    className="px-3 py-2 border border-gray-300 rounded-r"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Remove button */}
                        {index > 0 && (
                            <button
                                type="button"
                                onClick={() => removeEquipmentInput(input.id)}
                                className="self-end mb-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Xóa
                            </button>
                        )}
                    </div>
                ))}

                {/* Add new equipment button */}
                <button
                    type="button"
                    onClick={addEquipmentInput}
                    className="mb-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Thêm thiết bị
                </button>

                <button
                    type="submit"
                    className="w-full cursor-pointer py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-center rounded"
                >
                    Lưu tất cả
                </button>
            </form>
        </div>
    );
}

export default Add;
