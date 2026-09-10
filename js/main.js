/* mohiemen.com
   Two behaviours only: the mobile menu, and the register filter.
   Both degrade to a usable page if this file never loads. */
(function () {
  'use strict';

  // ---- mobile menu ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close on navigation so the panel does not stay open behind the new page
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- register filter ----
  var filters = document.querySelectorAll('.filter');
  var reg = document.getElementById('reg');
  if (filters.length && reg) {
    var rows = reg.querySelectorAll('li');
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var want = btn.getAttribute('data-f');

        filters.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });

        var shown = 0;
        rows.forEach(function (row) {
          var match = want === 'all' || row.getAttribute('data-d') === want;
          row.hidden = !match;
          if (match) shown++;
        });

        // The rail figure is a measurement, so it has to stay true to what is
        // actually on screen rather than keep showing the unfiltered total.
        var railFig = document.querySelector('.rail b');
        if (railFig) railFig.textContent = String(shown);
      });
    });
  }
})();
