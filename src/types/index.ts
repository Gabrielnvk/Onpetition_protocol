export interface Competition {
  id: string;
  title: string;
  description: string;
  type: CompetitionType;
  prizePool: {
    amount: string;
    token: string;
    symbol: string;
  };
  participants: number;
  maxParticipants?: number;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
  };
  status: 'active' | 'upcoming' | 'ended' | 'disputed';
  verificationMethod: 'oracle' | 'manual' | 'api' | 'hybrid';
  entryFee?: {
    amount: string;
    token: string;
  };
  creator: string;
  startDate: string;
  endDate: string;
}

export interface CompetitionType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ProtocolStats {
  tvl: string;
  activeCompetitions: number;
  totalPrizes: string;
  monthlyParticipants: number;
  tvlChange: number;
  competitionsChange: number;
  prizesChange: number;
  participantsChange: number;
}

export interface FilterState {
  search: string;
  types: string[];
  prizeRange: [number, number];
  status: string[];
  verification: string[];
  sortBy: 'tvl' | 'time' | 'participants' | 'recent';
}