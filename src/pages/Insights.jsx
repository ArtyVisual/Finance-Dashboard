import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import data from "../data/transactions";

const Insights = () => {
    // Filter only expenses
    const expenses = data.filter((t) => t.type === "expense");

    // 1. Highest spending category
    const categoryMap = {};

    expenses.forEach((t) => {
        categoryMap[t.category] =
            (categoryMap[t.category] || 0) + t.amount;
    });

    const topCategory = Object.entries(categoryMap).sort(
        (a, b) => b[1] - a[1]
    )[0];

    // 2. Monthly comparison (simple)
    const currentMonth = 4; // April (mock)
    const lastMonth = 3;

    const currentTotal = expenses
        .filter((t) => new Date(t.date).getMonth() + 1 === currentMonth)
        .reduce((acc, t) => acc + t.amount, 0);

    const lastTotal = expenses
        .filter((t) => new Date(t.date).getMonth() + 1 === lastMonth)
        .reduce((acc, t) => acc + t.amount, 0);

    const change = lastTotal
        ? ((currentTotal - lastTotal) / lastTotal) * 100
        : 0;


    const income = data
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    const expense = data
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const savingsRate = income
        ? ((income - expense) / income) * 100
        : 0;

    const categoryTotals = {};

    data
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            categoryTotals[t.category] =
                (categoryTotals[t.category] || 0) + t.amount;
        });

    const topCategories = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const monthlyData = {};

    data.forEach((t) => {
        const month = new Date(t.date).toLocaleString("default", {
            month: "short",
        });

        if (!monthlyData[month]) {
            monthlyData[month] = { month, income: 0, expense: 0 };
        }

        if (t.type === "income") {
            monthlyData[month].income += t.amount;
        } else {
            monthlyData[month].expense += t.amount;
        }
    });

    const chartData = Object.values(monthlyData);


    return (
        <div className="grid md:grid-cols-3 gap-4">

            {/* Top Category */}
            <div className="bg-card p-5 hover-lift h-50 grid content-between rounded-2xl shadow-sm">
                <h3 className="text-primary text-xl font-semibold mb-2">
                    Top Spending Category
                </h3>
                <p className="text-primary font-bold  text-5xl text-accent">
                    ₹{topCategory?.[1]}
                </p>
                <p className="text-xl font-bold text-secondary">
                    {topCategory?.[0]}
                </p>
            </div>

            {/* Monthly Comparison */}
            <div className="bg-card p-5 hover-lift h-50 rounded-2xl shadow-sm grid content-between">
                <h3 className="text-primary text-xl font-semibold mb-2">
                    Monthly Change
                </h3>
                <p
                    className={`text-5xl font-bold ${change > 0 ? "text-negative" : "text-positive"
                        }`}
                >
                    {change.toFixed(1)}%
                </p>
                <p className="text-xl font-bold text-secondary">
                    vs last month
                </p>
            </div>

            {/* Smart Insight */}
            <div className="bg-card p-5 hover-lift h-50 rounded-2xl shadow-sm grid content-between">
                <h3 className="text-primary text-xl font-semibold mb-2">
                    Insight
                </h3>

                <p className="text-secondary text-xl ">
                    {change > 0
                        ? "Your spending increased this month. Consider reducing unnecessary expenses."
                        : "Great! Your spending decreased compared to last month."}
                </p>
            </div>

            <div className="bg-card p-5 hover-lift h-50 rounded-2xl shadow-sm grid content-between">
                <h3 className="text-primary text-xl font-semibold mb-2">
                    Savings Rate
                </h3>

                <p className="text-5xl font-bold text-accent">
                    {savingsRate.toFixed(1)}%
                </p>

                <p className="text-xl font-bold text-secondary">
                    {savingsRate > 20
                        ? "Great job! You're saving well."
                        : "Try to increase your savings."}
                </p>
            </div>

            <div className="bg-card p-5 hover-lift h-50 rounded-2xl shadow-sm grid content-between">
                <h3 className="text-primary text-xl font-semibold mb-2">
                    Top Spending Categories
                </h3>

                <ul className="space-y-2">
                    {topCategories.map(([cat, amt], index) => (
                        <li key={cat} className="flex justify-between text-sm">
                            <span className="text-secondary text-xl">
                                {index + 1}. {cat}
                            </span>
                            <span className="text-primary font-medium text-xl">
                                ₹{amt}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-card p-5 hover-lift h-50 rounded-2xl shadow-sm h-48">
                <h3 className="text-primary font-semibold mb-2">
                    Monthly Trend
                </h3>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#22c55e"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

export default Insights;