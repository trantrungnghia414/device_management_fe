import { useState, useEffect } from "react";
import axios from "../../../config/axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function BuildingIncident() {
    const [statisticsData, setStatisticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("week");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isCustomDate, setIsCustomDate] = useState(false);

    useEffect(() => {
        if (!isCustomDate) {
            fetchBuildingStats();
        }
    }, [period, isCustomDate]);

    const fetchBuildingStats = async (customDateRange = false) => {
        try {
            let url = `/api/statistic-building`;
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
            console.error("Error fetching building stats:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterClick = () => {
        if (startDate && endDate) {
            setIsCustomDate(true);
            fetchBuildingStats(true);
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
            <div className="chart-container bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                    <h2 className="text-2xl font-semibold">
                        Thống kê sự cố theo tòa nhà
                    </h2>
                    <div className="flex items-center gap-4 flex-wrap">
                        <select
                            className="px-4 py-2 mr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                {statisticsData && (
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            <p>Từ ngày: {statisticsData.start_date}</p>
                            <p>Đến ngày: {statisticsData.end_date}</p>
                        </div>

                        <BarChart
                            width={1200}
                            height={500}
                            data={statisticsData.buildings}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                interval={0}
                                padding={{ left: 20, right: 20 }}
                            />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey="total_incidents"
                                fill="#8884d8"
                                name="Số lượng sự cố"
                            />
                        </BarChart>
                    </>
                )}
            </div>
        </div>
    );
}

export default BuildingIncident;
