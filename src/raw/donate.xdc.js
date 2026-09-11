
const ONCE = [1000, 500, 250, 100, 75, 50, 25];
const MONTHLY = [100, 50, 40, 25, 20, 15, 10];

class Component extends DCLogic {
  state = {monthly: false, amount: 100, custom: false, customValue: ''};

  componentDidUpdate(prev) {
    if (prev && this.state.monthly !== prev.monthly) return;
  }

  renderVals() {
    const {monthly, amount, custom, customValue} = this.state;
    const list = monthly ? MONTHLY : ONCE;
    const fmt = (n) => '$' + n.toLocaleString('en-US');

    const tiers = list.map(n => {
      const on = !custom && n === amount;
      return {label: fmt(n), bg: on ? '#ffffff' : 'transparent', fg: on ? '#3a5f8f' : '#ffffff', bd: on ? '#ffffff' : 'rgba(255,255,255,.7)',
        onClick: () => this.setState({amount: n, custom: false})};
    });
    tiers.push({label: 'Other', bg: custom ? '#ffffff' : 'transparent', fg: custom ? '#3a5f8f' : '#ffffff', bd: custom ? '#ffffff' : 'rgba(255,255,255,.7)',
      onClick: () => this.setState({custom: true})});

    const parsed = parseInt(String(customValue).replace(/[^0-9]/g, ''), 10);
    const active = custom ? (isNaN(parsed) ? null : parsed) : amount;

    const impact = 'Help make prevention part of everyday life.';

    const label = active === null ? '' : ' ' + fmt(active);
    return {
      tiers,
      custom,
      customValue,
      onCustom: (e) => this.setState({customValue: e.target.value}),
      impact,
      cta: monthly ? ('Give' + label + ' monthly') : ('Donate' + label),
      onceBg: monthly ? 'transparent' : '#ffffff',
      onceFg: monthly ? '#ffffff' : '#3a5f8f',
      monthlyBg: monthly ? '#ffffff' : 'transparent',
      monthlyFg: monthly ? '#3a5f8f' : '#ffffff',
      setOnce: () => this.setState({monthly: false, amount: 100, custom: false}),
      setMonthly: () => this.setState({monthly: true, amount: 25, custom: false})
    };
  }
}

