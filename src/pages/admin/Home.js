
import React, { useState, useEffect } from 'react';
import Image from '../../images/image-admin.png';
function Home() {
    return (
   <div className="translate-y-[15%] ">
             <div className="mx-auto text-center">
                 <span className="text-2xl">Chào mừng đến với</span>
                 <span className="font-semibold text-2xl"> Trang Quản trị!</span>
             </div>
             <div className="flex justify-center">
                 <img src={Image} width="30%" alt="" />
             </div>
         </div>
    )
}

export default Home;
