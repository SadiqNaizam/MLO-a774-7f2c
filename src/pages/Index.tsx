import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import MetricCardsGrid from '../components/Dashboard/MetricCardsGrid';
import LineChartSection from '../components/Dashboard/LineChartSection';
import BarChartSection from '../components/Dashboard/BarChartSection';
import TrafficSources from '../components/Dashboard/TrafficSources';
import ClientRespondCard from '../components/Dashboard/ClientRespondCard';
import UserRatingTable from '../components/Dashboard/UserRatingTable';
import RecentActivityFeed from '../components/Dashboard/RecentActivityFeed';
import PieChartSection from '../components/Dashboard/PieChartSection';

// The main dashboard page, orchestrating various data visualization components
// to provide an overview of key metrics and activities.
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* Row 1: Key performance indicators displayed as metric cards */}
      <MetricCardsGrid />

      {/* Row 2: Sales overview visualized with a line chart */}
      <LineChartSection />

      {/* Row 3: Performance metrics over time shown in a bar chart */}
      <BarChartSection />

      {/* Row 4: A two-column layout for traffic sources and client response data */}
      {/* On smaller screens (lg and below), these will stack vertically */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficSources />
        <ClientRespondCard />
      </div>

      {/* Row 5: A two-column layout for user ratings and recent activity feed */}
      {/* On smaller screens (lg and below), these will stack vertically */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserRatingTable />
        <RecentActivityFeed />
      </div>
      
      {/* Row 6: Standalone pie chart section, for example, displaying client demographics */}
      {/* This component takes full width in the current column flow */}
      <PieChartSection />
    </MainAppLayout>
  );
};

export default DashboardPage;
