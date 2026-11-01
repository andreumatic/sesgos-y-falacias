/* Sesgos y Falacias · capa de mejoras
   - enlaces directos a cada concepto (#sesgo-x / #falacia-x) + enlaces permanentes
   - búsqueda global mediante ?q=
   - progreso guardado en localStorage (checklist, analizador, modo estudio, test)
   - botón para reiniciar el progreso
*/
(function () {
  'use strict';

  var KEY = 'sf:v1';
  var store = {
    read: function () {
      try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; }
    },
    write: function (patch) {
      try {
        var data = store.read();
        for (var k in patch) data[k] = patch[k];
        localStorage.setItem(KEY, JSON.stringify(data));
      } catch (e) {}
    },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} }
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function saveChecked(sel, name) {
    return function () {
      var ids = $$(sel).filter(function (el) { return el.getAttribute('aria-checked') === 'true'; })
        .map(function (el) { return el.dataset.i; });
      var patch = {}; patch[name] = ids; store.write(patch);
    };
  }

  /* ---------- 1. progreso guardado ---------- */
  function restoreProgress() {
    var saved = store.read();

    if (saved.study) {
      var toggle = $('#studyToggle');
      if (toggle && !document.body.classList.contains('study-mode')) toggle.click();
    }

    ['checklist', 'analyzer'].forEach(function (name) {
      var sel = name === 'checklist' ? '.check-item' : '.analyzer-item';
      (saved[name] || []).forEach(function (i) {
        var el = document.querySelector(sel + '[data-i="' + i + '"]');
        if (el && el.getAttribute('aria-checked') !== 'true') el.click();
      });
    });

    if (saved.test) {
      var btn = document.querySelector('.test-btn[data-test="' + saved.test + '"]');
      if (btn && !btn.classList.contains('active')) btn.click();
    }
  }

  // guardar al marcar (en captura, antes de que el handler propio cambie el DOM)
  document.addEventListener('click', function (e) {
    var row = e.target.closest && e.target.closest('.check-item, .analyzer-item');
    if (row) setTimeout(function () {
      saveChecked('.check-item', 'checklist')();
      saveChecked('.analyzer-item', 'analyzer')();
    }, 0);
    var tab = e.target.closest && e.target.closest('.test-btn');
    if (tab) store.write({ test: tab.dataset.test });
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var row = e.target.closest && e.target.closest('.check-item, .analyzer-item');
    if (row) setTimeout(function () {
      saveChecked('.check-item', 'checklist')();
      saveChecked('.analyzer-item', 'analyzer')();
    }, 0);
  }, true);

  var studyToggle = $('#studyToggle');
  if (studyToggle) studyToggle.addEventListener('click', function () {
    store.write({ study: document.body.classList.contains('study-mode') });
  });

  /* ---------- 2. enlaces por concepto ---------- */
  function cardFromHash(hash) {
    if (!hash || hash.length < 2) return null;
    var el = document.getElementById(hash.slice(1));
    return el && el.classList.contains('card') ? el : null;
  }

  function openCard(card, focus, updateUrl) {
    if (!card) return;
    if (!card.classList.contains('expanded')) card.click();
    var panel = card.querySelector('.card-expand');
    if (panel) panel.setAttribute('aria-hidden', 'false');
    if (updateUrl && history.replaceState) history.replaceState(null, '', '#' + card.id);
    if (focus) {
      card.setAttribute('tabindex', '-1');
      card.focus({ preventScroll: true });
    }
    var head = document.querySelector('.site-header');
    var offset = (head ? head.getBoundingClientRect().height : 0) + 18;
    var top = card.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'auto' });
  }


  /* ---------- 3. búsqueda global ?q= ---------- */
  function globalSearch() {
    var q = new URLSearchParams(location.search).get('q');
    if (!q) return;
    ['searchSesgos', 'searchFalacias'].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.value = q;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    var det = document.getElementById('searchDetector');
    if (det) { det.value = q; det.dispatchEvent(new Event('input', { bubbles: true })); }
    var main = document.getElementById('sesgos');
    if (main) {
      var head = document.querySelector('.site-header');
      var offset = (head ? head.getBoundingClientRect().height : 0) + 18;
      window.scrollTo({ top: main.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'auto' });
    }
  }

  // reflejar la búsqueda en la URL (sin recargar)
  ['searchSesgos', 'searchFalacias', 'searchDetector'].forEach(function (id) {
    var input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('input', function () {
      var url = new URL(location.href);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim());
      else url.searchParams.delete('q');
      if (history.replaceState) history.replaceState(null, '', url.pathname + (url.search || '') + url.hash);
    });
  });

  /* ---------- 4. reiniciar progreso ---------- */
  function addResetButton() {
    var host = document.querySelector('.check-progress');
    if (!host || host.querySelector('.reset-progress')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'reset-progress';
    btn.textContent = 'Reiniciar progreso';
    btn.addEventListener('click', function () {
      store.clear();
      $$('.check-item, .analyzer-item').forEach(function (el) {
        if (el.getAttribute('aria-checked') === 'true') el.click();
      });
      if (document.body.classList.contains('study-mode')) $('#studyToggle').click();
      btn.textContent = 'Progreso borrado ✓';
      setTimeout(function () { btn.textContent = 'Reiniciar progreso'; }, 2000);
    });
    host.appendChild(btn);
  }

  /* ---------- arranque ---------- */
  function start() {
    addResetButton();
  initContact();
    restoreProgress();
    globalSearch();

    var card = cardFromHash(location.hash);
    if (card) setTimeout(function () { openCard(card, true, false); }, 60);

    window.addEventListener('hashchange', function () {
      var c = cardFromHash(location.hash);
      if (c) openCard(c, true, false);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();


  /* 5. Formulario de contacto (Turnstile + Pages Function) */
  function initContact() {
    var form = $('#cf');
    if (!form) return;
    var status = $('#cfStatus');
    var btn = form.querySelector('.cf-btn');
    var area = $('#cf-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = (area.value || '').trim();
      if (msg.length < 10) {
        status.className = 'cf-status err';
        status.textContent = 'Escribe al menos 10 caracteres.';
        area.focus();
        return;
      }
      var token = (form.querySelector('[name="cf-turnstile-response"]') || {}).value || '';
      btn.disabled = true;
      status.className = 'cf-status';
      status.textContent = 'Enviando…';
      fetch('/api/contacto', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ mensaje: msg, token: token, empresa: (form.empresa || {}).value || '' })
      }).then(function (r) { return r.json().catch(function () { return { ok: false, error: 'red' }; }); })
        .then(function (res) {
          if (res.ok) {
            status.className = 'cf-status ok';
            status.textContent = 'Mensaje enviado. Te contesto en breve.';
            form.reset();
            if (window.turnstile) window.turnstile.reset();
          } else if (res.error === 'no-provider') {
            status.className = 'cf-status err';
            var link = document.createElement('a');
            link.href = 'mailto:info@andreumatic.com?subject=Sesgos%20y%20falacias&body=' + encodeURIComponent(msg);
            link.textContent = 'abrir tu correo';
            status.textContent = 'El envío directo aún no está activo. ';
            status.appendChild(link);
            status.appendChild(document.createTextNode('.'));
          } else if (res.error === 'captcha') {
            status.className = 'cf-status err';
            status.textContent = 'No se pudo verificar que no eres un bot. Recarga la página e inténtalo de nuevo.';
          } else {
            status.className = 'cf-status err';
            status.textContent = 'No se pudo enviar. Escríbeme a info@andreumatic.com.';
          }
        })
        .catch(function () {
          status.className = 'cf-status err';
          status.textContent = 'Fallo de red. Escríbeme a info@andreumatic.com.';
        })
        .then(function () { btn.disabled = false; });
    });
  }
