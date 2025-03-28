import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import config from "../../config";
import Swal from "sweetalert2";
import { faAngleLeft, faAngleRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function IncidentList() {
  const { id } = useParams();
  const [incidents, setIncidents] = useState([]);
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/classrooms-incident/${id}`);
      // Get the first item from the array since that contains our classroom data
      const classroomData = response.data[0];
      setClassroom(classroomData);
      setIncidents(classroomData.incident_reports || []);
      console.log("Classroom data:", classroomData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  const classroomName = localStorage.setItem("classroomName", classroom?.name);

  const getStatusClass = (status) => {
    switch (status) {
      case "reported":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "reported":
        return "Đã báo cáo";
      case "processing":
        return "Đang sửa";
      case "completed":
        return "Đã sửa";
      default:
        return "Chưa xử lý";
    }
  };

  const handleReportClick = (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Thông báo",
        text: "Vui lòng đăng nhập để báo cáo sự cố",
        confirmButtonColor: "#233d7e",
      });
      return;
    }
    window.location.href = config.routes.incidentForm.replace(":id", id);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = incidents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(incidents.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="flex-1 container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-4">
        <h1 className="text-2xl font-bold max-md:font-semibold text-gray-800">
          Nhật Ký Sự Cố Phòng {classroom?.name || ""}
        </h1>
        <Link
          onClick={handleReportClick}
          to="#"
          className="bg-[#233d7e] hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg items-center transition duration-300 ease-in-out flex gap-2 max-md:w-full max-md:justify-center"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Báo cáo sự cố</span>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-4 text-center text-gray-600">Loading...</div>
        ) : incidents.length === 0 ? (
          <div className="p-4 text-center text-gray-600">
            Không có sự cố nào được báo cáo
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="max-md:hidden">
                  <th className="px-6 py-3 text-left text-xs md:text-base font-bold text-gray-700 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs md:text-base font-bold text-gray-700 uppercase tracking-wider">
                    Thời Gian
                  </th>
                  <th className="px-6 py-3 text-left text-xs md:text-base font-bold text-gray-700 uppercase tracking-wider">
                    Mô Tả
                  </th>
                  <th className="px-6 py-3 min-w-[150px] text-left text-xs md:text-base font-bold text-gray-700 uppercase tracking-wider">
                    Trạng Thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((incident, index) => (
                  <tr
                    key={incident.id}
                    className={`max-md:block max-md:border-b max-md:p-4 ${
                      incident.status === "reported" ? "bg-yellow-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap max-md:block max-md:px-0 max-md:py-1">
                      <span className="max-md:hidden">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </span>

                      <span className="text-xs text-gray-600 md:hidden">
                        đã báo cáo
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-md:block max-md:px-0 max-md:py-1">
                      <div className="text-sm text-gray-900">
                        <span className="max-md:font-semibold md:hidden">
                          Thời gian:
                        </span>
                        <span>
                          {new Date(incident.report_time).toLocaleDateString()}
                        </span>
                        <span className="font-semibold ml-2">
                          {new Date(incident.report_time).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-md:block max-md:px-0 max-md:py-1">
                      <div className="text-sm text-gray-900">
                        <span className="max-md:font-semibold md:hidden">
                          Mô tả:
                        </span>
                        <span>{incident.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-md:block max-md:px-0 max-md:py-1">
                      <span className="max-md:font-semibold max-md:mr-1 md:hidden">
                        Trạng thái:
                      </span>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                          incident.status
                        )}`}
                      >
                        {getStatusText(incident.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-3 flex justify-end border-t border-gray-200">
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {/* Previous */}
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    
                    <FontAwesomeIcon icon={faAngleLeft}  />
                  </button>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show first page, last page, current page and one page before and after current
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 &&
                        pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === pageNumber
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    // Show dots if there's a gap
                    if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span
                          key={pageNumber}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  {/* Next */}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {/* <span className="sr-only">Next</span>
                    Sau */}
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default IncidentList;
