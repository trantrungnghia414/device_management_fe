import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";

function Add() {
  const [error, setError] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError("Không thể tải danh sách quyền");
      }
    };
    fetchRoles();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
     // username: "",
      email: "",
      phone: "",
      role_id: "",
      password: "",
      password_confirmation: "",
      address: "",
      gender: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên người dùng"),
     // username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .required("Vui lòng nhập số điện thoại"),
      role_id: Yup.string().required("Vui lòng chọn quyền"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Vui lòng nhập mật khẩu"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
        .required("Vui lòng xác nhận mật khẩu"),
      address: Yup.string().required("Vui lòng nhập địa chỉ"),
      gender: Yup.string().required("Vui lòng chọn giới tính"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post("/api/users", values);
        console.log("values", values);
        window.location.href = "/admin/users";
      } catch (error) {
        setError("Thêm người dùng thất bại");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-[50%] mx-auto p-8 mt-20 bg-white rounded shadow-xl">
      <h1 className="text-center text-2xl font-semibold">Thêm người dùng</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="text-red-500 text-lg">{error}</div>

        {/* Name field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
            Tên người dùng:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
            placeholder="Nhập tên người dùng"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        {/* Username field */}
        {/* <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-800 font-bold mb-2"
          >
            Tên đăng nhập:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
            placeholder="Nhập tên đăng nhập"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div> */}

        {/* Email field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-800 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
            placeholder="Nhập email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>

        {/* Phone field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-800 font-bold mb-2">
            Số điện thoại:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
            placeholder="Nhập số điện thoại"
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
          )}
        </div>

        {/* Address field */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-800 font-bold mb-2"
          >
            Địa chỉ:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
            placeholder="Nhập địa chỉ"
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-sm">{formik.errors.address}</div>
          )}
        </div>

        {/* Gender field */}
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-2">
            Giới tính:
          </label>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={formik.handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="male" className="ml-2 text-gray-700">
                Nam
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={formik.handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="female" className="ml-2 text-gray-700">
                Nữ
              </label>
            </div>
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-sm">{formik.errors.gender}</div>
          )}
        </div>

        {/* Role select */}
        <div className="mb-4">
          <label
            htmlFor="role_id"
            className="block text-gray-800 font-bold mb-2"
          >
            Quyền:
          </label>
          <select
            id="role_id"
            name="role_id"
            value={formik.values.role_id}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
          >
            <option value="">--Chọn quyền--</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          {formik.touched.role_id && formik.errors.role_id && (
            <div className="text-red-500 text-sm">{formik.errors.role_id}</div>
          )}
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-800 font-bold mb-2"
          >
            Mật khẩu:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
            placeholder="Nhập mật khẩu"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}
        </div>

        {/* Password confirmation field */}
        <div className="mb-6">
          <label
            htmlFor="password_confirmation"
            className="block text-gray-800 font-bold mb-2"
          >
            Xác nhận mật khẩu:
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
            placeholder="Xác nhận mật khẩu"
          />
          {formik.touched.password_confirmation &&
            formik.errors.password_confirmation && (
              <div className="text-red-500 text-sm">
                {formik.errors.password_confirmation}
              </div>
            )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full cursor-pointer py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-center rounded"
        >
          {formik.isSubmitting ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
}

export default Add;
