import { useState } from "react";
import data from "../data/transactions";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { FaFileExport } from "react-icons/fa";
import { exportToExcel } from "../utils/commonHelpers";

const TransactionTable = ({ role, limit }) => {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const filtered = data.filter((item) => {
        const matchesSearch = item.description
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter = filter ? item.type === filter : true;

        return matchesSearch && matchesFilter;
    });

    const displayedData = limit ? filtered.slice(0, limit) : filtered;

    {/* Search */ }
    const handleExport = async () => {

        const exportData = displayedData?.map((item, index) => ({
            "Sr No": index + 1,
            "Date": item?.date,
            "Description": item?.description,
            'Category': item?.category,
            "Amount": item?.amount,
            "Type": item?.type,
        }));

        exportToExcel(exportData, 'TransactionData', 'Transactions');
    };

    return (
        <div className="bg-card sm:p-5 p-3 rounded-2xl shadow-sm">

            <div className="flex justify-between flex-col xl:flex-row">

                <div className="flex justify-between align-baseline mb-4">
                    <h2 className="text-2xl font-semibold">
                        Transactions
                    </h2>

                    <button className='border px-3 py-2 rounded xl:hidden' onClick={handleExport}>
                        <FaFileExport />
                    </button>
                </div>

                <div className="flex mb-7 gap-2 justify-end">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border px-3 py-2 rounded w-25 max-w-xs bg-card text-primary"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="relative w-fit">
                        <select
                            onChange={(e) => setFilter(e.target.value)}
                            className="custom-select"
                        >
                            <option value="">All</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary">
                            ▼
                        </span>
                        
                    </div>

                    {limit && (
                        <div className="border px-3 py-2 rounded bg-card text-primary w-25 text-center">
                            <NavLink
                                to="/transactions"
                                className="text-sm"
                            >
                                View All →
                            </NavLink>
                        </div>
                    )}
                    
                    <button className='border px-3 py-2 rounded hidden xl:block' onClick={handleExport}>
                        <FaFileExport />
                    </button> 
                </div>
            </div>

            {/* Table */}
            <div className=" main-table">
                <table className="w-full text-left">
                    {displayedData?.length > 0 && <thead>
                        <tr className="text-secondary border-b">
                            <th className="pb-2">Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Type</th>
                            {role === "admin" && <th>Actions</th>}
                        </tr>
                    </thead>}

                    <tbody>
                        {displayedData?.length > 0 ?

                            (displayedData.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-main transition">
                                    <td className="py-2">{moment(item.date).format("DD MMM, yy")}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <td className="font-medium">₹{item.amount}</td>
                                    <td className=" capitalize">
                                        <span
                                            className={
                                                item.type === "income"
                                                    ? "text-positive"
                                                    : "text-negative"
                                            }
                                        >
                                            {item.type}
                                        </span>
                                    </td>

                                    {role === "admin" && (
                                        <td className="space-x-2">
                                            <button className="text-accent">Edit</button>
                                            <button className="text-negative">Delete</button>
                                        </td>
                                    )}
                                </tr>
                            )))

                            : <td className="border p-2 text-center" colSpan={5}>No Transactions Found</td>

                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default TransactionTable;