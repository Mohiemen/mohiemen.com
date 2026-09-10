document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
  }

  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Project register filter
  var chips = document.querySelectorAll('.chip');
  var rows = document.querySelectorAll('.proj-row[data-tags]');
  if (chips.length && rows.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        var filter = chip.getAttribute('data-filter');
        rows.forEach(function (row) {
          var tags = row.getAttribute('data-tags') || '';
          row.style.display = (filter === 'all' || tags.indexOf(filter) !== -1) ? '' : 'none';
        });
      });
    });
  }

  // Click-to-copy email
  document.querySelectorAll('.copy-email').forEach(function (el) {
    el.addEventListener('click', function () {
      var email = el.getAttribute('data-email') || el.textContent.trim();
      navigator.clipboard.writeText(email).then(function () {
        var fb = el.parentElement.querySelector('.copy-feedback');
        if (fb) {
          fb.classList.add('show');
          setTimeout(function () { fb.classList.remove('show'); }, 1600);
        }
      });
    });
  });

  // Contact form: mailto fallback (static site, no backend)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message').value.trim();
      var subject = encodeURIComponent('Website inquiry from ' + (name || 'website visitor'));
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:hi@mohiemen.com?subject=' + subject + '&body=' + body;
    });
  }
});
