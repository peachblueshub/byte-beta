    const MAX_VISIBLE = 4;
    const PEEK_Y = 14;
    const SCALE_STEP = 0.04;
    const LOOP = false;
    const FINAL_URL = "./01-licao-02-word-basico.html";

    const stack = document.getElementById('stack');
    const cards = Array.from(stack.querySelectorAll('.card'));
    const nextButtons = stack.querySelectorAll('.next');

    let current = 0;

    function layout(){
      const n = cards.length;
      const visible = Math.min(MAX_VISIBLE, n);
      for (let i = 0; i < n; i++){
        const pos = (i - current + n) % n;
        const el = cards[i];
        if (pos < visible){
          el.style.opacity = 1;
          el.style.zIndex = String(100 - pos);
          const y = pos * PEEK_Y;
          const s = 1 - pos * SCALE_STEP;
          el.style.transform = `translateY(${y}px) scale(${s})`;
          el.classList.toggle('top', pos === 0);
          el.setAttribute('aria-hidden', pos !== 0);
        } else {
          el.style.opacity = 0;
          el.style.zIndex = '0';
          el.style.transform = `translateY(${visible * PEEK_Y}px) scale(${1 - visible * SCALE_STEP})`;
          el.setAttribute('aria-hidden', 'true');
        }
      }
    }

    function atLastCard(){
      return ((current % cards.length) === (cards.length - 1));
    }

    function handleNext(){
      if (!LOOP && atLastCard()){
        const lastEl = cards[(current) % cards.length];
        const url = FINAL_URL || lastEl.dataset.finalUrl;
        if (url){
          window.location.href = url; return;
        }
        return;
      }

      const n = cards.length;
      const topIndex = current % n;
      const top = cards[topIndex];

      top.classList.add('swipe-out');
      const exitDir = (topIndex % 2 === 0) ? 1 : -1;
      top.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1), opacity .45s ease';
      top.style.transform += ` translateX(${exitDir*110}%) rotate(${exitDir*8}deg)`;
      top.style.opacity = '0';

      const others = cards.filter((_, i) => i !== topIndex);
      others.forEach((el) => {
        el.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1), opacity .35s ease';
      });

      const onDone = () => {
        top.removeEventListener('transitionend', onDone);
        top.classList.remove('swipe-out');
        top.style.transition = '';
        others.forEach(el => el.style.transition = '');
        current = (current + 1) % n;
        layout();
      };
      top.addEventListener('transitionend', onDone, { once:true });
    }

    nextButtons.forEach(btn => btn.addEventListener('click', handleNext));
    layout();

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight'){ handleNext(); }
    });