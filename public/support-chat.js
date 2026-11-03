/* Shared public-site Tawk.to loader. No application/customer identity is sent. */
(function () {
  'use strict';
  var allowedHosts = ['nexdrop.myteknoland.in', 'myteknoland.in', 'www.myteknoland.in'];
  if (allowedHosts.indexOf(window.location.hostname.toLowerCase()) === -1 || /^\/admin(?:\/|$)/.test(window.location.pathname)) return;
  if (window.__myteknolandTawkQueued) return;
  window.__myteknolandTawkQueued = true;

  function loadChat() {
    if (document.getElementById('myteknoland-tawk-widget')) return;
    var api = window.Tawk_API = window.Tawk_API || {};
    var mobileOffset = window.location.hostname.toLowerCase() === 'nexdrop.myteknoland.in' ? 100 : 20;
    api.customStyle = Object.assign({}, api.customStyle, {
      visibility: {
        desktop: { position: 'br', xOffset: 20, yOffset: 20 },
        mobile: { position: 'br', xOffset: 16, yOffset: mobileOffset }
      }
    });
    window.Tawk_LoadStart = new Date();
    var script = document.createElement('script');
    script.id = 'myteknoland-tawk-widget';
    script.async = true;
    script.src = 'https://embed.tawk.to/6ae84677e473053c29f122d7/1k6dl6h3b';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);
  }
  // Keep downloads and contact forms responsive during the initial page load.
  function scheduleChat() {
    if ('requestIdleCallback' in window) window.requestIdleCallback(loadChat, { timeout: 1500 });
    else window.setTimeout(loadChat, 0);
  }
  if (document.readyState === 'complete') scheduleChat();
  else window.addEventListener('load', scheduleChat, { once: true });
})();
