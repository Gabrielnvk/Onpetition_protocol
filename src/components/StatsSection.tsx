import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Trophy, Users, Activity } from 'lucide-react';
import { ProtocolStats } from '../types';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
          {icon}
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {title}
        </div>
      </div>
      
      {/* Mini trend line */}
      <div className="flex items-end space-x-1 h-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full ${
              isPositive ? 'bg-green-300' : 'bg-red-300'
            }`}
            style={{
              height: `${Math.random() * 20 + 10}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface StatsSectionProps {
  stats: ProtocolStats;
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Value Locked"
        value={stats.tvl}
        change={stats.tvlChange}
        icon={<DollarSign className="w-6 h-6" />}
      />
      <StatCard
        title="Active Competitions"
        value={stats.activeCompetitions.toString()}
        change={stats.competitionsChange}
        icon={<Trophy className="w-6 h-6" />}
      />
      <StatCard
        title="Total Prizes Distributed"
        value={stats.totalPrizes}
        change={stats.prizesChange}
        icon={<Activity className="w-6 h-6" />}
      />
      <StatCard
        title="Participants This Month"
        value={stats.monthlyParticipants.toLocaleString()}
        change={stats.participantsChange}
        icon={<Users className="w-6 h-6" />}
      />
    </div>
  );
};

export default StatsSection;