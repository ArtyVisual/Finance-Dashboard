import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const StatCard = ({ title, amount, change, isPositive }) => {
    return (
        <div className="bg-card p-1 rounded-2xl shadow-sm hover:shadow-md transition hover-lift ">

            <p className="text-sm text-secondary">{title}</p>

            <h2 className="text-2xl font-semibold mt-1 text-primary">
                {amount}
            </h2>

            <div className="flex items-center mt-2 space-x-2">
                <span
                    className={`flex items-center text-sm font-medium ${isPositive ? "text-positive" : "text-negative"
                        }`}
                >
                    {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                    <span className="ml-1">{change}%</span>
                </span>

                <span className="text-xs text-secondary">vs last month</span>
            </div>
        </div>
    );
};

export default StatCard;