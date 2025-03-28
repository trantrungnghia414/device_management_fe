import axios from "../../../config/axios";
import { ErrorMessage, useFormik } from "formik";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

function Edit() {
    const { id } = useParams();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [roles, setRoles] = useState([]);
    const [initialValues, setInitialValues] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role_id: "",
        address: "",
        gender: "",
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, rolesResponse] = await Promise.all([
                    axios.get(`/api/users/${id}`),
                    axios.get("/api/roles"),
                ]);
                //console.log("user", userResponse.data);
                setRoles(rolesResponse.data);
                setInitialValues({
                    name: userResponse.data.name,
                    username: userResponse.data.username,
                    email: userResponse.data.email,
                    phone: userResponse.data.phone,
                    role_id: parseInt(userResponse.data.role_id),
                    address: userResponse.data.address,
                    gender: userResponse.data.gender,
                    current_password: userResponse.data.password,
                    password: "",
                    password_confirmation: "",
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
            name: Yup.string().required("Vui lòng nhập tên người dùng"),
            username: Yup.string().required("Vui lòng nhập tên đăng nhập"),
            email: Yup.string()
                .email("Email không hợp lệ")
                .required("Vui lòng nhập email"),
            phone: Yup.string()
                .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
                .min(10, "Số điện thoại phải có ít nhất 10 số")
                .required("Vui lòng nhập số điện thoại"),
            role_id: Yup.string().required("Vui lòng chọn quyền"),
            address: Yup.string().required("Vui lòng nhập địa chỉ"),
            gender: Yup.string().required("Vui lòng chọn giới tính"),
            current_password: Yup.string().when("password", {
                is: (value) => value?.length > 0,
                then: () =>
                    Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
            }),
            password: Yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
            password_confirmation: Yup.string().oneOf(
                [Yup.ref("password"), null],
                "Mật khẩu xác nhận không khớp"
            ),
        }),

        onSubmit: async (values, { setSubmitting }) => {
            try {
                const data = {
                    name: values.name,
                    username: values.username,
                    email: values.email,
                    gender: values.gender,
                    phone: values.phone,
                    password: values.password,
                    role_id: parseInt(values.role_id),
                    address: values.address,
                };
                console.log("Form data:", data);
                const response = await axios.put(`/api/users/${id}`, data);
                console.log("Update user response:", response.data);

                window.location.href = "/admin/users";
            } catch (error) {
                setError("Cập nhật người dùng thất bại");
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="w-[50%] mx-auto p-8 mt-20 bg-white rounded shadow-xl">
            <h1 className="text-center text-2xl font-semibold">
                Sửa người dùng
            </h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="text-red-500 text-lg">{error}</div>

                {/* ID field - read only */}
                <div className="mb-4">
                    <label
                        htmlFor="id"
                        className="block text-gray-800 font-bold mb-2"
                    >
                        ID:
                    </label>
                    <input
                        type="text"
                        value={id}
                        readOnly
                        className="bg-gray-100 w-full border border-gray-300 py-2 px-3 rounded"
                    />
                </div>

                {/* Name field */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-800 font-bold mb-2"
                    >
                        Tên người dùng:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.name}
                        </div>
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
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          )}
        </div> */}

                {/* Email field */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-800 font-bold mb-2"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.email}
                        </div>
                    )}
                </div>

                {/* Phone field */}
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block text-gray-800 font-bold mb-2"
                    >
                        Số điện thoại:
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.phone}
                        </div>
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
                    />
                    {formik.touched.address && formik.errors.address && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.address}
                        </div>
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
                            <label
                                htmlFor="male"
                                className="ml-2 text-gray-700"
                            >
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
                            <label
                                htmlFor="female"
                                className="ml-2 text-gray-700"
                            >
                                Nữ
                            </label>
                        </div>
                    </div>
                    {formik.touched.gender && formik.errors.gender && (
                        <div className="text-red-500 text-sm">
                            {formik.errors.gender}
                        </div>
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
                        <div className="text-red-500 text-sm">
                            {formik.errors.role_id}
                        </div>
                    )}
                </div>

                {/* Password section */}
                <div className="mb-10">
                    {/* Current password field - showing existing password */}
                    <div className="relative">
                        <label
                            htmlFor="current_password"
                            className="block text-gray-800 font-bold mb-2"
                        >
                            Mật khẩu:
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="current_password"
                                name="current_password"
                                value={formik.values.current_password}
                                readOnly
                                className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600 pr-10 bg-gray-50"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                setShowPasswordFields(!showPasswordFields)
                            }
                            className="absolute right-0 bottom-0 transform translate-y-[calc(100%+4px)] px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                            {showPasswordFields
                                ? "Hủy đổi mật khẩu"
                                : "Thay đổi mật khẩu"}
                        </button>
                    </div>

                    {/* Change password fields */}
                    {showPasswordFields && (
                        <div className="mt-6">
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-gray-800 font-bold mb-2"
                                >
                                    Mật khẩu mới:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
                                    placeholder="Nhập mật khẩu mới"
                                />
                                {formik.touched.password &&
                                    formik.errors.password && (
                                        <div className="text-red-500 text-sm">
                                            {formik.errors.password}
                                        </div>
                                    )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-gray-800 font-bold mb-2"
                                >
                                    Xác nhận mật khẩu mới:
                                </label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formik.values.password_confirmation}
                                    onChange={formik.handleChange}
                                    className="w-full border border-gray-300 py-2 px-3 rounded focus:outline-none focus:ring-indigo-600"
                                    placeholder="Nhập lại mật khẩu mới"
                                />
                                {formik.touched.password_confirmation &&
                                    formik.errors.password_confirmation && (
                                        <div className="text-red-500 text-sm">
                                            {
                                                formik.errors
                                                    .password_confirmation
                                            }
                                        </div>
                                    )}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full cursor-pointer py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-center rounded"
                >
                    {formik.isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
                </button>
            </form>
        </div>
    );
}

export default Edit;
