import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
function Add() {
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên tòa nhà."),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post("/api/repair_teams", {
          name: values.name,
        });
        window.location.href = "/admin/repair-teams";
      } catch (error) {
        setError("Thêm tòa nhà thất bại");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className=" w-[50%] mx-auto p-8 mt-20 bg-white rounded shadow-xl ">
      <h1 className="text-center text-2xl font-semibold">Thêm ban sửa chữa</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="text-red-500 text-lg">{error}</div>
        <div className="mb-6">
          <label for="name" className="block text-gray-800 font-bold p-4">
            Tên ban sửa chữa:
          </label>
          <input
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            placeholder="Nhập tên ban sửa chữa"
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
          Thêm
        </button>
      </form>
    </div>
  );
}

export default Add;
