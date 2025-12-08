document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニュー
  const headerToggle = document.querySelector('.header__toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (headerToggle && mobileMenu) {
    headerToggle.addEventListener('click', () => {
      headerToggle.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-open');
      body.classList.toggle('menu-open');
    });

    // モバイルメニューのリンクをクリックしたらメニューを閉じる
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        headerToggle.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        body.classList.remove('menu-open');
      });
    });
  }

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

  // スクロール時のヘッダー処理
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      body.classList.add('is-scrolled');
    } else {
      body.classList.remove('is-scrolled');
    }
  });

  // サービスページのタブ切り替え
  const serviceIntroTabs = document.querySelectorAll('.services-intro__tab');
  const serviceDetailPanels = document.querySelectorAll('.services-detail__panel');
  const serviceEngagementsPanels = document.querySelectorAll('.sevices-engagements__contents');

  // ハッシュとタブの対応マップ
  const hashToTabMap = {
    '#se-service': 'service1',
    '#si-service': 'service2',
    '#fa-service': 'service3'
  };

  // URLパラメータとタブの対応マップ
  const paramToTabMap = {
    'service1': 'service1',
    'service2': 'service2',
    'service3': 'service3'
  };

  // タブを切り替える関数
  function switchTab(targetId) {
    if (!targetId) return;
    
    // すべてのタブから active クラスを削除
    serviceIntroTabs.forEach(t => t.classList.remove('active'));
    
    // 対象のタブに active クラスを追加
    const targetTab = document.querySelector(`.services-intro__tab[data-target="${targetId}"]`);
    if (targetTab) {
      targetTab.classList.add('active');
    }
    
    // サービス詳細パネルの切り替え
    if (serviceDetailPanels.length > 0) {
      serviceDetailPanels.forEach(p => p.classList.remove('active'));
      const targetDetailPanel = document.getElementById(targetId);
      if (targetDetailPanel) {
        targetDetailPanel.classList.add('active');
      }
    }
    
    // プロジェクト実績パネルの切り替え
    if (serviceEngagementsPanels.length > 0) {
      serviceEngagementsPanels.forEach(p => p.classList.remove('active'));
      // service1 → services-engagements1 に変換
      const engagementsId = targetId.replace('service', 'services-engagements');
      const targetEngagementsPanel = document.getElementById(engagementsId);
      if (targetEngagementsPanel) {
        targetEngagementsPanel.classList.add('active');
      }
    }
  }

  // URLパラメータからタブIDを取得
  function getTabIdFromUrl() {
    const hash = window.location.hash;
    
    // ハッシュにパラメータが含まれている場合 (#services-detail?service1)
    if (hash.includes('?')) {
      const param = hash.split('?')[1];
      if (paramToTabMap[param]) {
        return paramToTabMap[param];
      }
    }
    
    // ハッシュのみの場合 (#se-service)
    if (hashToTabMap[hash]) {
      return hashToTabMap[hash];
    }
    
    return null;
  }

  // ページ読み込み時にハッシュをチェック
  function checkHashOnLoad() {
    const targetId = getTabIdFromUrl();
    if (targetId) {
      switchTab(targetId);
      
      // services-detailセクションまでスクロール
      setTimeout(() => {
        const servicesDetailSection = document.getElementById('services-detail');
        if (servicesDetailSection) {
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = servicesDetailSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }

  // ハッシュ変更時の処理
  window.addEventListener('hashchange', () => {
    const targetId = getTabIdFromUrl();
    if (targetId) {
      switchTab(targetId);
    }
  });

  if (serviceIntroTabs.length > 0) {
    // ページ読み込み時にハッシュをチェック
    checkHashOnLoad();
    
    // タブクリック時の処理
    serviceIntroTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        switchTab(targetId);
      });
    });
  }

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
});