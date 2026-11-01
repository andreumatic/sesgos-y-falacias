/* i18n de la pàgina «Més enllà dels biaixos» */
(function () {
  'use strict';
  var LANG = 'es';
  var DICT = null;

  function dict() {
    if (DICT) return DICT;
    DICT = {};
    if (window.VA_MAS && window.VA_MAS.TXT) DICT = VA_MAS.TXT;
    return DICT;
  }

  function translateValue(v) {
    if (!v) return null;
    var key = v.trim();
    if (!key) return null;
    var d = dict();
    if (d[key]) return v.replace(key, d[key]);
    return null;
  }

  var obs = null, pending = false;

  function translateTree(root) {
    if (!root) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode && n.parentNode.nodeName;
        if (p === 'SCRIPT' || p === 'STYLE' || p === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) {
      var out = translateValue(n.nodeValue);
      if (out !== null) n.nodeValue = out;
    }
    if (root.nodeType === 1) {
      var ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
      function fix(el) {
        ATTRS.forEach(function (a) {
          var v = el.getAttribute && el.getAttribute(a);
          var o = translateValue(v);
          if (o !== null) el.setAttribute(a, o);
        });
      }
      fix(root);
      root.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(fix);
    }
  }

  function startObserver() {
    if (obs) return;
    obs = new MutationObserver(function (muts) {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        muts.forEach(function (m) {
          if (m.type === 'characterData') {
            var o = translateValue(m.target.nodeValue);
            if (o !== null) m.target.nodeValue = o;
          } else {
            m.addedNodes.forEach(function (nd) {
              if (nd.nodeType === 1) translateTree(nd);
            });
          }
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  window.SF_MAS = {
    lang: function () { return LANG; },
    wire: function (active) {
      document.querySelectorAll('.lang-btn').forEach(function (b) {
        var on = b.getAttribute('data-lang') === (active || LANG);
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.addEventListener('click', function () {
          try { localStorage.setItem('sf:lang', b.getAttribute('data-lang')); } catch (e) {}
          var u = new URL(location.href);
          u.searchParams.set('lang', b.getAttribute('data-lang'));
          location.href = u.toString();
        });
      });
    },
    apply: function () {
      LANG = 'va';
      document.documentElement.lang = 'va';
      document.title = `Més enllà dels biaixos · Constel·lacions Temàtiques | AndreuMatic`;
      var d = document.querySelector('meta[name="description"]');
      if (d) d.setAttribute('content', `Cinc constel·lacions temàtiques, 20+ temes i 18 fonts acadèmiques sobre desinformació, algorismes, IA, tribalisme, epistemologia i manipulació emocional.`);
      translateTree(document.body);
      startObserver();
    }
  };
})();
