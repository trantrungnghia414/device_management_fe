import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logothsp.jpg";
import config from "../../config";
import { useAuth } from "../admin/AuthContext";
import Swal from "sweetalert2";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFeatureOpen, setIsFeatureOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleFeature = () => {
    setIsFeatureOpen(!isFeatureOpen);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire({
          title: "Đã đăng xuất!",
          text: "Đăng xuất thành công",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const email = localStorage.getItem("email");
  const role_name = localStorage.getItem("role_name");
  return (
    <header>
      <nav className="px-2 sm:px-4 bg-[#233d7e] shadow">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <span className="self-center text-lg font-semibold whitespace-nowrap text-white hover:cursor-default">
            Trang Quản Lý Thiết Bị
          </span>

          <div className="flex items-center">
            <button
              id="menu-toggle"
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 cursor-pointer focus:outline-none md:hidden transition duration-300 ease-in-out"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div
            className={`w-full md:block md:w-auto ${
              isMenuOpen ? "" : "hidden"
            }`}
            id="mobile-menu"
          >
            <ul className="flex flex-col md:flex-row md:gap-5 md:text-sm md:font-medium py-1 md:py-0">
              <li>
                <Link
                  href="#"
                  className="w-full h-10 py-2 pr-4 pl-3 text-white md:p-0 flex aline-center items-center gap-1 md:hover:text-amber-300 md:hover:border-b-amber-300 md:hover:bg-transparent transition duration-300 ease-in-out max-md:hover:bg-gray-50 max-md:hover:text-gray-800 border-2 border-transparent max-md:rounded"
                  aria-current="page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-4.72 4.72a.75.75 0 1 1-1.06-1.06l4.72-4.72h-2.69a.75.75 0 0 1-.75-.75Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  (+84) 294.3853223
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="w-full h-10 py-2 pr-4 pl-3 text-white md:hover:text-amber-300 md:p-0 flex aline-center items-center gap-1 transition duration-300 ease-in-out max-md:hover:bg-gray-50 max-md:hover:text-gray-800 md:hover:border-b-amber-300 border-2 border-transparent max-md:rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                  thsp@tvu.edu.vn
                </Link>
              </li>
              <li className="md:hidden">
                <hr className="border-t border-gray-100 my-1" />
              </li>

              {isLoggedIn ? (
                <div>
                  <li className="relative group">
                    <button
                      id="profile-menu-button"
                      className="py-2 pr-4 pl-3 text-white h-10 md:hover:text-amber-300 md:p-0 lg:p-2 w-full flex items-center aline-center justify-center border-2 border-transparent md:hover:border-b-amber-300 transition duration-300 ease-in-out cursor-pointer"
                    >
                      <span>{email}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5 ml-1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="profile-dropdown"
                      className="hidden lg:group-hover:block absolute z-10 w-full max-md:w-full py-2 bg-white shadow-lg rounded"
                    >
                      <Link
                        to={config.routes.profile}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 max-md:text-center"
                      >
                        Hồ sơ
                      </Link>
                      <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 max-md:text-center">
                        <button onClick={handleLogout} className="w-full  text-left">Đăng xuất</button>
                      </div>
                    </div>
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    <Link
                      to={config.routes.login}
                      className="w-full h-10 py-2 pr-4 pl-3 text-gray-400 font-semibold md:hover:text-white md:p-0 flex aline-center items-center transition duration-300 ease-in-out max-md:hover:bg-gray-50 max-md:hover:text-gray-800 rounded"
                    >
                      Đăng nhập
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <nav className="border-b border-gray-200 px-2 sm:px-4">
        <div className="container flex flex-wrap justify-between items-center mx-auto py-1">
          <Link
            href="./index.html"
            className="flex items-center justify-center h-14 w-auto"
          >
            <img src={logo} alt="Logo THSP" className="h-full object-contain" />
          </Link>

          <div className="flex items-center">
            <button
              id="menu-toggle1"
              type="button"
              onClick={toggleNav}
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 md:hidden cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className={`w-full md:block md:w-auto ${isNavOpen ? "" : "hidden"}`}
            id="mobile-menu1"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-gl md:font-medium">
              <li>
                <Link
                  to={config.routes.home}
                  className={`py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 lg:p-2 w-full h-14 flex items-center justify-center border-2 border-transparent transition duration-300 ease-in-out ${
                    location.pathname === config.routes.home
                      ? "border-b-2 border-b-blue-700"
                      : "md:hover:border-b-blue-700"
                  }`}
                  aria-current="page"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to={config.routes.introduce}
                  className={`py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 lg:p-2 w-full h-14 flex items-center justify-center border-2 border-transparent transition duration-300 ease-in-out ${
                    location.pathname === config.routes.introduce
                      ? "border-b-2 border-b-blue-700"
                      : "md:hover:border-b-blue-700"
                  }`}
                >
                  Giới thiệu
                </Link>
              </li>
              <li className="relative group">
                <button
                  id="features-menu-button"
                  onClick={toggleFeature}
                  className="py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 lg:p-2 w-full h-14 flex items-center justify-center border-2 border-transparent md:hover:border-b-blue-700 transition duration-300 ease-in-out cursor-pointer"
                >
                  Tính năng
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 ml-1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  id="features-dropdown"
                  className={`
                    lg:hidden 
                    ${isFeatureOpen ? "block" : "hidden"} 
                    lg:group-hover:block 
                    absolute 
                    z-10 
                    w-48 
                    max-md:w-full 
                    py-2 
                    bg-white 
                    shadow-lg 
                    rounded-b 
                    rounded-tr
                  `}
                >
                  <Link
                    to={config.routes.deviceLog}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 max-md:text-center"
                  >
                    Nhật ký phòng
                  </Link>
                  <Link
                    to={config.routes.incidentReport}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 max-md:text-center"
                  >
                    Báo cáo sự cố
                  </Link>
                  {role_name === "staff" && (
                   <div>
                      <Link
                        to={config.routes.assignments}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 max-md:text-center"
                      >
                       Danh sách phân công
                      </Link>
                       <Link
                       to={config.routes.assignment}
                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 max-md:text-center"
                     >
                       Phân công của bạn
                     </Link>
                   </div>
                  )}
                </div>
              </li>

              <li>
                <Link
                  to={config.routes.contact}
                  className={`py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-100 md:hover:text-blue-700 md:p-0 lg:p-2 w-full h-14 flex items-center justify-center border-2 border-transparent transition duration-300 ease-in-out ${
                    location.pathname === config.routes.contact
                      ? "border-b-2 border-b-blue-700"
                      : "md:hover:border-b-blue-700"
                  }`}
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
