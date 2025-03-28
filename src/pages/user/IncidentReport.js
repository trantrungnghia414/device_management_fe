import axios from "../../config/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config";

function IncidentReport() {
    const [buildings, setBuildings] = useState([]);
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/incident");
            console.log("Data:", response.data);
            setBuildings(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleBuildingClick = (building) => {
        setSelectedBuilding(building);
        setSelectedRoomType("");
        setSelectedRoom("");
    };

    const handleRoomTypeClick = (roomType) => {
        setSelectedRoomType(roomType);
        setSelectedRoom("");
    };

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        console.log("Đã chọn phòng:", room);
    };

    return (
        <main className="container mx-auto px-4 py-8 flex flex-col flex-1">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">
                    BÁO CÁO SỰ CỐ THIẾT BỊ
                </h1>
                <p className="text-gray-600">
                    Vui lòng chọn vị trí phòng cần báo cáo
                </p>
            </div>

            {/* Building Selection */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Chọn Tòa Nhà</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {buildings.map((building) => (
                        <button
                            key={building.building_id}
                            onClick={() => handleBuildingClick(building)}
                            className={`building-btn p-4 border-2 rounded-lg transition-all ${
                                selectedBuilding?.building_id ===
                                building.building_id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                            }`}
                        >
                            <p className="text-lg font-semibold">
                                Tòa {building.building_name}
                            </p>
                            <p className="text-sm text-gray-500">
                                Khu {building.building_name}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Room Type Selection */}
            {selectedBuilding && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">
                        Chọn Loại Phòng
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {selectedBuilding.room_types.map((type) => (
                            <button
                                key={type.room_type_id}
                                onClick={() => handleRoomTypeClick(type)}
                                className={`room-type-btn p-4 border-2 rounded-lg transition-all ${
                                    selectedRoomType?.room_type_id ===
                                    type.room_type_id
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
                                }`}
                            >
                                <p className="text-lg font-semibold">
                                    {type.room_type_name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {type.room_type_name === "Phòng máy"
                                        ? "Phòng thực hành máy tính"
                                        : "Phòng học lý thuyết"}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Room Grid */}
            {selectedBuilding && selectedRoomType && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Chọn Phòng</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {selectedRoomType.classrooms.map((room) => (
                            <Link
                                key={room.id}
                                to={`${config.routes.incidentList.replace(
                                    ":id",
                                    room.id
                                )}`}
                                //to={`${config.routes.incidentList}/${room.classroom_id}`}
                                className="aspect-square flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50"
                            >
                                <div className="text-center">
                                    <p className="text-lg font-semibold">
                                        {room.name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}

export default IncidentReport;
