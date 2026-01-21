document.addEventListener('DOMContentLoaded', () => {
  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // メニューが開いていたら閉じる
        if (headerToggle && mobileMenu && body.classList.contains('menu-open')) {
          headerToggle.classList.remove('is-active');
          mobileMenu.classList.remove('is-open');
          body.classList.remove('menu-open');
        }
      }
    });
  });


  // フェードインアニメーション
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length > 0) {
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1
    });

    fadeElements.forEach(element => {
      fadeInObserver.observe(element);
    });
  }

  // fix-bottomのフェードアウト制御
  const fixBottom = document.querySelector('.fix-bottom');
  const birthForm = document.querySelector('#birth-form');
  
  if (fixBottom && birthForm) {
    const fixBottomObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // #birth-formが表示されたら.fix-bottomを非表示
          fixBottom.classList.add('is-hidden');
        } else {
          // #birth-formが表示されなくなったら.fix-bottomを表示
          fixBottom.classList.remove('is-hidden');
        }
      });
    }, {
      // 画面下部から10%の位置で検知
      rootMargin: '0px 0px -10% 0px',
      threshold: 0
    });

    fixBottomObserver.observe(birthForm);
  }
});