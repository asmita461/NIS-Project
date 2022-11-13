import React from "react";
import Image from "../Images/app-logo.png"

const Navbar = () => {
    return(
        <div className="">
            <div class="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 shadow-2xl w-full">
                <div class="text-4xl text-white font-semibold inline-flex items-center">
                    <img src={Image} class="w-12 mx-4 mr-8" alt="logo-img"/>
                    <span>SecureShare</span>
                 </div>
                <div>
                    <ul class="flex text-white">
                        <li class="ml-5 px-3 py-1 rounded font-semibold bg-gray-100 text-gray-800"><a href="">About Us</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;