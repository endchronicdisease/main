
class Component extends DCLogic {
  montageRef = React.createRef();

  componentDidMount() {
    // Every slide and dot shares one 90s cycle, each owning its own window via
    // @keyframes. Seeking the whole group by currentTime keeps them in lockstep,
    // so a dot click and the random opening slide use the same mechanism.
    const el = this.montageRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const dots = [...el.querySelectorAll('span')].filter(
        (s) => /ecdDot/.test(s.style.animationName || '')
      );
      if (!dots.length) return;
      this._count = dots.length;
      this._anims = el
        .getAnimations({ subtree: true })
        .filter((a) => /ecdSlide|ecdDot/.test(a.animationName || ''));
      dots.forEach((dot, i) => {
        const go = (e) => { e.preventDefault(); this.seek(i); };
        dot.addEventListener('click', go);
        dot.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') go(e);
        });
      });
      this.seek(Math.floor(Math.random() * dots.length));
    });
  }

  seek(index) {
    if (!this._anims || !this._count) return;
    const t = index * (90000 / this._count);
    this._anims.forEach((a) => { try { a.currentTime = t; } catch (err) {} });
  }

  renderVals() {
    const media = this.props.heroMedia ?? 'montage';
    const bands = {
      white: { bg: '#ffffff', fg: '#757575', sub: '#757575', btn: '#6FA4E2', btnFg: '#ffffff' },
      stone: { bg: '#E6E2DA', fg: '#757575', sub: '#757575', btn: '#67A081', btnFg: '#ffffff' },
      blue:  { bg: '#67A081', fg: '#ffffff', sub: 'rgba(255,255,255,.94)', btn: '#ffffff', btnFg: '#67A081' },
      green: { bg: '#67A081', fg: '#ffffff', sub: 'rgba(255,255,255,.94)', btn: '#ffffff', btnFg: '#67A081' }
    };
    const b = bands[this.props.closingBand] || bands.white;
    return {
      montageRef: this.montageRef,
      montage: media === 'montage',
      still: media !== 'montage',
      showStats: this.props.showStats ?? true,
      ctaBg: b.bg, ctaFg: b.fg, ctaSub: b.sub, ctaBtn: b.btn, ctaBtnFg: b.btnFg
    };
  }
}

