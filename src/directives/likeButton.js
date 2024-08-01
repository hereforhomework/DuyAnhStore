export default {
    // This hook is called when the directive is bound to an element
    bind(el, binding, vnode) {
      el.addEventListener('click', () => {
        el.classList.add('liked');
        // Remove the class after a short duration to reset the effect
        setTimeout(() => {
          el.classList.remove('liked');
        }, 500);
      });
    }
  };
