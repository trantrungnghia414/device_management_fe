import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function RoomStatistics() {
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [statisticsData, setStatisticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("week");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCustomDate, setIsCustomDate] = useState(false);

  // Fetch buildings on component mount
  useEffect(() => {
    fetchBuildings();
  }, []);

  // Fetch room statistics when building or period changes
  useEffect(() => {
    if (selectedBuilding && !isCustomDate) {
      fetchRoomStats();
    }
  }, [selectedBuilding, period, isCustomDate]);

  const fetchBuildings = async () => {
    try {
      const response = await axios.get("/api/buildings");

      console.log("room", response.data);
      setBuildings(response.data);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    }
  };

  const fetchRoomStats = async (customDateRange = false) => {
    if (!selectedBuilding) return;

    try {
      setLoading(true);
      const params = {
        building_id: selectedBuilding,
        ...(customDateRange
          ? { start_date: startDate, end_date: endDate }
          : { period }),
      };

      const response = await axios.get("/api/statistic-room", { params });
      if (response.data.success) {
        setStatisticsData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching room statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = () => {
    if (startDate && endDate) {
      setIsCustomDate(true);
      fetchRoomStats(true);
    }
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    setIsCustomDate(false);
  };

  return (
    <div className="statistics-page">
      <div className="chart-container bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Thống kê sự cố theo phòng</h2>
          <div className="flex items-center gap-4 flex-wrap">
            {/* Building Selection */}
            <select
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
            >
              <option value="">Chọn tòa nhà</option>
              {buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.building_name}
                </option>
              ))}
            </select>

            {/* Period Selection */}
            <select
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={period}
              onChange={handlePeriodChange}
              disabled={!selectedBuilding || isCustomDate}
            >
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>

            {/* Custom Date Range */}
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={!selectedBuilding}
              />
              <span>đến</span>
              <input
                type="date"
                className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={!selectedBuilding}
              />
              <button
                onClick={handleFilterClick}
                disabled={!selectedBuilding || !startDate || !endDate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Lọc
              </button>
            </div>
          </div>
        </div>

        {loading && <div>Đang tải...</div>}

        {!loading && statisticsData && (
          <>
            <div className="mb-4 text-sm text-gray-600">
              <p>Từ ngày: {statisticsData.start_date}</p>
              <p>Đến ngày: {statisticsData.end_date}</p>
            </div>

            <BarChart
              width={1200}
              height={500}
              data={statisticsData.rooms}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              {/* <Legend /> */}
              <Bar
                dataKey="total_incidents"
                fill="#82ca9d"
                name="Số lượng sự cố"
                barSize={60}
              />
            </BarChart>
          </>
        )}

        {!selectedBuilding && (
          <div className="text-center text-gray-500 mt-8">
            Vui lòng chọn tòa nhà để xem thống kê
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomStatistics;
