import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Food", value: 4000 },
  { name: "Travel", value: 3000 },
  { name: "Bills", value: 5000 },
  { name: "Shopping", value: 2000 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

const DonutChart = () => {
  return (
    <div className="bg-card p-5 rounded-2xl shadow-sm h-80 hover-lift">
      <h2 className="text-primary font-semibold">
        Spending Breakdown
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;