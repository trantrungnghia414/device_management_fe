import { Link } from "react-router-dom";
import "../../style.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import slide1 from "../../images/sukienthayDu2.png";
import slide2 from "../../images/2.png";
import slide3 from "../../images/3.png";
import slide4 from "../../images/4.png";
import slide5 from "../../images/5.png";
import slide6 from "../../images/thsp.jpg";
import config from "../../config";

function Home() {
  return (
    <div>
      {/* Slide */}
      

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        {/* <!-- Hero Section --> */}
        <div className="bg-gradient-to-r from-blue-600 to-[#233d7e] rounded-lg shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-white mb-8 md:mb-0">
              <h1 className="text-3xl font-bold mb-4">
                Hệ Thống Quản Lý Thiết Bị
              </h1>
              <p className="text-lg mb-6">
                Trường Thực Hành Sư Phạm - Đại học Trà Vinh
              </p>
              <div className="flex gap-4">
                <Link
                  to={config.routes.deviceLog}
                  className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Nhật ký phòng máy
                </Link>
                <Link
                  to={config.routes.contact}
                  className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
                >
                  Liên hệ
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={slide6}
                alt="Quản lý thiết bị"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* <!-- Features Section --> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-[#233d7e] mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12"
              >
                <path d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z" />
                <path
                  fill-rule="evenodd"
                  d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z"
                  clip-rule="evenodd"
                />
                <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quản Lý Thiết Bị</h3>
            <p className="text-gray-600">
              Theo dõi và quản lý tất cả thiết bị trong phòng máy một cách hiệu
              quả
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-[#233d7e] mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Nhật Ký Sử Dụng</h3>
            <p className="text-gray-600">
              Ghi chép và theo dõi lịch sử sử dụng thiết bị trong phòng máy
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <div className="text-[#233d7e] mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474L16.79 17.25H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.04 16.5.5-1.5h6.42l.5 1.5H8.29Zm7.46-12a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Zm-3 2.25a.75.75 0 0 0-1.5 0v3.75a.75.75 0 0 0 1.5 0V9Zm-3 2.25a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Báo Cáo Thống Kê</h3>
            <p className="text-gray-600">
              Tạo báo cáo và thống kê về tình trạng thiết bị trong phòng máy
            </p>
          </div>
        </div> */}

        {/* <!-- Quick Access Section --> */}
        {/* <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Truy Cập Nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="#"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300 flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-[#233d7e]"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <span>Trang Chủ</span>
            </Link>
            <Link
              href="./nhatKyPhongMay.html"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300 flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-[#233d7e]"
              >
                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
              </svg>
              <span>Nhật Ký</span>
            </Link>
            <Link
              href="#"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300 flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-[#233d7e]"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Thống Kê</span>
            </Link>
            <Link
              href="./lienHe.html"
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-300 flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-[#233d7e]"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 2.583-.509 6.722 6.722 0 0 0 2.584.509 6.704 6.704 0 0 0 1.196-.106 6.737 6.737 0 0 0 1.196.106c.88 0 1.75-.167 2.584-.509a6.721 6.721 0 0 0 2.583.509c.711 0 1.401-.134 2.034-.391a1.657 1.657 0 0 0 .91-1.456c0-.563-.283-1.09-.758-1.397a.75.75 0 0 1-.372-.648c0-.182.023-.358.064-.521C20 16.232 20 15.01 20 13.75c0-2.627-2.239-4.752-5-4.752-2.76 0-5 2.125-5 4.752 0 1.26 0 2.482.596 3.588.041.163.064.34.064.521 0 .248-.134.482-.372.648-.474.307-.758.834-.758 1.397 0 .645.382 1.233.91 1.456a6.71 6.71 0 0 0 1.197.106c.283 0 .563-.024.836-.072ZM2.707 14.93a.75.75 0 0 1 .079-1.058 4.037 4.037 0 0 1 1.952-.836c-.327-.567-.557-1.201-.557-1.786 0-1.575 1.043-3.012 2.819-3.012.171 0 .305.147.305.318 0 .171-.134.318-.305.318-.305.318-1.354 0-2.209 1.116-2.209 2.376 0 1.108.846 1.655 1.739 1.655.171 0 .305.147.305.318 0 .171-.134.318-.305.318-.326 0-.658-.064-.945-.172a.353.353 0 0 0-.396.098c-.131.148-.312.233-.222 0-.449-.107-.578-.295Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Liên Hệ</span>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
