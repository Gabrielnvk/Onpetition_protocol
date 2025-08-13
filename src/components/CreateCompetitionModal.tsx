import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Check, Calendar, DollarSign, Users, Shield } from 'lucide-react';
import { CompetitionType } from '../types';

interface CreateCompetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  competitionTypes: CompetitionType[];
}

interface CreateCompetitionData {
  name: string;
  description: string;
  type: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  token: string;
  distribution: 'winner-takes-all' | 'split' | 'custom';
  entryFee: string;
  entryFeeEnabled: boolean;
  verificationMethod: 'oracle' | 'manual' | 'api' | 'hybrid';
  disputeWindow: number;
}

const CreateCompetitionModal: React.FC<CreateCompetitionModalProps> = ({
  isOpen,
  onClose,
  competitionTypes
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CreateCompetitionData>({
    name: '',
    description: '',
    type: '',
    startDate: '',
    endDate: '',
    prizePool: '',
    token: 'USDC',
    distribution: 'winner-takes-all',
    entryFee: '',
    entryFeeEnabled: false,
    verificationMethod: 'oracle',
    disputeWindow: 7
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Creating competition:', formData);
    onClose();
    setStep(1);
    setFormData({
      name: '',
      description: '',
      type: '',
      startDate: '',
      endDate: '',
      prizePool: '',
      token: 'USDC',
      distribution: 'winner-takes-all',
      entryFee: '',
      entryFeeEnabled: false,
      verificationMethod: 'oracle',
      disputeWindow: 7
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Competition Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter competition name..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your competition..."
                rows={4}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Competition Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {competitionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFormData({ ...formData, type: type.id })}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      formData.type === type.id
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <div className={`w-8 h-8 ${type.color} rounded-lg mb-2`}></div>
                    <div className="font-medium text-gray-900 dark:text-white">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <DollarSign className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Prize Structure</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prize Pool Amount
                </label>
                <input
                  type="number"
                  value={formData.prizePool}
                  onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                  placeholder="10000"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Token
                </label>
                <select
                  value={formData.token}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="USDC">USDC</option>
                  <option value="ETH">ETH</option>
                  <option value="USDT">USDT</option>
                  <option value="DAI">DAI</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Prize Distribution
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value="winner-takes-all"
                    checked={formData.distribution === 'winner-takes-all'}
                    onChange={(e) => setFormData({ ...formData, distribution: e.target.value as any })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Winner Takes All</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Single winner gets 100% of prize</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value="split"
                    checked={formData.distribution === 'split'}
                    onChange={(e) => setFormData({ ...formData, distribution: e.target.value as any })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Top 3 Split</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">60% / 25% / 15% distribution</div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    value="custom"
                    checked={formData.distribution === 'custom'}
                    onChange={(e) => setFormData({ ...formData, distribution: e.target.value as any })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Custom Distribution</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Configure custom payout structure</div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.entryFeeEnabled}
                  onChange={(e) => setFormData({ ...formData, entryFeeEnabled: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 rounded"
                />
                <span className="font-medium text-gray-900 dark:text-white">Require Entry Fee</span>
              </label>
              
              {formData.entryFeeEnabled && (
                <div className="mt-3">
                  <input
                    type="number"
                    value={formData.entryFee}
                    onChange={(e) => setFormData({ ...formData, entryFee: e.target.value })}
                    placeholder="Entry fee amount"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <Shield className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Verification Method</h3>
            </div>
            
            <div className="space-y-4">
              <div
                onClick={() => setFormData({ ...formData, verificationMethod: 'oracle' })}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.verificationMethod === 'oracle'
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white mb-1">Oracle Verification</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Automated verification through external data feeds</div>
              </div>
              
              <div
                onClick={() => setFormData({ ...formData, verificationMethod: 'manual' })}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.verificationMethod === 'manual'
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white mb-1">Manual Verification</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Human judges review and verify results</div>
              </div>
              
              <div
                onClick={() => setFormData({ ...formData, verificationMethod: 'api' })}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.verificationMethod === 'api'
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white mb-1">API Verification</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Integration with platform APIs for automatic verification</div>
              </div>
              
              <div
                onClick={() => setFormData({ ...formData, verificationMethod: 'hybrid' })}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  formData.verificationMethod === 'hybrid'
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="font-medium text-gray-900 dark:text-white mb-1">Hybrid Verification</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Combination of automated and manual verification</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dispute Window (days)
              </label>
              <input
                type="number"
                value={formData.disputeWindow}
                onChange={(e) => setFormData({ ...formData, disputeWindow: parseInt(e.target.value) })}
                min="1"
                max="30"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Time allowed for participants to dispute results after verification
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
              <Check className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Review & Deploy</h3>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Competition Name</div>
                <div className="text-gray-900 dark:text-white">{formData.name}</div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</div>
                <div className="text-gray-900 dark:text-white">{competitionTypes.find(t => t.id === formData.type)?.name}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Prize Pool</div>
                  <div className="text-gray-900 dark:text-white">{formData.prizePool} {formData.token}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Distribution</div>
                  <div className="text-gray-900 dark:text-white capitalize">{formData.distribution.replace('-', ' ')}</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Verification</div>
                <div className="text-gray-900 dark:text-white capitalize">{formData.verificationMethod}</div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Estimated Gas Fees</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">~0.02 ETH</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Create Competition
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Step {step} of 4
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="px-6 py-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                step === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {step < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-200"
              >
                <Check className="w-4 h-4" />
                <span>Deploy Competition</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompetitionModal;