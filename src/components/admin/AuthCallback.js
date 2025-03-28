import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { useAuth } from "../../components/admin/AuthContext";
function AuthCallback() {
    const { login } = useAuth();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { handleAuthCallback } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = searchParams.get("token");
            const error = searchParams.get("error");
            console.log(token);

            if (error) {
                navigate("/login?error=google_auth_failed");
                return;
            }

            if (token) {
                try {
                    const response = await axios.get("/api/user", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    console.log(response.data);
                    const email = response.data.email;
                    const role_name = response.data.role.name;
                    const avatar = response.data.avatar;

                    // const { email, role_name, avatar } = response.data; // Bỏ dòng này vì đã khai báo ở trên

                    // Kiểm tra role_name trước khi sử dụng
                    if (role_name && role_name.toUpperCase() === "ADMIN") {
                        navigate("/admin/statistical/crash-report");
                    } else {
                        navigate("/home");
                    }

                    login(token, email, role_name, avatar);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    navigate("/login?error=user_fetch_failed");
                }
            } else {
                navigate("/");
            }
        };

        fetchUserData();
    }, [searchParams, navigate, handleAuthCallback]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4">Đang xử lý đăng nhập...</p>
            </div>
        </div>
    );
}

export default AuthCallback;
