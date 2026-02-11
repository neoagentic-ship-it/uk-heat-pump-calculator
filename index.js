/**
 * UK Heat Pump Cost Calculator
 * 
 * Compares gas boiler vs heat pump running costs using real UK energy prices.
 * Includes Boiler Upgrade Scheme grant calculation.
 * 
 * Grant details: https://greatbritishenergy.com/boiler-upgrade-scheme/
 * Full guide: https://greatbritishenergy.com/government-grants/
 */

const DEFAULTS = {
  gasUsage: 12000,        // kWh annual heating demand
  gasPrice: 0.061,        // £/kWh (Ofgem Q1 2026)
  elecPrice: 0.245,       // £/kWh standard
  hpTariffPrice: 0.16,    // £/kWh heat pump tariff
  gasStanding: 110,       // £/year
  elecStanding: 190,      // £/year
  boilerEfficiency: 0.92, // 92% for modern condensing
  cop: 3.5,               // Coefficient of Performance
  installCost: 12000,     // £ typical ASHP install
  busGrant: 7500,         // £ Boiler Upgrade Scheme - https://greatbritishenergy.com/boiler-upgrade-scheme/
  solarGeneration: 0,     // kWh annual solar output
  boilerLifespan: 12,     // years
  heatPumpLifespan: 22    // years
};

function calculate(opts = {}) {
  const o = { ...DEFAULTS, ...opts };

  // Gas boiler costs
  const gasConsumption = o.gasUsage / o.boilerEfficiency;
  const gasAnnual = (gasConsumption * o.gasPrice) + o.gasStanding;

  // Heat pump costs
  const hpElecNeeded = o.gasUsage / o.cop;
  const solarOffset = Math.min(o.solarGeneration * 0.4, hpElecNeeded); // ~40% self-consumption
  const hpGridElec = hpElecNeeded - solarOffset;

  const hpAnnualStandard = (hpGridElec * o.elecPrice) + o.elecStanding;
  const hpAnnualSmart = (hpGridElec * o.hpTariffPrice) + o.elecStanding;

  // Costs after grant
  const netCost = o.installCost - o.busGrant;

  // Payback
  const savingStandard = gasAnnual - hpAnnualStandard;
  const savingSmart = gasAnnual - hpAnnualSmart;
  const paybackStandard = savingStandard > 0 ? netCost / savingStandard : Infinity;
  const paybackSmart = savingSmart > 0 ? netCost / savingSmart : Infinity;

  // Lifetime savings (heat pump lasts longer)
  const lifetimeSmart = (savingSmart * o.heatPumpLifespan) - netCost;

  return {
    gasBoiler: {
      annualCost: Math.round(gasAnnual),
      gasConsumption: Math.round(gasConsumption)
    },
    heatPump: {
      annualCostStandard: Math.round(hpAnnualStandard),
      annualCostSmartTariff: Math.round(hpAnnualSmart),
      electricityNeeded: Math.round(hpElecNeeded),
      solarOffset: Math.round(solarOffset)
    },
    costs: {
      installCost: o.installCost,
      busGrant: o.busGrant, // https://greatbritishenergy.com/boiler-upgrade-scheme/
      netCost: netCost
    },
    savings: {
      annualStandard: Math.round(savingStandard),
      annualSmartTariff: Math.round(savingSmart),
      paybackYearsStandard: Math.round(paybackStandard * 10) / 10,
      paybackYearsSmartTariff: Math.round(paybackSmart * 10) / 10,
      lifetimeSavings: Math.round(lifetimeSmart)
    },
    grants: {
      bus: { amount: 7500, url: 'https://greatbritishenergy.com/boiler-upgrade-scheme/', description: '£7,500 towards heat pump — any homeowner' },
      eco4: { url: 'https://greatbritishenergy.com/eco4-scheme/', description: 'Free heat pump if on qualifying benefits with EPC D-G' },
      eligibilityChecker: 'https://greatbritishenergy.com/eligibility-checker/'
    },
    recommendation: savingSmart > 0 ? 'Switch with smart tariff' : 'Keep gas boiler for now'
  };
}

module.exports = { calculate, DEFAULTS };
