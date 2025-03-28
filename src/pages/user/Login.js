import { Link } from "react-router-dom";
import config from "../../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/admin/AuthContext";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ.")
        .required("Vui lòng nhập email."),
      password: Yup.string().required("Vui lòng nhập mật khẩu."),
    }),
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post("/api/user/login", {
          email: values.email,
          password: values.password,
        });
        if (response.status === 200) {
          const token = response.data.token;
          const email = response.data.email;
          const role_name = response.data.role_name;
          // const roleName = response.data.role_name.toUpperCase();
          const avatar = response.data.avatar;

          login(token, email, role_name, avatar); // Gọi hàm login để lưu token và cập nhật trạng thái
          if (role_name === "admin") {
            navigate("/admin");
          } else {
            navigate("/home");
            console.log(response.data);
          }
        }
      } catch (error) {
        // Kiểm tra xem có thông báo lỗi từ server không
        if (error.response && error.response.status === 401) {
          setError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
        } else {
          setError("Đăng nhập thất bại. Vui lòng thử lại sau.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:8000/auth/google";
    // try {
    //   // Thay vì redirect trực tiếp, gọi API để lấy thông tin đăng nhập
    //   const response = await axios.get("http://localhost:8000/auth/google/callback", {
    //     withCredentials: true // Quan trọng để nhận cookies từ backend
    //   });

    //   if (response.status === 200) {
    //     const { token, email, role_name, avatar } = response.data;

    //     // Sử dụng cùng logic như đăng nhập thông thường
    //     login(token, email, role_name, avatar);

    //     if (role_name === "admin") {
    //       navigate("/admin");
    //     } else {
    //       navigate("/");
    //     }
    //   }
    // } catch (error) {
    //   // Nếu API yêu cầu redirect
    //   if (error.response?.data?.redirectUrl) {
    //     window.location.href = error.response.data.redirectUrl;
    //   } else {
    //     setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
    //     console.error("Lỗi đăng nhập Google:", error);
    //   }
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Đăng nhập
        </h2>

        {/* Add error message display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              for="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <div className="relative gap-2">
              <input
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full p-3 border rounded-lg text-lg focus:outline-none focus:ring-1 focus:ring-[#233d7e]"
                placeholder="Nhập email"
              />
              {formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
              {/* <span className="absolute right-3 top-3 text-gray-500 pointer-events-none">
                @gmail.com
              </span> */}
            </div>
          </div>
          <div className="mb-4">
            <label
              for="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mật khẩu:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#233d7e] leading-9"
              placeholder="Nhập mật khẩu"
            />
            {formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#233d7e] text-white py-2 rounded-lg hover:bg-blue-800 transition font-semibold"
          >
            Đăng nhập
          </button>
        </form>
        {/* <!-- Thêm đường phân cách --> */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Hoặc</span>
          </div>
        </div>

        {/* <!-- Nút đăng nhập Google --> */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Đăng nhập bằng Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
