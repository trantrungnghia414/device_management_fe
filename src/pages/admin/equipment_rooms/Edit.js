import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

function Edit() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState([]);
  const [initialValues, setInitialValues] = useState({
    classroom_id: id,
    device_id: "",
    quantity: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equipmentResponse, deviceResponse] = await Promise.all([
          axios.get("/api/equipments"),
          axios.get(`/api/equipment_classrooms/${id}`),
        ]);
        console.log("thiết bị", equipmentResponse.data);
        console.log("phòng học", deviceResponse.data);

        setEquipments(equipmentResponse.data);
        setInitialValues({
          classroom_id: parseInt(deviceResponse.data.classroom_id),
          device_id: deviceResponse.data.equipment.id,
          quantity: deviceResponse.data.quantity,
        });
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

    validationSchema: Yup.object({
      device_id: Yup.string().required("Vui lòng chọn thiết bị"),
      quantity: Yup.number()
        .required("Vui lòng nhập số lượng")
        .min(1, "Số lượng phải lớn hơn 0"),
    }),

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = {
          device_id: values.device_id,
          classroom_id: parseInt(values.classroom_id),
          quantity: values.quantity,
        };
        console.log("data", data);
        await axios.put(`/api/equipment_classrooms/${id}`, data);
        window.location.href = `/admin/classrooms-equipment/${values.classroom_id}`;
      } catch (error) {
        setError("Cập nhật thiết bị thất bại");
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-[50%] mx-auto p-8 mt-20 bg-white rounded shadow-xl">
      <h1 className="text-center text-2xl font-semibold">Sửa thiết bị</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="text-red-500 text-lg">{error}</div>

        {/* Container for equipment select and quantity input */}
        <div className="flex gap-4 mb-6">
          {/* Equipment Select */}
          <div className="flex-1">
            <label
              htmlFor="device_id"
              className="block text-gray-800 font-bold mb-2"
            >
              Tên thiết bị:
            </label>
            <select
              name="device_id"
              value={formik.values.device_id}
              onChange={formik.handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">--Chọn thiết bị--</option>
              {equipments.map((equipment) => (
                <option key={equipment.id} value={equipment.id}>
                  {equipment.equipment_name}
                </option>
              ))}
            </select>
            {formik.touched.device_id && formik.errors.device_id && (
              <div className="text-red-500">{formik.errors.device_id}</div>
            )}
          </div>

          {/* Quantity Input */}
          <div className="w-1/4">
            <label
              htmlFor="quantity"
              className="block text-gray-800 font-bold mb-2"
            >
              Số lượng:
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue(
                    "quantity",
                    Math.max(1, +formik.values.quantity - 1)
                  )
                }
                className="px-3 py-2 border border-gray-300 rounded-l"
              >
                -
              </button>
              <input
                type="number"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                min="1"
                className="w-full border-t border-b border-gray-300 py-2 px-3 text-center"
              />
              <button
                type="button"
                onClick={() =>
                  formik.setFieldValue("quantity", +formik.values.quantity + 1)
                }
                className="px-3 py-2 border border-gray-300 rounded-r"
              >
                +
              </button>
            </div>
            {formik.touched.quantity && formik.errors.quantity && (
              <div className="text-red-500">{formik.errors.quantity}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="cursor-pointer py-2 px-4 block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-center rounded"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default Edit;
