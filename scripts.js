/* scripts.js - shared behaviors: year, nav highlight, WA helper
   Dark/light theme support removed per request.
*/
(() => {
  const THEME_KEY = 'swf-theme'; // kept for backward-compat only (unused)

  // set year in any element with id="yr"
  function setYear(){
    const el = document.getElementById('yr');
    if(el) el.textContent = new Date().getFullYear();
  }

  // highlight active nav link based on filename
  function highlightNav(){
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header.site-header .nav a').forEach(a=>{
      try{
        if(a.getAttribute('href') === path) a.classList.add('active');
        else a.classList.remove('active');
      }catch(e){}
    });
  }

  // WhatsApp helper: looks for elements with id "waBtn" or "waButton" or "waFloat"
  // and attaches open behavior using WA_NUMBER if defined on the page (or defaults).
  function wireWhatsApp(){
    const WA_NUMBER = window.SWF_WA_NUMBER || '94701421968';
    const makeUrl = (name, email, msg) => {
      const text = `Name: ${name}%0AEmail: ${email}%0A%0AMessage: ${msg}`;
      return `https://wa.me/${WA_NUMBER}?text=${text}`;
    };

    // handler attaches to elements if they exist on the page
    const handler = (e) => {
      e.preventDefault();
      const name = encodeURIComponent(document.getElementById('name')?.value || '');
      const email = encodeURIComponent(document.getElementById('email')?.value || '');
      const msg = encodeURIComponent(document.getElementById('message')?.value || 'Hello! I would like more info.');
      window.open(makeUrl(name, email, msg), '_blank');
    };

    ['waBtn','waButton','waFloat','waDirect'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.addEventListener('click', handler);
    });
  }

  // init on DOM ready
  document.addEventListener('DOMContentLoaded', function(){
    setYear();
    highlightNav();
    wireWhatsApp();
  });

  // expose small API (no theme functions)
  window.SWF = {
    // kept intentionally empty for theme removal parity
  };
})();
