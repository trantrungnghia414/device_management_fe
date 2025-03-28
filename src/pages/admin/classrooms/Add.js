import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
function Add() {
  const [error, setError] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  // Thêm state để quản lý danh sách input phòng học
  const [roomInputs, setRoomInputs] = useState([{ id: 0, value: "" }]);

  // Hàm thêm input mới
  const addRoomInput = () => {
    const newId = roomInputs.length;
    setRoomInputs([...roomInputs, { id: newId, value: "" }]);
  };

  // Hàm xóa input
  const removeRoomInput = (id) => {
    setRoomInputs(roomInputs.filter((input) => input.id !== id));
  };

  // Hàm cập nhật giá trị input
  const handleRoomInputChange = (id, value) => {
    setRoomInputs(
      roomInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const [buildings, roomTypes] = await Promise.all([
          axios.get("/api/buildings"),
          axios.get("/api/room_types"),
        ]);

        setBuildings(buildings.data);
        setRoomTypes(roomTypes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      building_name: "",
      room_type_name: "",
    },

    validationSchema: Yup.object({
      building_name: Yup.string().required("Vui lòng chọn tòa nhà."),
      room_type_name: Yup.string().required("Vui lòng chọn loại phòng."),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Kiểm tra xem có phòng nào được nhập chưa
        if (roomInputs.some((input) => !input.value.trim())) {
          setError("Vui lòng nhập tên cho tất cả các phòng");
          return;
        }

        // Tạo object chứa thông tin tòa nhà, loại phòng và danh sách phòng học
        const payload = {
          building_id: values.building_name,
          room_type_id: values.room_type_name,
          rooms: roomInputs.map((input) => input.value),
        };

        console.log("Sending data:", payload);

        // Gửi một request duy nhất chứa tất cả thông tin
        const response = await axios.post("/api/classrooms", payload);
        console.log("Server response:", response.data);

        window.location.href = "/admin/classrooms";
      } catch (error) {
        console.error("Error:", error);
        setError("Thêm phòng học thất bại");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className=" w-[50%] mx-auto p-8 mt-20 mb-36 bg-white rounded shadow-xl ">
      <h1 className="text-center text-2xl font-semibold">Thêm phòng</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="text-red-500 text-lg">{error}</div>
        <div className="mb-6">
          <label
            htmlFor="building_name"
            className="block text-gray-800 font-bold"
          >
            Tên tòa nhà
          </label>
          <select
            name="building_name"
            value={formik.values.building_name}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            <option value="">--Chọn tòa nhà--</option>
            {buildings.map((item) => (
              <option key={item.id} value={item.id}>
                {item.building_name}
              </option>
            ))}
          </select>
          {formik.touched.building_name && formik.errors.building_name && (
            <div className="text-red-500">{formik.errors.building_name}</div>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="room_type_name"
            className="block text-gray-800 font-bold"
          >
            Loại phòng
          </label>
          <select
            name="room_type_name"
            value={formik.values.room_type_name}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-2"
          >
            <option value="">--Chọn tòa nhà--</option>
            {roomTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.room_type_name}
              </option>
            ))}
          </select>
          {formik.touched.room_type_name && formik.errors.room_type_name && (
            <div className="text-red-500">{formik.errors.room_type_name}</div>
          )}
        </div>

        <div className="space-y-4">
          {roomInputs.map((input, index) => (
            <div key={input.id} className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-gray-800 font-bold">
                  Tên phòng học {index + 1}:
                </label>
                <input
                  type="text"
                  value={input.value}
                  onChange={(e) =>
                    handleRoomInputChange(input.id, e.target.value)
                  }
                  placeholder="VD: A1.101"
                  className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeRoomInput(input.id)}
                  className="mt-8 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRoomInput}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Thêm phòng học
        </button>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-center rounded"
        >
          Lưu tất cả
        </button>
      </form>
    </div>
  );
}

export default Add;
