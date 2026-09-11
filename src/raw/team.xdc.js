
class Component extends DCLogic {
  state = { open: null };

  componentDidMount() {
    this._key = (e) => { if (e.key === 'Escape') this.setState({ open: null }); };
    document.addEventListener('keydown', this._key);
  }
  componentWillUnmount() { document.removeEventListener('keydown', this._key); }

  renderVals() {
    const ids = ["kelly","nora","kara","tara","justin","nicolas","hyman","beal","lyon","palmer","altmann","teresa","ramstetter"];
    const vals = {
      close: () => this.setState({ open: null }),
      stop: (e) => { if (e && e.stopPropagation) e.stopPropagation(); }
    };
    ids.forEach((id) => {
      vals['open_' + id] = (e) => { if (e && e.stopPropagation) e.stopPropagation(); this.setState({ open: id }); };
      vals['show_' + id] = this.state.open === id;
    });
    return vals;
  }
}

