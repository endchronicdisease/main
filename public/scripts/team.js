(function () {
  var opener = null;

  function closeAll() {
    var wasOpen = document.querySelector('[data-ecd-modal]:not([hidden])');
    document.querySelectorAll('[data-ecd-modal]').forEach(function (m) { m.hidden = true; });
    document.body.style.overflow = '';
    if (wasOpen && opener) opener.focus();
    opener = null;
  }

  document.querySelectorAll('[data-ecd-open]').forEach(function (btn) {
    btn.setAttribute('aria-haspopup', 'dialog');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAll();
      var id = btn.getAttribute('data-ecd-open');
      var modal = document.querySelector('[data-ecd-modal="' + id + '"]');
      if (!modal) return;
      opener = btn;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      modal.tabIndex = -1;
      modal.style.outline = 'none';
      modal.focus({ preventScroll: true });
    });
  });
  document.querySelectorAll('[data-ecd-close]').forEach(function (el) {
    el.addEventListener('click', function () { closeAll(); });
  });
  document.querySelectorAll('[data-ecd-stop]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.stopPropagation(); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
})();
