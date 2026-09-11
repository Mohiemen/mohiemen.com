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

  // ---- dyehouse water band ----
  // Water per lot = fabric kg x liquor ratio. That is the whole formula, and
  // it is deliberately the whole formula: the point of this band is that the
  // visitor can check it, not that they trust a claim. 1:5 is the reference
  // because it is a realistic low-liquor machine, not a best case.
  var kg = document.getElementById('kg');
  if (kg) {
    var lr = document.getElementById('lr');
    var lots = document.getElementById('lots');
    var REF = 5;            // reference liquor ratio
    var DAYS = 292;         // working days per year
    var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };

    var render = function () {
      var f = Number(kg.value), r = Number(lr.value), l = Number(lots.value);
      var now = f * r;
      var ref = f * REF;
      var yearM3 = (now * l * DAYS) / 1000;

      document.getElementById('kg-v').textContent = fmt(f);
      document.getElementById('lr-v').textContent = r;
      document.getElementById('lr-a').textContent = r;
      document.getElementById('lots-v').textContent = l;

      document.getElementById('out-lot').textContent = fmt(now);
      document.getElementById('v-now').textContent = fmt(now);
      document.getElementById('v-ref').textContent = fmt(ref);
      document.getElementById('v-yr').textContent = fmt(yearM3);

      // Bars are scaled against the larger of the two so the comparison is
      // honest at every ratio, including when the user goes below 1:5.
      var max = Math.max(now, ref);
      document.getElementById('bar-now').style.width = (now / max * 100) + '%';
      document.getElementById('bar-ref').style.width = (ref / max * 100) + '%';
      // No bar for the annual figure: it is m3 across every lot of the year,
      // not litres of one lot, so drawing it beside the two lot bars would
      // invite a comparison that is not true.

      var diff = now - ref;
      var v = document.getElementById('verdict');
      if (diff > 0) {
        v.innerHTML = 'Water per lot is fabric weight multiplied by the liquor ratio. Nothing more. ' +
          'Dropping this lot from 1:' + r + ' to 1:' + REF + ' takes <span class="delta">' +
          fmt(diff) + ' litres</span> out of every batch, and the heat that went with it: ' +
          '<span class="delta">' + fmt(diff * l * DAYS / 1000) + ' m&sup3;</span> a year at ' + l +
          ' lots a day.';
      } else if (diff === 0) {
        v.innerHTML = 'You are already at 1:' + REF + '. From here the water comes out of the process, not the ratio: shorter rinses, reused bath, right first time.';
      } else {
        v.innerHTML = 'At 1:' + r + ' you are below the 1:' + REF + ' reference, which is where low-liquor machines earn their cost. The remaining savings live in right-first-time, not in the bath.';
      }
    };

    [kg, lr, lots].forEach(function (el) { el.addEventListener('input', render); });
    render();
  }
})();
