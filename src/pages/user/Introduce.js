import Image from "../../images/thsp.jpg";
function Introduce() {
  return ( 
    <div className="container mx-auto px-4 py-8">
                {/* <!-- Giới thiệu chung --> */}
                <div className="mb-16">
                    <h1
                        className="text-3xl font-bold text-center mb-12 flex gap-1 justify-center max-lg:flex-col max-md:text-2xl"
                    >
                        <p>Hệ Thống Quản Lý Thiết Bị</p>
                        <p>Trường Thực Hành Sư Phạm</p>
                    </h1>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                            <p className="text-gray-600 leading-relaxed">
                                Hệ thống Quản lý Thiết bị của Trường Thực hành
                                Sư phạm được xây dựng nhằm tin học hóa công tác
                                quản lý, theo dõi và bảo trì thiết bị trong toàn
                                trường.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Hệ thống giúp nâng cao hiệu quả sử dụng thiết
                                bị, đảm bảo tính minh bạch trong quản lý và tạo
                                điều kiện thuận lợi cho việc giảng dạy và học
                                tập.
                            </p>
                        </div>
                        <div>
                            <img
                                src={Image}
                                alt="Hệ thống quản lý thiết bị"
                                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* <!-- Mục tiêu hệ thống --> */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Mục Tiêu Hệ Thống
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* <!-- Quản lý hiệu quả --> */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="flex items-center mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8 text-[#233d7e]"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 2.25 2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <h3 className="text-xl font-bold ml-4">
                                    Quản Lý Hiệu Quả
                                </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Tối ưu hóa quy trình quản lý thiết bị, theo dõi
                                tình trạng sử dụng và bảo trì có hệ thống.
                            </p>
                        </div>

                        {/* <!-- Minh bạch thông tin --> */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="flex items-center mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-8 h-8 text-[#233d7e]"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <h3 className="text-xl font-bold ml-4">
                                    Minh Bạch Thông Tin
                                </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                Cung cấp thông tin chi tiết về thiết bị, lịch sử
                                sử dụng và bảo trì, giúp việc ra quyết định
                                chính xác và kịp thời.
                            </p>
                        </div>
                    </div>
                </div>

                {/* <!-- Tính năng chính --> */}
                {/* <div>
                    <h2 className="text-2xl font-bold text-center mb-8">
                        Tính Năng Chính
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* <!-- Quản lý thiết bị --> */}
                        {/* <div
                            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                        >
                            <div className="flex justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-12 h-12 text-[#233d7e]"
                                >
                                    <path
                                        d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z"
                                        clip-rule="evenodd"
                                    />
                                    <path
                                        d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Quản Lý Thiết Bị
                            </h3>
                            <p className="text-gray-600">
                                Theo dõi và quản lý toàn bộ thiết bị trong
                                trường
                            </p>
                        </div> */}

                        {/* <!-- Báo cáo sự cố --> */}
                        {/* <div
                            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                        >
                            <div className="flex justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-12 h-12 text-[#233d7e]"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Báo Cáo Sự Cố
                            </h3>
                            <p className="text-gray-600">
                                Hệ thống báo cáo và xử lý sự cố thiết bị
                            </p>
                        </div> */}

                        {/* <!-- Nhật ký sử dụng --> */}
                        {/* <div
                            className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition duration-300"
                        >
                            <div className="flex justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-12 h-12 text-[#233d7e]"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                                        clip-rule="evenodd"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">
                                Nhật Ký Sử Dụng
                            </h3>
                            <p className="text-gray-600">
                                Ghi nhận và theo dõi lịch sử sử dụng thiết bị
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>
   );
}

export default Introduce;