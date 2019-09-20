const predictions = [
  {
    category: 'First Tier',
    totalSpending: '$100,000+',
    totalSpendingConfidence: '0.8',
    totalContracts: '100+',
    totalContractConfidence: '0.9',
    numContractsPerMonth: 80,
    firstContract: '2 days'
  },
  {
    category: 'First Tier',
    totalSpending: '$100,000+',
    totalSpendingConfidence: '0.5',
    totalContracts: '100+',
    totalContractConfidence: '0.4',
    numContractsPerMonth: 15,
    firstContract: '3 days'
  },
  {
    category: 'Second Tier',
    totalSpending: '$10,000-100,000',
    totalSpendingConfidence: '0.5',
    totalContracts: '10+',
    totalContractConfidence: '0.1',
    numContractsPerMonth: 8,
    firstContract: '8 days'
  },
  {
    category: 'Second Tier',
    totalSpending: '$10,000-100,000',
    totalSpendingConfidence: '0.2',
    totalContracts: '10+',
    totalContractConfidence: '0.2',
    numContractsPerMonth: 6,
    firstContract: '8 weeks'
  },
  {
    category: 'Unlikely Conversion',
    totalSpending: 0,
    totalSpendingConfidence: '0.8',
    totalContracts: 0,
    totalContractConfidence: '0.8',
    numContractsPerMonth: 0,
    firstContract: 'Unlikely'
  }
]

export default predictions;
