import { useState, useEffect } from "react";
import axios from "../../../config/axios";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
function CrashReport() {
    const [statisticsData, setStatisticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("week");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isCustomDate, setIsCustomDate] = useState(false);

    useEffect(() => {
        if (!isCustomDate) {
            fetchTeacherStats();
        }
    }, [period, isCustomDate]);

    const fetchTeacherStats = async (customDateRange = false) => {
        try {
            let url = `/api/statistic-teacher-reports`;
            let params = {};

            if (customDateRange) {
                params = { start_date: startDate, end_date: endDate };
            } else {
                params = { period };
            }

            const response = await axios.get(url, { params });
            if (response.data.success) {
                setStatisticsData(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching teacher stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterClick = () => {
        if (startDate && endDate) {
            setIsCustomDate(true);
            fetchTeacherStats(true);
        }
    };

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
        setIsCustomDate(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="statistics-page">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className="text-2xl font-semibold">
                    Thống kê giáo viên báo cáo sự cố
                </h2>
                <div className="flex items-center gap-4 flex-wrap">
                    <select
                        className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={period}
                        onChange={handlePeriodChange}
                        disabled={isCustomDate}
                    >
                        <option value="week">Tuần này</option>
                        <option value="month">Tháng này</option>
                        <option value="quarter">Quý này</option>
                        <option value="year">Năm nay</option>
                    </select>

                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span>đến</span>
                        <input
                            type="date"
                            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button
                            onClick={handleFilterClick}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
                        >
                            Lọc
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="chart-container bg-white rounded-lg shadow p-6">
                    {statisticsData && (
                        <>
                            <div className="mb-4 text-sm text-gray-600">
                                <p>Từ ngày: {statisticsData.start_date}</p>
                                <p>Đến ngày: {statisticsData.end_date}</p>
                            </div>

                            <BarChart
                                width={600}
                                height={400}
                                data={statisticsData.teachers}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />

                                <Bar
                                    dataKey="total_incidents"
                                    fill="#8884d8"
                                    name="Số lượng báo cáo"
                                />
                            </BarChart>
                        </>
                    )}
                </div>

                {/* Pie Chart */}
                <div className="chart-container bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Phân bố báo cáo sự cố (%)
                    </h2>
                    {statisticsData && (
                        <PieChart width={400} height={400}>
                            <Pie
                                data={statisticsData.teachers}
                                dataKey="total_incidents"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                            >
                                {statisticsData.teachers.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [
                                    `${(
                                        (value /
                                            statisticsData.teachers.reduce(
                                                (acc, curr) =>
                                                    acc + curr.total_incidents,
                                                0
                                            )) *
                                        100
                                    ).toFixed(0)}%`,
                                    name,
                                ]}
                            />
                            <Legend />
                        </PieChart>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CrashReport;
