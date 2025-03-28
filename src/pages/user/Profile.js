import { useState, useEffect } from "react";
import Image from "../../images/image-profile.jpeg";
import axios from "../../config/axios";

function Profile() {
    const [previewImage, setPreviewImage] = useState(Image);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [userData, setUserData] = useState(0);
    const [error, setError] = useState(null);
    const email = localStorage.getItem("email");
    useEffect(() => {
        fetchData();
    }, []);

    // Update fetchData function to handle avatar URL
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/user-profile", {
                params: { email: email },
            });
            setUserData(response.data);
            console.log(" Trả về", response.data);
            // Set avatar - use default if no avatar exists
            setPreviewImage(
                response.data.avatar
                    ? `${process.env.REACT_APP_API_URL}/storage/${response.data.avatar}`
                    : Image
            );
        } catch (error) {
            setError("Error fetching data");
            console.error("Error fetching data:", error);
        }
    };

    // Add password states
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [passwordError, setPasswordError] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle password changes
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when typing
        if (passwordError) setPasswordError("");

        // Check passwords match when typing confirmation
        if (name === "confirmPassword" && value !== passwords.newPassword) {
            setPasswordError("Mật khẩu xác nhận không khớp");
        }
    };

    // Add validation before form submit
    // Update handleSubmit function for file upload
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Password validation
        if (showPasswordFields) {
            if (!passwords.currentPassword) {
                setPasswordError("Vui lòng nhập mật khẩu hiện tại");
                return;
            }
            if (passwords.newPassword.length < 6) {
                setPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự");
                return;
            }
            if (passwords.newPassword !== passwords.confirmPassword) {
                setPasswordError("Mật khẩu xác nhận không khớp");
                return;
            }
        }

        try {
            const formData = new FormData();
            formData.append("name", userData.name);
            formData.append("phone", userData.phone);
            formData.append("email", userData.email);
            formData.append("role_id", userData.role_id);

            // Add avatar if file is selected
            const fileInput = document.getElementById("avatar-upload");
            if (fileInput.files[0]) {
                formData.append("avatar", fileInput.files[0]);
            }

            // Add password fields if enabled
            if (showPasswordFields) {
                formData.append("current_password", passwords.currentPassword);
                formData.append("password", passwords.newPassword);
            }

            console.log("User Name:", formData.get("name"));
            console.log("Phone:", formData.get("phone"));
            console.log("Email:", formData.get("email"));
            console.log("Role ID:", formData.get("role_id"));
            console.log("Avatar:", formData.get("avatar"));
            console.log("Current Password:", formData.get("current_password"));
            console.log("New Password:", formData.get("password"));

            const response = await axios.post(
                "/api/user-update-profile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    params: {
                        _method: "PUT",
                    },
                }
            );

            if (response.status === 200) {
                // Fetch updated user data to ensure we have the correct structure
                await fetchData();

                // Reset password fields if they were used
                if (showPasswordFields) {
                    setPasswords({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                    });
                    setShowPasswordFields(false);
                }

                alert("Cập nhật thông tin thành công!");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            const errorMessage =
                error.response?.data?.message || "Cập nhật thông tin thất bại";
            setError(errorMessage);
            alert(errorMessage);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        // <!-- main -->
        <main className="py-8 px-2 flex flex-col flex-1 w-full">
            <div className="md:max-w-3xl max-md:w-full mx-auto bg-white rounded-lg shadow-md p-6 max-md:p-0">
                {/* <!-- Header --> */}
                <div className="text-center mb-8">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Hồ Sơ Người Dùng
                    </h1>
                    <p className="text-gray-600">
                        Quản lý thông tin cá nhân của bạn
                    </p>
                </div>

                {/* <!-- Profile Form --> */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* <!-- Avatar Section --> */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group">
                            <img
                                id="avatar-preview"
                                src={previewImage}
                                alt="Profile picture"
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <label
                                    htmlFor="avatar-upload"
                                    className="cursor-pointer"
                                >
                                    <div className="text-white flex flex-col items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-8 h-8"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                                            />
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                                            />
                                        </svg>
                                        <span className="text-sm mt-1">
                                            Thay đổi
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <div className="text-center">
                            <h3 className="text-xl font-medium text-gray-900">
                                {userData.name || "Loading..."}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {userData.email || "Loading..."}
                            </p>
                        </div>
                    </div>

                    {/* <!-- Basic Info Section --> */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            Thông tin cơ bản
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#233d7e]"
                                    value={userData.name || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                                    value={userData.email || ""}
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#233d7e]"
                                    value={userData.phone || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Chức vụ
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                                    value={(() => {
                                        if (!userData?.role?.name) return "";
                                        switch (userData.role.name) {
                                            case "admin":
                                                return "Quản trị";
                                            case "staff":
                                                return "Nhân viên";
                                            case "user":
                                                return "Giáo viên";
                                            default:
                                                return "";
                                        }
                                    })()}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* <!-- Password Change Section --> */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">
                                Đổi mật khẩu
                            </h2>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={showPasswordFields}
                                    onChange={(e) =>
                                        setShowPasswordFields(e.target.checked)
                                    }
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#233d7e]"></div>
                            </label>
                        </div>

                        <div
                            className={`space-y-4 ${
                                showPasswordFields ? "" : "hidden"
                            }`}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwords.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#233d7e]"
                                    placeholder="Nhập mật khẩu hiện tại"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwords.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#233d7e]"
                                    placeholder="Nhập mật khẩu mới"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Xác nhận mật khẩu mới
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwords.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#233d7e]"
                                    placeholder="Nhập lại mật khẩu mới"
                                />
                            </div>
                            {passwordError && (
                                <div className="text-red-500 text-sm mt-2">
                                    {passwordError}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <!-- Submit Button --> */}
                    <div className="flex justify-between md:px-6 px-6 pb-6 md:p-0">
                        <button
                            href="./hoSo.html"
                            className="md:px-6 py-2 text-gray-800 border rounded-lg hover:bg-gray-200 transition duration-300 text-center min-w-[120px] md:min-w-[150px]"
                        >
                            Huỷ
                        </button>
                        <button
                            type="submit"
                            className="md:px-6 py-2 bg-[#233d7e] text-white rounded-lg hover:bg-blue-800 transition duration-300 text-center cursor-pointer min-w-[120px] md:min-w-[150px]"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Profile;
