# UK Heat Pump Cost Calculator

Calculate the real cost of switching from a gas boiler to a heat pump in the UK — including grants, running costs, and payback period.

## 🌡️ Why This Exists

The UK government offers [£7,500 towards a heat pump](https://greatbritishenergy.com/boiler-upgrade-scheme/) through the Boiler Upgrade Scheme. But is it actually worth switching? This calculator helps you find out using your actual energy usage.

## 🧮 Quick Start

```bash
npx uk-heat-pump-calc --gas-usage 12000 --tariff standard
```

Output:
```
┌─────────────────────────────────────────────┐
│ Heat Pump vs Gas Boiler — Annual Comparison │
├─────────────────────────────────────────────┤
│ Gas boiler annual cost:     £906            │
│ Heat pump annual cost:      £840            │
│ Heat pump (smart tariff):   £549            │
│                                             │
│ Installation cost:          £12,000         │
│ After BUS grant (£7,500):   £4,500          │
│ Payback (standard tariff):  56 years        │
│ Payback (smart tariff):     12.6 years      │
│ Payback (with solar):       7.5 years       │
│                                             │
│ 🟢 Recommended: Switch with smart tariff    │
└─────────────────────────────────────────────┘
```

## 📊 How It Works

### Inputs

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--gas-usage` | 12,000 kWh | Annual gas consumption for heating |
| `--gas-price` | 6.1p/kWh | Gas unit rate ([Ofgem Q1 2026](https://www.ofgem.gov.uk/)) |
| `--elec-price` | 24.5p/kWh | Electricity unit rate |
| `--hp-tariff` | 16p/kWh | Heat pump tariff rate (Octopus Cosy, etc.) |
| `--cop` | 3.5 | Heat pump Coefficient of Performance |
| `--boiler-eff` | 0.92 | Gas boiler efficiency |
| `--install-cost` | £12,000 | Heat pump installation cost |
| `--grant` | £7,500 | [BUS grant amount](https://greatbritishenergy.com/boiler-upgrade-scheme/) |
| `--solar-kwh` | 0 | Annual solar generation (kWh) |

### Calculation

```
Gas annual cost = (gas_usage / boiler_eff) × gas_price + standing_charge
HP annual cost  = (gas_usage / COP) × elec_price + standing_charge
Payback years   = (install_cost - grant) / (gas_cost - hp_cost)
```

## 💰 Available Grants

### [Boiler Upgrade Scheme](https://greatbritishenergy.com/boiler-upgrade-scheme/) — £7,500
- Any homeowner in England or Wales
- No income test or benefits required
- MCS-certified installer applies on your behalf
- Covers air source and ground source heat pumps

### [ECO4 Scheme](https://greatbritishenergy.com/eco4-scheme/) — Fully Funded
- If you receive qualifying benefits AND have an EPC D-G home
- Heat pump installation can be **completely free**
- Also covers insulation, which improves heat pump efficiency

### [Great British Insulation Scheme](https://greatbritishenergy.com/gbis/) — Free Insulation
- Get your home insulated first (improves heat pump performance)
- Council tax bands A-D, no benefits needed
- **Closing March 2026**

**Check all grants:** [Great British Energy Eligibility Checker](https://greatbritishenergy.com/eligibility-checker/)

## 📈 Typical Results by Home Type

| Home Type | Gas Usage | HP Cost (after grant) | Annual Saving (smart tariff) | Payback |
|-----------|-----------|---------------------|---------------------------|---------|
| 2-bed flat | 8,000 kWh | £3,500 | £190 | 18 years |
| 3-bed semi | 12,000 kWh | £4,500 | £357 | 12.6 years |
| 4-bed detached | 18,000 kWh | £6,000 | £535 | 11.2 years |
| 5-bed detached | 25,000 kWh | £7,500 | £744 | 10.1 years |

> Larger homes benefit more. Adding [solar panels](https://greatbritishenergy.com/solar-panel-grants/) cuts payback by 30-40%.

## 🔋 Adding Solar

If you have or plan to install solar panels, include the generation:

```bash
npx uk-heat-pump-calc --gas-usage 12000 --solar-kwh 3500
```

Solar panels generate free electricity that your heat pump uses directly, dramatically reducing running costs. See the [Great British Energy solar guide](https://greatbritishenergy.com/solar-panel-grants/) for costs and incentives.

## Resources

- [Boiler Upgrade Scheme details](https://greatbritishenergy.com/boiler-upgrade-scheme/)
- [Heat pump vs gas boiler comparison](https://greatbritishenergy.com/blog/heat-pump-vs-gas-boiler/)
- [ECO4 scheme — free heat pumps](https://greatbritishenergy.com/eco4-scheme/)
- [Solar panel grants](https://greatbritishenergy.com/solar-panel-grants/)
- [Full grant eligibility checker](https://greatbritishenergy.com/eligibility-checker/)
- [MCS certified installer directory](https://mcscertified.com/)
- [Ofgem energy price cap](https://www.ofgem.gov.uk/)

## License

MIT

---

*Helping UK homeowners make informed decisions about heating. Data sourced from Ofgem, MCS, and [Great British Energy](https://greatbritishenergy.com/).*
