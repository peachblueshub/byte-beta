  // ------- Options -------
    const MAX_VISIBLE = 4;      // how many layers to render nicely
    const PEEK_Y = 14;          // px vertical offset between cards
    const SCALE_STEP = 0.04;    // scale change per layer
    const LOOP = false;          // true → cycles forever, false → stops on last (or redirects)
    const FINAL_URL = "./01-licao-02-word-basico.html";     // e.g. "lesson-2.html"; overrides data-final-url if set

    const stack = document.getElementById('stack');
    const cards = Array.from(stack.querySelectorAll('.card'));
    const nextButtons = stack.querySelectorAll('.next');
    const progressEl = document.getElementById('progress');
    const resetBtn = document.getElementById('reset');

    let current = 0; // index of the top card

    function layout(){
      const n = cards.length;
      const visible = Math.min(MAX_VISIBLE, n);
      for (let i = 0; i < n; i++){
        const pos = (i - current + n) % n; // 0 is top
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
      updateProgress();
    }

    function updateProgress(){
      const step = (current % cards.length) + 1;
      const pct = (step / cards.length) * 100;
      progressEl.style.width = pct + '%';
    }

    function atLastCard(){
      return ((current % cards.length) === (cards.length - 1));
    }

    function handleNext(){
      // If not looping and we're at the last card, either redirect or do nothing
      if (!LOOP && atLastCard()){
        const lastEl = cards[(current) % cards.length];
        const url = FINAL_URL || lastEl.dataset.finalUrl;
        if (url){
          window.location.href = url; return;
        }
        return; // simply stop
      }

      const n = cards.length;
      const topIndex = current % n;
      const top = cards[topIndex];

      // Animate the top card out
      top.classList.add('swipe-out');
      // Choose an exit direction based on parity for variety
      const exitDir = (topIndex % 2 === 0) ? 1 : -1; // 1 → right, -1 → left
      top.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1), opacity .45s ease';
      top.style.transform += ` translateX(${exitDir*110}%) rotate(${exitDir*8}deg)`;
      top.style.opacity = '0';

      // While top leaves, the rest elevate slightly
      const others = cards.filter((_, i) => i !== topIndex);
      others.forEach((el) => {
        el.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1), opacity .35s ease';
      });

      // After animation finishes, advance the index and relayout
      const onDone = () => {
        top.removeEventListener('transitionend', onDone);
        top.classList.remove('swipe-out');
        // Reset inline transition for future animations
        top.style.transition = '';
        others.forEach(el => el.style.transition = '');
        current = (current + 1) % n;
        layout();
      };
      top.addEventListener('transitionend', onDone, { once:true });
    }

    // Wire buttons
    nextButtons.forEach(btn => btn.addEventListener('click', handleNext));
    resetBtn.addEventListener('click', () => { current = 0; layout(); });

    // First paint
    layout();

    // Optional: keyboard support (Enter / ArrowRight)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'ArrowRight'){ handleNext(); }
    });