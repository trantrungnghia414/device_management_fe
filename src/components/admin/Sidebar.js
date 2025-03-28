import { Link } from 'react-router-dom';
import { useState } from 'react';
import config from '../../config';
import Swal from 'sweetalert2';
function Sidebar() {
    // const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role_name');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        window.location.href = '/';
    };

    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen); // Đảo trạng thái của dropdown
    // };
    return (
        <>
            <aside className="flex-initial min-h-[100vh] left-0 top-0 w-64  p-4 border border-gray-700  rounded-tr-lg bg-[#d4b414]">
                <Link to={config.routes.admin} className="flex items-center pb-4 border-b border-b-black">
                    <span className="text-lg font-bold ml-3 text-white">Bảng điều khiển</span>
                </Link>
                <ul className="mt-4">
                    {/* Tòa nhà*/}
                    <li className="mb-1">
                        <Link 
                            to={ config.routes.buildingsList}
                            className="flex items-center py-2 px-4 hover:bg-[#d1b75f]  rounded-md "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#fff"
                                className="size-6 hover:bg-[#d1b75f]"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                                />
                            </svg>
                            <span className="text-base ml-1 font-semibold text-white">Tòa nhà</span>
                        </Link>
                    </li>

                    {/* Loại phòng*/}
                    <li className="mb-1">
                        <Link 
                            to={ config.routes.roomsTypeList}
                            className="flex items-center py-2 px-4 hover:bg-[#d1b75f]  rounded-md "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#fff"
                                className="size-6 hover:bg-[#d1b75f]"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                                />
                            </svg>
                            <span className="text-base ml-1 font-semibold text-white">Loại phòng</span>
                        </Link>
                    </li>

                     {/* Thiết bị*/}
                     <li className="mb-1">
                        <Link 
                            to={ config.routes.equipmentList}
                            className="flex items-center py-2 px-4 hover:bg-[#d1b75f]  rounded-md "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="#fff"
                                className="size-6 hover:bg-[#d1b75f]"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                                />
                            </svg>
                            <span className="text-base ml-1 font-semibold text-white">Thiết bị</span>
                        </Link>
                    </li>
                    {/* Đăng xuất */}
                    <li className="mb-1">
                        <button
                            onClick={() => {
                                Swal.fire({
                                    title: 'Đăng xuất',
                                    text: 'Bạn có chắc chắn muốn thoát không?',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Đồng ý',
                                    cancelButtonText: 'Hủy',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleLogout();
                                    }
                                });
                            }}
                            className="w-full flex items-center py-2 px-4 hover:bg-[#d1b75f] rounded-md"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#fff"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                />
                            </svg>
                            <span className="text-base ml-1 font-semibold text-white">Đăng xuất</span>
                        </button>
                    </li>
                </ul>
            </aside>
        </>
    );
}

export default Sidebar;
