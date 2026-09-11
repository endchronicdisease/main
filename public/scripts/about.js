(function () {
  requestAnimationFrame(function () {
    document.querySelectorAll('.ecd-ribbons svg').forEach(function (svg) {
      try { svg.setCurrentTime(0); } catch (e) {}
      svg.querySelectorAll('animate').forEach(function (a) { try { a.beginElement(); } catch (e) {} });
      try { svg.unpauseAnimations(); } catch (e) {}
    });
  });
})();
