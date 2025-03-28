import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
function Edit() {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({ name: "" });

  useEffect(() => {
    fetchData();
  }, [id]);
  async function fetchData() {
    try {
      const response = await axios.get(`/api/repair_teams/${id}`);
      setInitialValues({ name: response.data.name });
     
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
      name: Yup.string().required("Vui lòng nhập tên ban sửa chữa."),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.put(`/api/repair_teams/${id}`, values);
        window.location.href = "/admin/repair-teams";
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
      <h1 className="text-center text-2xl font-semibold">Sửa ban sửa chữa</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="text-red-500 text-lg ">{error}</div>
        <div className="mb-6">
          <label for="name" className="block text-gray-800 font-bold">
            Id:
          </label>
          <input
            type="text"
            value={id}
            readOnly
            name="name"
            className="bg-slate-100 w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
          />
        </div>
        <div className="mb-6">
          <label for="name" className="block text-gray-800 font-bold">
            Tên ban sửa chữa:
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
