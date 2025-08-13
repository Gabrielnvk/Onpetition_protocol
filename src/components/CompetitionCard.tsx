import React from 'react';
import { Clock, Users, Shield, Eye, Plus, Trophy, Gamepad2, Code, Palette, Zap } from 'lucide-react';
import { Competition } from '../types';

interface CompetitionCardProps {
  competition: Competition;
  onJoin: (id: string) => void;
  onView: (id: string) => void;
}

const getTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'esports':
      return <Gamepad2 className="w-4 h-4" />;
    case 'hackathon':
      return <Code className="w-4 h-4" />;
    case 'creative':
      return <Palette className="w-4 h-4" />;
    case 'sports':
      return <Trophy className="w-4 h-4" />;
    default:
      return <Zap className="w-4 h-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'esports':
      return 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300';
    case 'hackathon':
      return 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300';
    case 'creative':
      return 'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300';
    case 'sports':
      return 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300';
    default:
      return 'bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300';
    case 'upcoming':
      return 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300';
    case 'ended':
      return 'bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300';
    case 'disputed':
      return 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300';
    default:
      return 'bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300';
  }
};

const getVerificationColor = (method: string) => {
  switch (method) {
    case 'oracle':
      return 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    case 'manual':
      return 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    case 'api':
      return 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    case 'hybrid':
      return 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
    default:
      return 'bg-gray-50 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
  }
};

const CompetitionCard: React.FC<CompetitionCardProps> = ({ competition, onJoin, onView }) => {
  const canJoin = competition.status === 'active' || competition.status === 'upcoming';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header with badges */}
      <div className="flex items-center justify-between mb-4">
        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 ${getTypeColor(competition.type.name)}`}>
          {getTypeIcon(competition.type.name)}
          <span>{competition.type.name}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(competition.status)}`}>
          {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
        </div>
      </div>

      {/* Title and description */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {competition.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {competition.description}
        </p>
      </div>

      {/* Prize and stats */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">$</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {competition.prizePool.amount} {competition.prizePool.symbol}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{competition.participants.toLocaleString()} participants</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>
              {competition.timeRemaining.days}d {competition.timeRemaining.hours}h remaining
            </span>
          </div>
        </div>
      </div>

      {/* Verification method */}
      <div className="mb-6">
        <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium ${getVerificationColor(competition.verificationMethod)}`}>
          <Shield className="w-4 h-4" />
          <span>Verification: {competition.verificationMethod.charAt(0).toUpperCase() + competition.verificationMethod.slice(1)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-3">
        <button
          onClick={() => onView(competition.id)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
        
        {canJoin && (
          <button
            onClick={() => onJoin(competition.id)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Join Now</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CompetitionCard;