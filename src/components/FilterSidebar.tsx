import React from 'react';
import { Search, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState, CompetitionType } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  competitionTypes: CompetitionType[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  isOpen,
  onClose,
  competitionTypes
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    types: true,
    status: true,
    verification: true,
    sort: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTypeToggle = (typeId: string) => {
    const newTypes = filters.types.includes(typeId)
      ? filters.types.filter(t => t !== typeId)
      : [...filters.types, typeId];
    
    onFiltersChange({ ...filters, types: newTypes });
  };

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    onFiltersChange({ ...filters, status: newStatus });
  };

  const handleVerificationToggle = (method: string) => {
    const newVerification = filters.verification.includes(method)
      ? filters.verification.filter(v => v !== method)
      : [...filters.verification, method];
    
    onFiltersChange({ ...filters, verification: newVerification });
  };

  const statusOptions = ['active', 'upcoming', 'ended', 'disputed'];
  const verificationOptions = ['oracle', 'manual', 'api', 'hybrid'];
  const sortOptions = [
    { value: 'tvl', label: 'Prize Pool' },
    { value: 'time', label: 'Time Remaining' },
    { value: 'participants', label: 'Participants' },
    { value: 'recent', label: 'Recently Created' }
  ];

  const sidebarClasses = `
    fixed lg:relative lg:translate-x-0 top-0 left-0 h-full lg:h-auto
    w-80 lg:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
    transform transition-transform duration-300 ease-in-out z-40
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={sidebarClasses}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filters
              </h2>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search competitions..."
                value={filters.search}
                onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
              />
            </div>
          </div>

          {/* Competition Types */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('types')}
              className="flex items-center justify-between w-full p-2 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <span>Competition Types</span>
              {expandedSections.types ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {expandedSections.types && (
              <div className="mt-2 space-y-2">
                {competitionTypes.map((type) => (
                  <label key={type.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type.id)}
                      onChange={() => handleTypeToggle(type.id)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className={`w-4 h-4 ${type.color} rounded flex-shrink-0`}></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{type.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Prize Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prize Range ($)
            </label>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={filters.prizeRange[1]}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  prizeRange: [filters.prizeRange[0], parseInt(e.target.value)]
                })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>${filters.prizeRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('status')}
              className="flex items-center justify-between w-full p-2 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <span>Status</span>
              {expandedSections.status ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {expandedSections.status && (
              <div className="mt-2 space-y-2">
                {statusOptions.map((status) => (
                  <label key={status} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleStatusToggle(status)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{status}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Verification Methods */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('verification')}
              className="flex items-center justify-between w-full p-2 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
            >
              <span>Verification</span>
              {expandedSections.verification ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            {expandedSections.verification && (
              <div className="mt-2 space-y-2">
                {verificationOptions.map((method) => (
                  <label key={method} className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.verification.includes(method)}
                      onChange={() => handleVerificationToggle(method)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{method}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort by
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value as any })}
              className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;