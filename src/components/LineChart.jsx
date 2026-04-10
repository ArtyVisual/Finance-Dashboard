import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", income: 12000, expense: 7000 },
  { month: "Feb", income: 22000, expense: 11000 },
  { month: "Mar", income: 25000, expense: 13000 },
  { month: "Apr", income: 24000, expense: 17000 },
  { month: "May", income: 26000, expense: 20000 },
];

const LineChartComponent = () => {
  return (
    <div className="bg-card sm:p-5 p-3 rounded-2xl shadow-sm h-80 pb-10 hover-lift">
      <h2 className="text-primary mb-4 font-semibold">
        Income vs Expenses
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="gray" />
          <YAxis stroke="gray" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;