import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// Add loading spinner component
const LoadingSpinner = ({ text }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    {text && <span className="mt-2 text-gray-600">{text}</span>}
  </div>
);

function IncidentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const name = localStorage.getItem("classroomName");
  const email = localStorage.getItem("email");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!description.trim()) {
      setError("Vui lòng nhập mô tả sự cố");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/incident-form", {
        classroom_id: id,
        email: email,
        description: description.trim(),
      });

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Báo cáo sự cố đã được gửi thành công",
          confirmButtonColor: "#233d7e",
        });
        navigate(`/incident-list/${id}`);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setError("Có lỗi xảy ra khi gửi báo cáo!");
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 container mx-auto py-6 px-2 md:px-80">
      <div className="container mx-auto p-6">
        {/* <!-- Form Section --> */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <LoadingSpinner text="Đang xử lý..." />
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-center mb-6">
                BÁO CÁO SỰ CỐ PHÒNG {name}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* <!-- Full Width Fields --> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tình hình thiết bị
                  </label>
                  <textarea
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                    rows="3"
                    placeholder="Mô tả tình hình thiết bị..."
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      if (error) setError("");
                    }}
                  ></textarea>
                  {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                  )}
                </div>

                {/* <!-- Buttons --> */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-[#233d7e] text-white rounded-lg hover:bg-blue-700 md:min-w-[100px]"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default IncidentForm;
