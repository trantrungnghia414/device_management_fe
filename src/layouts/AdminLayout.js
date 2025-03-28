import Header from "../components/admin/Sidebar";
import { useEffect, useState, useRef, use } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  faBars,
  faBell,
  faBuilding,
  faChartPie,
  faCircleUser,
  faDoorOpen,
  faHome,
  faHouse,
  faKeyboard,
  faLaptopHouse,
  faRightFromBracket,
  faScrewdriverWrench,
  faSignOut,
  faSignOutAlt,
  faTriangleCircleSquare,
  faTriangleExclamation,
  faUser,
  faUserGroup,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import config from "../config";
import axios from "axios";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("role_name");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const email = localStorage.getItem("email");
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationDropdownRef = useRef(null);
  const notificationBtnRef = useRef(null);

  const [incidentReports, setIncidentReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showStatsDropdown, setShowStatsDropdown] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/incident-notification");
      setIncidentReports(response.data);
      setNotificationCount(response.data ? response.data.length : 0);
    } catch (error) {
      console.log(error);
      setNotificationCount(0);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else if (user !== "admin") {
      navigate("/");
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        !notificationBtnRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle Sidebar
  const expandSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Show Content
  const showContent = (section) => {
    setActiveSection(section);
  };

  const handleLogoutClick = () => {
    // Cập nhật active section
    showContent("logout");

    // Hiển thị confirm dialog
    Swal.fire({
      title: "Đăng xuất",
      text: "Bạn có chắc chắn muốn thoát không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role_name");
    localStorage.removeItem("email");
    window.location.href = "/";
  };
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col">
        <nav className="border-b border-gray-300">
          <div className="flex justify-between items-center pl-0 pr-6 py-2 bg-[#233d7e]">
            <div className="flex items-center gap-2">
              <button
                id="menu-button"
                onClick={expandSidebar}
                className="px-[20px] py-1"
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-white text-2xl"
                />
              </button>
              <span className="text-white font-semibold text-xl">
                Bảng Điều Khiển
              </span>
            </div>
            <div className="space-x-4 flex items-center justify-center gap-2">
              {/* <button>
                <FontAwesomeIcon icon={faBell} className="text-white text-lg" />
              </button> */}
              <div className="relative">
                <button
                  id="notification-btn"
                  className="relative"
                  ref={notificationBtnRef}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-white text-lg"
                  />
                  {/* <!-- Badge số lượng thông báo --> */}
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                </button>

                {/* <!-- Dropdown thông báo --> */}
                {showNotifications && (
                  <div
                    id="notification-dropdown"
                    className="absolute right-0 mt-2 w-[400px] bg-white rounded-lg shadow-lg z-50"
                    ref={notificationDropdownRef}
                  >
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-semibold">Thông báo</h3>
                    </div>
                    <div className="max-h-[460px] overflow-y-auto">
                      {/* <!-- Thông báo chưa đọc --> */}
                      {incidentReports.map((incidentReport, index) => (
                        <Link
                          to={config.routes.assignmentAdd.replace(
                            ":id",
                            incidentReport.id
                          )}
                          key={incidentReport.id || index}
                          className={`block p-4 hover:bg-gray-50 cursor-pointer ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href =
                              config.routes.assignmentAdd.replace(
                                ":id",
                                incidentReport.id
                              );
                          }}
                        >
                          <div className="flex gap-4 items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-[1px] border-gray-200">
                              {incidentReport.avatar_url ? (
                                <img
                                  src={incidentReport.avatar_url}
                                  className="w-full h-full object-cover"
                                  alt="Avatar"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6 text-gray-500"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">
                                {incidentReport.user_name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {incidentReport.description}
                              </p>
                              <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                <span>{incidentReport.report_time}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button>
                {/* <FontAwesomeIcon icon={faUser} className="text-white text-lg" /> */}
                <span className="text-white">{email}</span>
              </button>
            </div>
          </div>
        </nav>

        <div className="flex h-full">
          <div
            id="sidebar"
            className={`transition-all duration-150 ease-out min-w-[200px] p-2 flex flex-col gap-2 
              ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
          >
            <div className="relative">
              <button
                className={`nav-item relative px-3 py-3 flex items-center space-x-4 justify-between 
                  text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                  ${activeSection === "dashboard" ? "active-nav-item" : ""}`}
                onClick={() => setShowStatsDropdown(!showStatsDropdown)}
                data-section="dashboard"
              >
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon icon={faChartPie} className="text-lg py-2" />
                  <span className="font-medium transition-all duration-200 text-gray-600">
                    Thống kê
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showStatsDropdown ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showStatsDropdown && (
                <div className="absolute left-0 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-10">
                  <Link
                    to={config.routes.buildingIncident}
                    className="block px-4 py-3 text-gray-700 font-semibold hover:bg-gray-100"
                    onClick={() => {
                      showContent("roomStats");
                      setShowStatsDropdown(false);
                    }}
                  >
                    Sự cố theo tòa
                  </Link>

                  <Link
                    to={config.routes.roomIncident}
                    className="block px-4 py-3 text-gray-700 font-semibold hover:bg-gray-100"
                    onClick={() => {
                      showContent("roomStats");
                      setShowStatsDropdown(false);
                    }}
                  >
                    Sự cố theo phòng
                  </Link>

                  <Link
                    to={config.routes.crashReport}
                    className="block px-4 py-3 text-gray-700 font-semibold hover:bg-gray-100"
                    onClick={() => {
                      showContent("incidentStats");
                      setShowStatsDropdown(false);
                    }}
                  >
                    Báo cáo sự cố
                  </Link>
                </div>
              )}
            </div>

            {/* Tòa nhà */}
            <Link
              to={config.routes.buildingsList}
              className={`nav-item relative px-3 py-3 flex items-center space-x-4 justify-start 
                text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                ${activeSection === "buildings" ? "active-nav-item" : ""}`}
              onClick={() => showContent("buildings")}
              data-section="buildings"
            >
              <FontAwesomeIcon icon={faBuilding} className="text-lg py-2" />
              <span className="font-medium transition-all duration-200 text-gray-600">
                Tòa nhà
              </span>
            </Link>

            {/* Loại phòng */}
            <Link
              to={config.routes.roomsTypeList}
              className={`nav-item relative px-3 py-3 flex items-center space-x-4 justify-start 
                text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                ${activeSection === "roomTypes" ? "active-nav-item" : ""}`}
              onClick={() => showContent("roomTypes")}
              data-section="roomTypes"
            >
              <FontAwesomeIcon icon={faDoorOpen} className="text-lg py-2" />
              <span className="font-medium transition-all duration-200 text-gray-600">
                Loại phòng
              </span>
            </Link>

            {/* Thiết bị */}
            <Link
              to={config.routes.equipmentList}
              className={`nav-item relative px-3 py-3 flex items-center space-x-4 justify-start 
                text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                ${activeSection === "equipments" ? "active-nav-item" : ""}`}
              onClick={() => showContent("equipments")}
              data-section="equipments"
            >
              <FontAwesomeIcon icon={faKeyboard} className="text-lg py-2" />
              <span className="font-medium transition-all duration-200 text-gray-600">
                Thiết bị
              </span>
            </Link>

            {/* Ban sửa chữa */}
            {/* <Link
              to={config.routes.repairTeamList}
              className={`nav-item relative px-3 py-3 flex items-center space-x-4 justify-start 
                text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                ${activeSection === "repairTeams" ? "active-nav-item" : ""}`}
              onClick={() => showContent("repairTeams")}
              data-section="repairTeams"
            >
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                className="text-lg py-2"
              />
              <span className="font-medium transition-all duration-200 text-gray-600">
                Ban sửa chữa
              </span>
            </Link> */}

            {/* Phòng học */}
            <Link
              to={config.routes.classroomList}
              className={`nav-item relative px-3 py-3 flex items-center space-x-4 justify-start 
                text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                ${activeSection === "classrooms" ? "active-nav-item" : ""}`}
              onClick={() => showContent("classrooms")}
              data-section="classrooms"
            >
              <FontAwesomeIcon icon={faHouse} className="text-lg py-2" />
              <span className="font-medium transition-all duration-200 text-gray-600">
                Phòng
              </span>
            </Link>

            {/* Người dùng */}
            <Link
              to={config.routes.userList}
              className={`nav-item relative px-3 py-3 flex items-center space-x-4 justify-start 
                text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                ${activeSection === "users" ? "active-nav-item" : ""}`}
              onClick={() => showContent("users")}
              data-section="users"
            >
              <FontAwesomeIcon icon={faCircleUser} className="text-lg py-2" />
              <span className="font-medium transition-all duration-200 text-gray-600">
                Người dùng
              </span>
            </Link>

            {/* Báo cáo sự cố */}
            <Link
              to={config.routes.incidentReportList}
              className={`nav-item relative px-3 py-3 flex items-center space-x-4 justify-start 
                text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                ${
                  activeSection === "incident-report" ? "active-nav-item" : ""
                }`}
              onClick={() => showContent("incident-report")}
              data-section="incident-report"
            >
              <FontAwesomeIcon icon={faTriangleExclamation} className="text-lg py-2" />
              <span className="font-medium transition-all duration-200 text-gray-600">
                Báo cáo sự cố
              </span>
            </Link>

            <button
              className={`relative px-3 py-3 flex items-center space-x-4 justify-start 
                text-gray-500 rounded-lg group hover:bg-gray-300 w-full
                ${activeSection === "logout" ? "active-nav-item" : ""}`}
              data-section="logout"
              onClick={handleLogoutClick}
            >
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="text-lg py-2"
              />
              <span className="font-medium transition-all duration-200 text-gray-600">
                Đăng xuất
              </span>
            </button>
          </div>

          <div className="bg-gray-100  min-h-[100%] overflow-auto  flex-1 transition-all duration-200 ease-in-out py-4 px-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
