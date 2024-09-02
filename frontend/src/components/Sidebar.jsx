import React, { useState } from "react";
import { FaTh, FaBars, FaUserAlt, FaCommentAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/",
      name: "Friends",
      icon: <FaUserAlt />,
    },
    {
      path: "/",
      name: "Groups",
      icon: <FaCommentAlt />,
    },
  ];
  return (
    <div className="flex">
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-500 ease-in-out bg-blue text-white ${
          isOpen ? "w-48" : "w-16"
        }`}
      >
        <div className="flex items-center ">
          <h1
            className={`text-xl transition-all duration-500 ${
              isOpen ? "block p-4" : "hidden"
            }`}
          >
            SplitBuddy
          </h1>
          <div
            className={`text-2xl hover:bg-black ${isOpen ? "p-5" : "ml-0 p-5"}`}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="mt-4">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 gap-4 transition-all duration-500 ${
                  isActive ? "bg-black text-white" : "text-white hover:bg-black"
                }`
              }
            >
              <div className="text-xl">{item.icon}</div>
              <div
                className={`text-lg transition-all duration-500 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main className={`flex-1 ${isOpen ? "ml-48" : "ml-16"}`}>{children}</main>
    </div>
  );
};

export default Sidebar;
