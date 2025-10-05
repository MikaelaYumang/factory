export const calculateEfficiency = (machine) => {
  const totalResource = machine.energyUsage + machine.waterUsage;
  return (machine.outputUnits / totalResource).toFixed(2);
};