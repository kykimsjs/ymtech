/**
 * YM INNOTECH & MODIQ Official Homepage Main Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Sticky Navigation on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // 3. MODIQ Category Filter Tabs
  const tabButtons = document.querySelectorAll('.modiq-tab-btn');
  const moduleCards = document.querySelectorAll('.module-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      moduleCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. MODIQ Product Specification Modal Data
  const modalData = {
    'modiq-power-100': {
      name: 'MODIQ-P100 Smart BMS Module',
      category: 'Power Management // 배터리 전원 모듈',
      desc: '첨단 지능형 배터리 관리 시스템(BMS)이 통합된 고효율 전력 제어 모듈입니다. 다중 보호 회로와 자가진단 알고리즘이 내장되어 최상의 에너지 효율과 안정성을 보장합니다.',
      specs: [
        { key: '입력 정격 전압', val: 'DC 24V ~ 48V (Wide Range)' },
        { key: '최대 변환 효율', val: '99.4% (Ultra-Low Loss)' },
        { key: '동작 온도 범위', val: '-30℃ ~ +85℃' },
        { key: '통신 프로토콜', val: 'CAN 2.0B / RS-485 / Modbus' },
        { key: '보호 규격', val: '과전류/과전압/단락/과열 6중 안전차단' },
        { key: '인증 표준', val: 'KC, CE, UL94 V-0 난연 인증' }
      ]
    },
    'modiq-iot-300': {
      name: 'MODIQ-C300 IoT Mesh Controller',
      category: 'Smart Control // 지능형 제어 모듈',
      desc: '고속 듀얼 코어 프로세서와 스마트 센서 허브를 결합한 산업용 IoT 제어 모듈입니다. 복잡한 센서 데이터 실시간 연산 및 무선 메쉬 네트워크를 완벽 지원합니다.',
      specs: [
        { key: '프로세서 코어', val: 'Dual-Core ARM Cortex-M4 @ 160MHz' },
        { key: '무선 연결성', val: 'BLE 5.2 / Zigbee 3.0 / Sub-1GHz Mesh' },
        { key: '입출력 채널', val: 'Digital I/O 16ch, Analog Input 8ch (16-bit)' },
        { key: '응답 지연시간', val: '< 1.8ms (초저지연 Real-time 통신)' },
        { key: '내환경성', val: 'IP67 방수방진 & 서지 보호 6kV' },
        { key: '인증 표준', val: 'KC 적합인증, FCC, RoHS' }
      ]
    },
    'modiq-eco-500': {
      name: 'MODIQ-E500 Eco Integrated Solution',
      category: 'Eco Architecture // 친환경 복합 모듈',
      desc: '친환경 저탄소 부품 설계 기준을 충족하는 복합 에너지 하베스팅 및 분산 제어 모듈입니다. 대기 전력을 0.05W 이하로 억제하여 지속 가능한 설계를 구현합니다.',
      specs: [
        { key: '대기 전력 소비', val: '< 0.05W (Eco Standby Mode)' },
        { key: '재활용 원자재율', val: '88.5% 친환경 재생 복합소재 적용' },
        { key: '전력 하베스팅', val: '태양광/진동 에너지 하베스팅 컨버터 내장' },
        { key: '내구 수명 (MTBF)', val: '100,000 시간 이상 무고장 동작' },
        { key: '환경 규제 준수', val: 'EU RoHS / REACH 친환경 공정' },
        { key: '적용 분야', val: '스마트 시티, 친환경 이동수단, 에너지 솔루션' }
      ]
    }
  };

  const modalBackdrop = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalName = document.getElementById('modal-product-name');
  const modalCat = document.getElementById('modal-product-category');
  const modalDesc = document.getElementById('modal-product-desc');
  const modalSpecs = document.getElementById('modal-product-specs');
  const btnDownloadDatasheet = document.getElementById('btn-download-datasheet');

  document.querySelectorAll('.btn-module-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const data = modalData[id];
      if (data) {
        modalName.textContent = data.name;
        modalCat.textContent = data.category;
        modalDesc.textContent = data.desc;

        modalSpecs.innerHTML = '';
        data.specs.forEach(s => {
          const row = document.createElement('div');
          row.className = 'module-spec-item';
          row.innerHTML = `<span>${s.key}</span><span>${s.val}</span>`;
          modalSpecs.appendChild(row);
        });

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (typeof lucide !== 'undefined') {
          lucide.createIcons({ root: modalBackdrop });
        }
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  if (btnDownloadDatasheet) {
    btnDownloadDatasheet.addEventListener('click', () => {
      showToast('국/영문 기술 사양서(Datasheet PDF) 다운로드가 준비되었습니다.', '#0072CE', 'file-text');
    });
  }

  // 5. KPI Count-Up Animation
  const kpiCounters = document.querySelectorAll('.kpi-counter');
  let counterAnimated = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated) {
        counterAnimated = true;
        kpiCounters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const steps = 60;
          const stepTime = duration / steps;
          let current = 0;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const kpiSection = document.querySelector('.kpi-counter-grid');
  if (kpiSection) {
    countUpObserver.observe(kpiSection);
  }

  // 6. Interactive Contact Form Submission & Toast
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('모든 필수 항목을 올바르게 입력해 주세요.', '#EF4444', 'alert-circle');
        return;
      }

      // Success
      contactForm.reset();
      showToast('문의가 성공적으로 접수되었습니다. 와이엠이노텍 담당자가 신속히 답변드리겠습니다.', '#10B981', 'check-circle-2');
    });
  }

  // 7. Toast Notification Helper
  function showToast(msg, bg = '#10B981', icon = 'check-circle-2') {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.style.background = bg;
    toast.innerHTML = `<i data-lucide="${icon}" style="width:18px;height:18px;"></i> <span>${msg}</span>`;
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ root: toast });
    }
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // 8. Multi-Language Switcher (KR / EN)
  const langKr = document.getElementById('lang-kr');
  const langEn = document.getElementById('lang-en');

  const translations = {
    kr: {
      navCompany: '기업소개',
      navCiBi: 'CI/BI 스토리',
      navModiq: 'MODIQ 솔루션',
      navTech: '핵심기술 & R&D',
      navContact: '제휴 및 문의',
      heroTag: '첨단 스마트 모듈 & 신뢰의 엔지니어링',
      heroTitle: '모듈러 혁신으로<br><span class="gradient-text">미래 기술을 연결합니다</span>',
      heroDesc: '(주)와이엠이노텍은 우수하고 똑똑한 기술력과 친환경 기술을 바탕으로 혁신적인 스마트 모듈 솔루션 MODIQ을 선도합니다.'
    },
    en: {
      navCompany: 'About Us',
      navCiBi: 'CI / BI Story',
      navModiq: 'MODIQ Solutions',
      navTech: 'Technology & R&D',
      navContact: 'Contact Us',
      heroTag: 'Advanced Smart Module & Engineering Excellence',
      heroTitle: 'Connecting Future Tech with<br><span class="gradient-text">Modular Innovation</span>',
      heroDesc: 'YM INNOTECH leads next-generation smart module technology with intelligent engineering, eco-friendly efficiency, and uncompromised quality.'
    }
  };

  if (langKr && langEn) {
    langKr.addEventListener('click', () => {
      langKr.classList.add('active');
      langEn.classList.remove('active');
      applyLanguage('kr');
    });

    langEn.addEventListener('click', () => {
      langEn.classList.add('active');
      langKr.classList.remove('active');
      applyLanguage('en');
    });
  }

  function applyLanguage(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  // 9. Global ESC Key Listener for modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalBackdrop && modalBackdrop.classList.contains('active')) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});
