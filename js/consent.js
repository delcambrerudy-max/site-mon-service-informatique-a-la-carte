/* ===========================================================
   Service Informatique à la Carte — Gestion du consentement
   cookies (RGPD / ePrivacy + recommandations CNIL)

   - Bandeau de consentement non intrusif
   - Boutons « Tout accepter » et « Tout refuser » d'égale
     importance (pas de pré-case cochée)
   - Mémorisation du choix 6 mois (renouvellement périodique CNIL)
   - Google Analytics n'est chargé qu'après consentement
   - Possibilité de modifier son choix via le lien « Cookies »
   =========================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "cookieConsent";
  // Durée de validité du consentement : 6 mois (en ms)
  var CONSENT_TTL = 6 * 30 * 24 * 60 * 60 * 1000;
  // Identifiant Google Analytics 4
  var GA_ID = "G-7XDMPH0JBF";

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || typeof data.choice !== "string") return null;
      // Le consentement expiré est considéré comme absent
      if (!data.ts || Date.now() - data.ts > CONSENT_TTL) return null;
      return data.choice === "accepted";
    } catch (e) {
      return null;
    }
  }

  function writeConsent(accepted) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice: accepted ? "accepted" : "refused", ts: Date.now() })
      );
    } catch (e) {
      /* localStorage indisponible : on continue sans mémorisation */
    }
  }

  // Charge Google Analytics uniquement après consentement.
  function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "granted",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500
    });

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);

    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  // Désactive explicitement le stockage Analytics (mode refus).
  function denyAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
  }

  // Crée et insère le bandeau de consentement.
  function showBanner() {
    if (document.getElementById("cookieBanner")) return;

    var banner = document.createElement("div");
    banner.id = "cookieBanner";
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "false");
    banner.setAttribute("aria-label", "Consentement aux cookies");

    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
      '  <div class="cookie-banner__text">' +
      '    <p>' +
      '      Nous utilisons des cookies pour mesurer l\'audience de notre site ' +
      '      (Google Analytics). Ils ne sont déposés qu\'avec votre consentement ' +
      '      et nous n\'utilisons pas de cookies publicitaires. ' +
      '      <a href="mentions-legales.html#cookies">En savoir plus</a>.' +
      '    </p>' +
      '  </div>' +
      '  <div class="cookie-banner__actions">' +
      '    <button type="button" class="cookie-banner__btn cookie-banner__btn--accept" id="cookieAccept">' +
      '      Tout accepter' +
      '    </button>' +
      '    <button type="button" class="cookie-banner__btn cookie-banner__btn--refuse" id="cookieRefuse">' +
      '      Tout refuser' +
      '    </button>' +
      '  </div>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById("cookieAccept").addEventListener("click", function () {
      writeConsent(true);
      hideBanner();
      loadAnalytics();
    });
    document.getElementById("cookieRefuse").addEventListener("click", function () {
      writeConsent(false);
      hideBanner();
      denyAnalytics();
    });
  }

  function hideBanner() {
    var banner = document.getElementById("cookieBanner");
    if (banner) banner.remove();
  }

  // Démarre le système de consentement.
  function init() {
    var consent = readConsent();
    if (consent === true) {
      loadAnalytics();
    } else if (consent === false) {
      denyAnalytics();
    } else {
      // Aucun choix valide : on n'affiche le bandeau qu'après le rendu,
      // sans bloquer la page, et sans déposer de cookie tiers avant la réponse.
      denyAnalytics(); // état par défaut : tout refusé tant que pas de choix
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", showBanner);
      } else {
        showBanner();
      }
    }

    // Lien « Cookies » dans le pied de page pour revoir le bandeau.
    var reopen = document.getElementById("cookieReopen");
    if (reopen) {
      reopen.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner();
      });
    }
  }

  init();
})();
