import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";

function DeviceLog() {
  const [loading, setLoading] = useState(true);
  const [incidents, setIncidents] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(getWeekDates());
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Get start and end dates for a week
  function getWeekDates(date = new Date()) {
    const curr = new Date(date);
    const first = curr.getDate() - curr.getDay() + 1; // First day is Monday
    const last = first + 6; // Last day is Sunday

    const firstDay = new Date(curr.setDate(first));
    const lastDay = new Date(curr.setDate(last));

    return {
      start: firstDay,
      end: lastDay,
    };
  }

  // Format date for input display
  const formatDateForInput = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Navigate weeks
  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek.start);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentWeek(getWeekDates(newDate));
  };

  // Get period of day based on time
  const getPeriod = (time) => {
    const hour = new Date(time).getHours();
    if (hour >= 6 && hour < 12) return "Sáng";
    if (hour >= 12 && hour < 18) return "Chiều";
    return "Tối";
  };

  // Get day of week in Vietnamese
  const getVietnameseDay = (date) => {
    const day = new Date(date).getDay();
    const days = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    return days[day];
  };

  useEffect(() => {
    fetchData();
    fetchNotifications();
  }, [currentWeek]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/device-log");
      console.log("Data fetched:", response.data);
      setIncidents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/incident-notification");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Generate week data
  const generateWeekData = () => {
    const weekData = [];
    for (
      let d = new Date(currentWeek.start);
      d <= currentWeek.end;
      d.setDate(d.getDate() + 1)
    ) {
      const currentDate = new Date(d);
      const dayIncidents = incidents.filter((incident) => {
        const incidentDate = new Date(incident.report_time);
        return incidentDate.toDateString() === currentDate.toDateString();
      });

      // Group incidents by period
      const periodIncidents = {
        Sáng: dayIncidents.filter((i) => getPeriod(i.report_time) === "Sáng"),
        Chiều: dayIncidents.filter((i) => getPeriod(i.report_time) === "Chiều"),
        Tối: dayIncidents.filter((i) => getPeriod(i.report_time) === "Tối"),
      };

      // Calculate total rows needed for this day
      const totalIncidents = Object.values(periodIncidents).reduce(
        (sum, incidents) => sum + Math.max(incidents.length, 1),
        0
      );

      weekData.push({
        date: currentDate,
        incidents: periodIncidents,
        totalRows: totalIncidents,
      });
    }
    return weekData;
  };

  const groupIncidentsByClassroom = (incidents) => {
    return incidents.reduce((acc, incident) => {
      const key = incident.classroom_name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(incident);
      return acc;
    }, {});
  };

  const getStatusDisplay = (incident) => {
    // First check the incident status
    if (incident.status === "reported") {
      return {
        text: "Chờ xử lý",
        color: "text-yellow-600",
      };
    }

    if (incident.status === "assigned") {
      return {
        text: "Đang sửa",
        color: "text-blue-600",
      };
    }

    if (incident.status === "completed") {
      // Check if all assignmentUsers have completion_time
      if (incident.assignmentUsers && incident.assignmentUsers.length > 0) {
        const allCompleted = incident.assignmentUsers.every(
          (user) => user.completion_time
        );
        if (allCompleted) {
          return {
            text: "Đã sửa",
            color: "text-green-600",
          };
        }
      }
      return {
        text: "Đã sửa",
        color: "text-green-600",
      };
    }

    // Default case if none of the above
    return {
      text: "Chờ xử lý",
      color: "text-gray-600",
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-4">
        <h1 className="text-2xl font-bold mb-4">SỔ NHẬT KÝ PHÒNG</h1>
        <div className="flex items-center gap-4">
          <Link
            to={config.routes.incidentReport}
            className="bg-[#233d7e] hover:bg-[#4a6ec8] text-white font-medium py-2 px-4 rounded-lg items-center transition duration-300 ease-in-out flex gap-2 max-md:w-full max-md:justify-center"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Báo cáo sự cố</span>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateWeek("prev")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span>Từ ngày</span>
              <input
                type="date"
                value={formatDateForInput(currentWeek.start)}
                className="border rounded px-2 py-1"
                readOnly
              />
            </div>
            <div className="flex items-center gap-2">
              <span>đến ngày</span>
              <input
                type="date"
                value={formatDateForInput(currentWeek.end)}
                className="border rounded px-2 py-1"
                readOnly
              />
            </div>
            <button
              onClick={() => navigateWeek("next")}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#233d7e] text-white">
              <th className="border border-gray-300 px-4 py-2 w-24">THỨ</th>
              <th className="border border-gray-300 px-4 py-2 w-24">BUỔI</th>
              <th className="border border-gray-300 px-4 py-2">PHÒNG</th>
              <th className="border border-gray-300 px-4 py-2">
                TÌNH TRẠNG THIẾT BỊ
              </th>
              <th className="border border-gray-300 px-4 py-2 w-48">
                TRẠNG THÁI
              </th>
            </tr>
          </thead>
          <tbody>
            {generateWeekData().map((day) => (
              <React.Fragment key={day.date.toISOString()}>
                {["Sáng", "Chiều", "Tối"].map((period, periodIndex) => {
                  const periodIncidents = day.incidents[period];

                  return periodIncidents.length === 0 ? (
                    <tr key={`${day.date}-${period}-empty`}>
                      {periodIndex === 0 && (
                        <td
                          className="border border-gray-300 px-4 py-2 text-center"
                          rowSpan={day.totalRows}
                        >
                          {getVietnameseDay(day.date)}
                          <br />({day.date.toLocaleDateString()})
                        </td>
                      )}
                      <td className="border border-gray-300 px-4 py-2">
                        {period}
                      </td>
                      <td className="border border-gray-300 px-4 py-2"></td>
                      <td className="border border-gray-300 px-4 py-2"></td>
                      <td className="border border-gray-300 px-4 py-2"></td>
                    </tr>
                  ) : (
                    (() => {
                      const groupedIncidents =
                        groupIncidentsByClassroom(periodIncidents);
                      return Object.entries(groupedIncidents)
                        .map(
                          ([classroom, classroomIncidents], classroomIndex) =>
                            classroomIncidents.map(
                              (incident, incidentIndex) => (
                                <tr
                                  key={`${day.date}-${period}-${incident.id}`}
                                >
                                  {periodIndex === 0 &&
                                    classroomIndex === 0 &&
                                    incidentIndex === 0 && (
                                      <td
                                        className="border border-gray-300 px-4 py-2 text-center"
                                        rowSpan={day.totalRows}
                                      >
                                        {getVietnameseDay(day.date)}
                                        <br />({day.date.toLocaleDateString()})
                                      </td>
                                    )}
                                  {incidentIndex === 0 &&
                                  classroomIndex === 0 ? (
                                    <td
                                      className="border border-gray-300 px-4 py-2"
                                      rowSpan={periodIncidents.length}
                                    >
                                      {period}
                                    </td>
                                  ) : null}
                                  {incidentIndex === 0 ? (
                                    <td
                                      className="border border-gray-300 px-4 py-2"
                                      rowSpan={classroomIncidents.length}
                                    >
                                      {classroom}
                                    </td>
                                  ) : null}
                                  <td className="border border-gray-300 px-4 py-2">
                                    {incident.description}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    <span
                                      className={`font-medium ${
                                        getStatusDisplay(incident).color
                                      }`}
                                    >
                                      {getStatusDisplay(incident).text}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )
                        )
                        .flat();
                    })()
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeviceLog;
