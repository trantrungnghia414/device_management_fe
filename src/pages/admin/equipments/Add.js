import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

function Add() {
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      quantity: 1, // Add initial quantity
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên thiết bị."),
      description: Yup.string().required("Vui lòng nhập mô tả."),
      quantity: Yup.number()
        .required("Vui lòng nhập số lượng")
        .min(1, "Số lượng phải lớn hơn 0"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post("/api/equipments", {
          name: values.name,
          description: values.description,
          quantity: values.quantity,
        });
        window.location.href = "/admin/equipments";
      } catch (error) {
        setError("Thêm thiết bị thất bại");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-[50%] mx-auto p-8 mt-20 bg-white rounded shadow-xl">
      <h1 className="text-center text-2xl font-semibold">Thêm thiết bị</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="text-red-500 text-lg">{error}</div>

        {/* Name and Quantity in one row */}
        <div className="flex gap-4 mb-4">
          {/* Name field */}
          <div className="flex-1">
            <label htmlFor="name" className="block text-gray-800 font-bold p-4">
              Tên thiết bị:
            </label>
            <input
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
              placeholder="Nhập tên thiết bị"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          {/* Quantity field */}
          <div className="w-1/3">
            <label
              htmlFor="quantity"
              className="block text-gray-800 font-bold p-4"
            >
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

        {/* Description field */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-800 font-bold p-4"
          >
            Mô tả:
          </label>
          <input
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
            placeholder="Nhập mô tả"
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
          Thêm
        </button>
      </form>
    </div>
  );
}

export default Add;
