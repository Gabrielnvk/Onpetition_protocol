import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import CompetitionCard from './components/CompetitionCard';
import FilterSidebar from './components/FilterSidebar';
import CreateCompetitionModal from './components/CreateCompetitionModal';
import { Competition, FilterState } from './types';
import { mockCompetitions, protocolStats, competitionTypes } from './data/mockData';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    types: [],
    prizeRange: [0, 100000],
    status: [],
    verification: [],
    sortBy: 'tvl'
  });

  const filteredCompetitions = useMemo(() => {
    let filtered = mockCompetitions.filter(competition => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!competition.title.toLowerCase().includes(searchTerm) &&
            !competition.description.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      // Type filter
      if (filters.types.length > 0) {
        if (!filters.types.includes(competition.type.id)) {
          return false;
        }
      }

      // Prize range filter
      const prizeAmount = parseFloat(competition.prizePool.amount.replace(',', ''));
      if (prizeAmount < filters.prizeRange[0] || prizeAmount > filters.prizeRange[1]) {
        return false;
      }

      // Status filter
      if (filters.status.length > 0) {
        if (!filters.status.includes(competition.status)) {
          return false;
        }
      }

      // Verification filter
      if (filters.verification.length > 0) {
        if (!filters.verification.includes(competition.verificationMethod)) {
          return false;
        }
      }

      return true;
    });

    // Sort competitions
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'tvl':
          return parseFloat(b.prizePool.amount.replace(',', '')) - parseFloat(a.prizePool.amount.replace(',', ''));
        case 'time':
          const aTime = a.timeRemaining.days * 24 + a.timeRemaining.hours;
          const bTime = b.timeRemaining.days * 24 + b.timeRemaining.hours;
          return aTime - bTime;
        case 'participants':
          return b.participants - a.participants;
        case 'recent':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters]);

  const handleJoinCompetition = (id: string) => {
    console.log('Joining competition:', id);
  };

  const handleViewCompetition = (id: string) => {
    console.log('Viewing competition:', id);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            competitionTypes={competitionTypes}
          />
          
          <main className="flex-1 p-6 lg:ml-0">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Competition Dashboard
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Discover and participate in decentralized competitions worldwide
                  </p>
                </div>
                
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Competition</span>
                </button>
              </div>

              {/* Stats Section */}
              <StatsSection stats={protocolStats} />

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Available Competitions ({filteredCompetitions.length})
                </h2>
                
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-700 dark:text-gray-300">Filters</span>
                </button>
              </div>

              {/* Competition Grid */}
              {filteredCompetitions.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Plus className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                    No competitions found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Try adjusting your filters or create the first competition matching your criteria.
                  </p>
                  <button
                    onClick={() => setCreateModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    Create Competition
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCompetitions.map((competition) => (
                    <CompetitionCard
                      key={competition.id}
                      competition={competition}
                      onJoin={handleJoinCompetition}
                      onView={handleViewCompetition}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Create Competition Modal */}
        <CreateCompetitionModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          competitionTypes={competitionTypes}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;