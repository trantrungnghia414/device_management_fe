import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
function Edit() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    quantity: 1,
  });

  useEffect(() => {
    fetchData();
  }, [id]);
  async function fetchData() {
    try {
      const response = await axios.get(`/api/equipments/${id}`);
      setInitialValues({
        name: response.data.equipment_name,
        description: response.data.description,
        quantity: response.data.quantity || 1,
      });
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên thiết bị."),
      quantity: Yup.number()
        .required("Vui lòng nhập số lượng")
        .min(1, "Số lượng phải lớn hơn 0"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.put(`/api/equipments/${id}`, values);

        window.location.href = "/admin/equipments";
      } catch (error) {
        if (error.response && error.response.status === 422) {
          setErrors({ name: error.response.data.message });
        } else {
          setErrors({ name: "Có lỗi xảy ra, vui lòng thử lại sau" });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className=" w-[50%] mx-auto p-8 mt-20 bg-white rounded shadow-xl">
      <h1 className="text-center text-2xl font-semibold">Sửa thiết bị</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="text-red-500 text-lg ">{error}</div>
        <div className="mb-6">
          <label htmlFor="id" className="block text-gray-800 font-bold">
            Id:
          </label>
          <input
            type="text"
            value={id}
            readOnly
            name="id"
            className="bg-slate-100 w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
          />
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="name" className="block text-gray-800 font-bold">
              Tên thiết bị:
            </label>
            <input
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="w-1/3">
            <label htmlFor="quantity" className="block text-gray-800 font-bold">
              Số lượng:
            </label>
            <div className="flex items-center mt-2">
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
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-red-500 text-sm">
                {formik.errors.quantity}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-800 font-bold"
          >
            Mô tả:
          </label>
          <input
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-center rounded"
        >
          Sửa
        </button>
      </form>
    </div>
  );
}

export default Edit;
