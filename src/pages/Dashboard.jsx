import DonutChart from "../components/DonutChart";
import LineChartComponent from "../components/LineChart";
import StatCard from "../components/StateCard";
import TransactionTable from "../components/TransactionTable";

const Dashboard = ({ role }) => {

  return (
    <>
      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Balance"
          amount="₹45,200"
          change={8.2}
          isPositive={true}
        />
        <StatCard
          title="Income"
          amount="₹25,000"
          change={5.1}
          isPositive={true}
        />
        <StatCard
          title="Expenses"
          amount="₹12,300"
          change={-3.4}
          isPositive={false}
        />
        <StatCard
          title="Savings Rate"
          amount="32%"
          change={2.1}
          isPositive={true}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <LineChartComponent />
        <DonutChart />
      </div>

      {/* Transactions */}
      <TransactionTable role={role} limit={5} />

    </>
  );
};

export default Dashboard;