import Turbolinks from 'turbolinks';
import Maechabin from './maechabin';

const allowTurbolinks = true;

if (Turbolinks.supported && allowTurbolinks) {
  let shouldAdSense = true;

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      const sidebar = document.querySelector('.sidebar__author');
      const footer = document.querySelector('.footer');
      [sidebar, footer].forEach((elem) => {
        elem.setAttribute('data-turbolinks-permanent', true);
      });
      Turbolinks.start();
    },
    false,
  );

  document.addEventListener(
    'turbolinks:load',
    () => {
      new Maechabin({
        allowTurbolinks,
      }).init();

      if (shouldAdSense) {
        Maechabin.callAdSense();
        shouldAdSense = false;
      }

      const links = document.querySelectorAll('a');
      const html = document.querySelector('html');
      links.forEach((link) => {
        link.addEventListener(
          'click',
          (event) => {
            if (link.href && link.href.match(/[#]/)) {
              html.setAttribute('style', 'scroll-behavior: smooth;');
              event.target.setAttribute('data-turbolinks', 'false');
            } else {
              html.setAttribute('style', 'scroll-behavior: auto;');
            }
          },
          false,
        );
      });
    },
    false,
  );

  document.addEventListener(
    'turbolinks:before-cache',
    () => {
      //
    },
    false,
  );

  document.addEventListener(
    'turbolinks:before-visit',
    () => {
      window.referrer = window.location.href;
      shouldAdSense = true;
    },
    false,
  );
} else {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      new Maechabin().init();
    },
    false,
  );
}
