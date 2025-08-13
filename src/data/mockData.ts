import { Competition, ProtocolStats, CompetitionType } from '../types';

export const competitionTypes: CompetitionType[] = [
  { id: 'esports', name: 'Esports', icon: 'gamepad', color: 'bg-purple-500' },
  { id: 'hackathon', name: 'Hackathon', icon: 'code', color: 'bg-blue-500' },
  { id: 'creative', name: 'Creative', icon: 'palette', color: 'bg-pink-500' },
  { id: 'sports', name: 'Sports', icon: 'trophy', color: 'bg-green-500' },
  { id: 'trading', name: 'Trading', icon: 'trending-up', color: 'bg-yellow-500' },
  { id: 'defi', name: 'DeFi', icon: 'coins', color: 'bg-indigo-500' },
];

export const protocolStats: ProtocolStats = {
  tvl: '$2.4M',
  activeCompetitions: 127,
  totalPrizes: '$850K',
  monthlyParticipants: 12847,
  tvlChange: 12.5,
  competitionsChange: 8.3,
  prizesChange: 15.2,
  participantsChange: 22.1,
};

export const mockCompetitions: Competition[] = [
  {
    id: '1',
    title: 'Global Esports Championship 2024',
    description: 'The biggest esports tournament of the year featuring top teams from around the world competing in multiple game titles.',
    type: competitionTypes[0],
    prizePool: {
      amount: '50,000',
      token: 'USDC',
      symbol: 'USDC'
    },
    participants: 1247,
    maxParticipants: 2000,
    timeRemaining: {
      days: 15,
      hours: 6,
      minutes: 32
    },
    status: 'active',
    verificationMethod: 'oracle',
    entryFee: {
      amount: '25',
      token: 'USDC'
    },
    creator: '0x1234...abcd',
    startDate: '2024-01-15T10:00:00Z',
    endDate: '2024-02-15T20:00:00Z'
  },
  {
    id: '2',
    title: 'DeFi Innovation Hackathon',
    description: 'Build the next generation of decentralized finance protocols. Open to developers worldwide.',
    type: competitionTypes[1],
    prizePool: {
      amount: '25,000',
      token: 'ETH',
      symbol: 'ETH'
    },
    participants: 523,
    timeRemaining: {
      days: 8,
      hours: 14,
      minutes: 18
    },
    status: 'active',
    verificationMethod: 'manual',
    creator: '0x5678...efgh',
    startDate: '2024-01-20T00:00:00Z',
    endDate: '2024-02-10T23:59:59Z'
  },
  {
    id: '3',
    title: 'NFT Art Contest - Digital Renaissance',
    description: 'Showcase your artistic talent in the digital realm. Create stunning NFT artwork with innovative themes.',
    type: competitionTypes[2],
    prizePool: {
      amount: '10,000',
      token: 'USDC',
      symbol: 'USDC'
    },
    participants: 847,
    timeRemaining: {
      days: 2,
      hours: 11,
      minutes: 45
    },
    status: 'active',
    verificationMethod: 'hybrid',
    creator: '0x9abc...ijkl',
    startDate: '2024-01-10T12:00:00Z',
    endDate: '2024-01-30T12:00:00Z'
  },
  {
    id: '4',
    title: 'Crypto Trading Championship',
    description: 'Prove your trading skills in this high-stakes competition. Best performers over 30 days win.',
    type: competitionTypes[4],
    prizePool: {
      amount: '75,000',
      token: 'USDT',
      symbol: 'USDT'
    },
    participants: 2156,
    maxParticipants: 5000,
    timeRemaining: {
      days: 23,
      hours: 8,
      minutes: 12
    },
    status: 'active',
    verificationMethod: 'api',
    entryFee: {
      amount: '100',
      token: 'USDT'
    },
    creator: '0xdef0...mnop',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-31T23:59:59Z'
  },
  {
    id: '5',
    title: 'Web3 Gaming Tournament',
    description: 'Battle it out in the latest blockchain games. Multiple game modes and epic rewards await.',
    type: competitionTypes[0],
    prizePool: {
      amount: '15,000',
      token: 'USDC',
      symbol: 'USDC'
    },
    participants: 634,
    timeRemaining: {
      days: 0,
      hours: 0,
      minutes: 0
    },
    status: 'ended',
    verificationMethod: 'oracle',
    creator: '0x1111...2222',
    startDate: '2024-01-01T10:00:00Z',
    endDate: '2024-01-15T20:00:00Z'
  },
  {
    id: '6',
    title: 'Yield Farming Strategy Contest',
    description: 'Design and implement the most profitable yield farming strategies across multiple DeFi protocols.',
    type: competitionTypes[5],
    prizePool: {
      amount: '30,000',
      token: 'DAI',
      symbol: 'DAI'
    },
    participants: 0,
    timeRemaining: {
      days: 45,
      hours: 12,
      minutes: 30
    },
    status: 'upcoming',
    verificationMethod: 'hybrid',
    entryFee: {
      amount: '50',
      token: 'DAI'
    },
    creator: '0x3333...4444',
    startDate: '2024-02-15T00:00:00Z',
    endDate: '2024-03-15T23:59:59Z'
  },
  {
    id: '7',
    title: 'Marathon Virtual Race Series',
    description: 'Global virtual marathon with real-time tracking and leaderboards. Run from anywhere in the world.',
    type: competitionTypes[3],
    prizePool: {
      amount: '8,000',
      token: 'USDC',
      symbol: 'USDC'
    },
    participants: 1523,
    timeRemaining: {
      days: 12,
      hours: 16,
      minutes: 42
    },
    status: 'active',
    verificationMethod: 'api',
    entryFee: {
      amount: '10',
      token: 'USDC'
    },
    creator: '0x5555...6666',
    startDate: '2024-01-18T06:00:00Z',
    endDate: '2024-02-18T18:00:00Z'
  },
  {
    id: '8',
    title: 'Smart Contract Security Audit',
    description: 'Find vulnerabilities in smart contracts and help make DeFi more secure. Bug bounty style competition.',
    type: competitionTypes[1],
    prizePool: {
      amount: '40,000',
      token: 'ETH',
      symbol: 'ETH'
    },
    participants: 234,
    timeRemaining: {
      days: 0,
      hours: 0,
      minutes: 0
    },
    status: 'disputed',
    verificationMethod: 'manual',
    creator: '0x7777...8888',
    startDate: '2024-01-05T00:00:00Z',
    endDate: '2024-01-25T23:59:59Z'
  }
];