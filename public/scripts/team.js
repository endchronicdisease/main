(function () {
  function closeAll() {
    document.querySelectorAll('[data-ecd-modal]').forEach(function (m) { m.hidden = true; });
    document.body.style.overflow = '';
  }
  document.querySelectorAll('[data-ecd-open]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeAll();
      var id = btn.getAttribute('data-ecd-open');
      var modal = document.querySelector('[data-ecd-modal="' + id + '"]');
      if (modal) { modal.hidden = false; document.body.style.overflow = 'hidden'; }
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
