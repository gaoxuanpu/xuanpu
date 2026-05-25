document.addEventListener('DOMContentLoaded', () => {

    // ===================== 全局导航 =====================
    const exploreBtn    = document.getElementById('exploreBtn');
    const exploreModal  = document.getElementById('exploreModal');
    const navStartup    = document.getElementById('navStartup');
    const nextBtn       = document.getElementById('nextBtn');

    exploreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        exploreModal.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!exploreModal.classList.contains('hidden') &&
            !exploreModal.contains(e.target) && e.target !== exploreBtn) {
            exploreModal.classList.add('hidden');
        }
    });

    // 实时时间
    const timeEl = document.getElementById('liveTime');
    if (timeEl) {
        const tick = () => timeEl.textContent = new Date().toLocaleTimeString('en-US',
            { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' });
        tick(); setInterval(tick, 1000);
    }

    // ===================== 导航跳转 =====================
    const scrollToPage2 = () => document.getElementById('page2').scrollIntoView({ behavior: 'smooth' });
    if (navStartup) navStartup.addEventListener('click', scrollToPage2);
    if (nextBtn)    nextBtn.addEventListener('click', scrollToPage2);

    // ===================== 第一页蹦出动效（页面加载时）=====================
    // btn-capsule-outline 和 bottom-right-star 用 CSS animation (pop-in) 自动播放
    // 绿宝石用 CSS float 动画自动播放

    // ===================== 第二页进场动效（滚动触发）=====================
    const animateItems = document.querySelectorAll('#page2 .animate-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('popped');
        });
    }, { threshold: 0.12 });
    animateItems.forEach(el => observer.observe(el));

    // ===================== 弹窗统一管理 =====================
    const openModal  = m => m && m.classList.remove('hidden');
    const closeModal = m => m && m.classList.add('hidden');

    const modalMap = [
        { open: 'btnAigc',    close: 'closeAigcBtn',    modal: 'aigcModal' },
        { open: 'btnProduct', close: 'closeProductBtn', modal: 'productModal' },
        { open: 'btnMarket',  close: 'closeMarketBtn',  modal: 'marketModal' },
        { open: 'btnData', close: 'closeDataBtn', modal: 'dataModal' },
    ];

    modalMap.forEach(({ open, close, modal }) => {
        const openBtn  = document.getElementById(open);
        const closeBtn = document.getElementById(close);
        const modalEl  = document.getElementById(modal);
        if (openBtn)  openBtn.addEventListener('click',  e => { e.stopPropagation(); openModal(modalEl); });
        if (closeBtn) closeBtn.addEventListener('click', e => { e.stopPropagation(); closeModal(modalEl); });
        if (modalEl)  modalEl.addEventListener('click',  e => { if (e.target === modalEl) closeModal(modalEl); });
    });

    // ===================== 产品弹窗轮播 =====================
    const slideCurrent    = document.getElementById('slideCurrent');
    const slideTitle      = document.getElementById('slideTitle');
    const slideDesc       = document.getElementById('slideDesc');
    const slidePrev       = document.getElementById('slidePrev');
    const slideNext       = document.getElementById('slideNext');
    const steps           = document.querySelectorAll('.stepper-bar .step');
    const carouselHeroImg = document.querySelector('.carousel-hero-img');
    const featureGrid     = document.querySelector('.feature-grid');
    const slideTagsRow    = document.getElementById('slideTagsRow');
    let currentSlide = 1;

    const slidesData = [
        {
            num: "01", title: "前期调研",
            subtitle: "洞察市场与用户需求，明确产品方向与机会点，为研发提供策略依据。",
            image: "strawberry.png",
            tags: ["市场调研", "用户洞察", "竞品分析", "方向确定"],
            features: [
                { icon: "👁️", title: "竞品洞察",  desc: "校内外 10+ 品牌<br>产品对比分析" },
                { icon: "📊", title: "口味趋势",  desc: "酸奶系 / 果感 / 冰沙<br>热门风味洞察" },
                { icon: "👤", title: "用户画像",  desc: "学生 / 白领 / 健身党<br>细分需求" },
                { icon: "🏷️", title: "价格带分析", desc: "主流价格区间<br>与购买力评估" }
            ],
            stepLabels: ["前期调研", "产品研发", "供应链优化", "外部与定价", "上线复盘"]
        },
        {
            num: "02", title: "产品研发",
            subtitle: "多轮试饮与配方迭代，打磨酸奶冰沙系列。",
            image: "s3.png",
            tags: ["配方测试", "口感优化", "多轮试饮", "风味调整"],
            features: [
                { icon: "⚗️", title: "配方试错", desc: "一遍遍测试酸奶、<br>果泥与冰沙比例" },
                { icon: "🫖", title: "口感优化", desc: "反复调整甜度、<br>稠度与风味层次" },
                { icon: "👥", title: "内部试饮", desc: "记录反馈，筛选更<br>受欢迎的口味方向" },
                { icon: "✅", title: "研发落地", desc: "让口味、颜值与出品<br>稳定性同时兼顾" }
            ],
            stepLabels: ["试配", "调整", "试饮", "定稿", "上线"]
        },
        {
            num: "03", title: "供应链优化",
            subtitle: "通过多方比价、原料筛选与保质期管理，支撑酸奶冰沙系列稳定上新。",
            image: "s2.png",
            tags: ["多方比价", "成本控制", "库存管理", "上新支持"],
            features: [
                { icon: "🛒", title: "多方比价", desc: "对比拼多多、淘宝及<br>其他供应商，选高性价比渠道" },
                { icon: "🔍", title: "原料筛选", desc: "聚焦酸奶、水果、配料<br>及长保/短保原料" },
                { icon: "📦", title: "库存与保质期", desc: "跟踪数量、保质期与<br>补货节奏，降低损耗" },
                { icon: "🗓️", title: "上新落地", desc: "从候选品类到合理成本<br>支撑酸奶冰沙系列高效上新" }
            ],
            stepLabels: ["选品", "比价", "试用", "定供", "复盘"]
        },
        {
            num: "04", title: "外观设计与定价",
            subtitle: "为酸奶系列定制高透杯型，让产品层次更可见，也让新品更有系列感。",
            image: "s1.JPG",
            tags: ["高透杯身", "层次可见", "新品专属", "16元定价"],
            features: [
                { icon: "🥤", title: "高透杯设计", desc: "为酸奶系列单独设计<br>高透杯身，让层次更直观" },
                { icon: "👁️", title: "出品外观优化", desc: "调透明度、刻度线、Logo<br>强化新鲜浓郁的真实感" },
                { icon: "🏷️", title: "多家比价与定价", desc: "综合杯子成本与<br>校园价格带，定价 16 元" },
                { icon: "✅", title: "定价确认", desc: "多轮试杯+多家比价<br>最终确认 16 元定价" }
            ],
            stepLabels: ["试杯", "调整", "比价", "定价", "落地"]
        },
        {
            num: "05", title: "数据复盘",
            subtitle: "上线两个月后，以真实销量验证酸奶系列上新的有效性。",
            image: "s2.png",
            tags: ["销量验证", "用户接受度", "迭代空间", "经营闭环"],
            features: [
                { icon: "📊", title: "40%+ 收入占比", desc: "新品收入占<br>总体收入 40%+" },
                { icon: "👑", title: "5/7 上榜", desc: "饮品销量榜前 7 中<br>酸奶占 5 席" },
                { icon: "📅", title: "2 Months 观察", desc: "上新观察周期<br>足以验证产品方向" },
                { icon: "🌱", title: "持续迭代", desc: "可继续优化爆款留存<br>口味更新与季节限定" }
            ],
            stepLabels: ["上线", "追踪", "复盘", "迭代", "沉淀"]
        }
    ];

    if (carouselHeroImg) {
        carouselHeroImg.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    }

    const updateSlide = () => {
        const data = slidesData[currentSlide - 1];
        slideCurrent.textContent = '0' + currentSlide;

        // 标题描述淡换
        [slideTitle, slideDesc].forEach(el => { el.style.transition = 'opacity 0.2s'; el.style.opacity = '0'; });
        setTimeout(() => {
            slideTitle.innerHTML  = `<span>${data.num}</span> ${data.title}`;
            slideDesc.textContent = data.subtitle;
            [slideTitle, slideDesc].forEach(el => el.style.opacity = '1');
        }, 150);

        // 大图
        if (carouselHeroImg) {
            carouselHeroImg.style.opacity = '0';
            carouselHeroImg.style.transform = 'scale(0.96)';
            setTimeout(() => {
                carouselHeroImg.src = data.image;
                carouselHeroImg.style.opacity = '1';
                carouselHeroImg.style.transform = 'scale(1)';
            }, 200);
        }

        // 标签
        if (slideTagsRow) slideTagsRow.innerHTML = data.tags.map(t => `<span class="slide-tag">${t}</span>`).join('');

        // 四格
        if (featureGrid) {
            featureGrid.style.transition = 'opacity 0.2s';
            featureGrid.style.opacity = '0';
            setTimeout(() => {
                featureGrid.innerHTML = data.features.map(f =>
                    `<div class="feature-box"><span class="f-icon">${f.icon}</span><div class="f-text"><strong>${f.title}</strong><span>${f.desc}</span></div></div>`
                ).join('');
                featureGrid.style.opacity = '1';
            }, 150);
        }

        // 进度条
        steps.forEach((step, i) => {
            const label = data.stepLabels[i] || '';
            const sp = step.querySelector('span');
            if (sp) sp.textContent = '0' + (i + 1);
            step.childNodes.forEach(n => { if (n.nodeType === Node.TEXT_NODE) n.textContent = label; });
            step.classList.toggle('active', i + 1 === currentSlide);
        });
    };

    if (slidePrev) slidePrev.addEventListener('click', () => { currentSlide = currentSlide > 1 ? currentSlide - 1 : 5; updateSlide(); });
    if (slideNext) slideNext.addEventListener('click', () => { currentSlide = currentSlide < 5 ? currentSlide + 1 : 1; updateSlide(); });

    // ===================== 悬停切换右下角白框 =====================
    const cardAigc    = document.querySelector('.info-card:not(.info-card-product):not(.info-card-market)');
    const cardProduct = document.querySelector('.info-card-product');
    const cardMarket  = document.querySelector('.info-card-market');

    const hoverMap = [
        { btn: document.getElementById('btnAigc'),    show: cardAigc },
        { btn: document.getElementById('btnProduct'), show: cardProduct },
        { btn: document.getElementById('btnMarket'),  show: cardMarket },
    ];

    const showCard = (target) => {
        [cardAigc, cardProduct, cardMarket].forEach(c => {
            if (c) c.classList.toggle('hidden', c !== target);
        });
    };

    hoverMap.forEach(({ btn, show }) => {
        if (btn && show) {
            btn.addEventListener('mouseenter', () => showCard(show));
        }
    });
    // ===================== Page3 欧莱雅卡片轮播 =====================
    const lorealCards = document.querySelectorAll('.loreal-card');
    const lorealPrev  = document.getElementById('lorealPrev');
    const lorealNext  = document.getElementById('lorealNext');
    let lorealCurrent = 0;
    const states = ['active', 'behind-1', 'behind-2', 'behind-3'];

    const updateLorealStack = () => {
        lorealCards.forEach((card, i) => {
            const stateIndex = (i - lorealCurrent + 4) % 4;
            card.setAttribute('data-state', states[stateIndex]);
        });
    };

    if (lorealCards.length) {
        updateLorealStack();
        if (lorealNext) lorealNext.addEventListener('click', () => {
            lorealCurrent = (lorealCurrent + 1) % 4;
            updateLorealStack();
        });
        if (lorealPrev) lorealPrev.addEventListener('click', () => {
            lorealCurrent = (lorealCurrent - 1 + 4) % 4;
            updateLorealStack();
        });
    }

    // 导航栏「项目经历」跳转 page3
    const navProject = document.getElementById('navProject');
    if (navProject) navProject.addEventListener('click', () => {
        document.getElementById('page3').scrollIntoView({ behavior: 'smooth' });
    
    });
    // ===================== 全站文字弹出入场动画 =====================
    const revealSelectors = [
        '.lc-title',
        '.lc-desc',
        '.lc-module',
    ];

    revealSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            if (el.closest('#page-transition')) return;
            if (el.closest('.loreal-card')) return;
            const wrap = document.createElement('div');
            wrap.classList.add('reveal-wrap');
            el.parentNode.insertBefore(wrap, el);
            wrap.appendChild(el);
            el.classList.add('reveal-text');
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
    }, { threshold: 0.15 });

    let revealIdx = 0;
    document.querySelectorAll('.reveal-text').forEach(el => {
        el.style.transitionDelay = (revealIdx % 4 * 0.1) + 's';
        revealIdx++;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => el.classList.add('revealed'), 400 + revealIdx * 150);
        } else {
            revealObserver.observe(el);
        }
    });

    // ===================== 过渡区入场动画 =====================
    const transitionSection = document.getElementById('page-transition');
    if (transitionSection) {
        const transObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    transitionSection.classList.add('transition-active');
                }
            });
        }, { threshold: 0.1 });
        transObserver.observe(transitionSection);
        const r = transitionSection.getBoundingClientRect();
        if (r.top < window.innerHeight) {
            transitionSection.classList.add('transition-active');
        }
    }
    // page3 欧莱雅文字入场动画
    const page3Section = document.getElementById('page3');
    if (page3Section) {
        const page3TextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    page3Section.querySelectorAll('.transition-line .reveal-text').forEach((el, i) => {
                        setTimeout(() => el.classList.add('revealed'), i * 120);
                    });
                }
            });
        }, { threshold: 0.1 });
        page3TextObserver.observe(page3Section);
    }
    // page1 入场动画
    const page1El = document.getElementById('page1');
    if (page1El) {
        setTimeout(() => {
            page1El.classList.add('transition-active');
        }, 100);
    }
    // ===================== page3 白色卡片扩展动效 =====================
    // page3 卡片入场动画
    const lorealStackEl = document.getElementById('lorealStack');
    if (lorealStackEl) {
        document.querySelectorAll('.loreal-card').forEach(card => card.classList.add('card-hidden'));
        const cardEntryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.loreal-card').forEach((card, i) => {
                        setTimeout(() => card.classList.remove('card-hidden'), i * 120);
                    });
                    cardEntryObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });
        cardEntryObserver.observe(lorealStackEl);
    }
    // page4 文字入场动画
    const page4Section = document.getElementById('page4');
    if (page4Section) {
        const page4TextObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    page4Section.querySelectorAll('.page4-text').forEach((el, i) => {
                        setTimeout(() => el.classList.add('revealed'), i * 150);
                    });
                    page4TextObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        page4TextObserver.observe(page4Section);
    }
    const page3El = document.getElementById('page3');
    if (page3El) {
        window.addEventListener('scroll', () => {
            const rect = page3El.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, 1 - rect.top / (window.innerHeight * 0.5)));
            const radius = Math.round(28 * (1 - progress));
            page3El.style.borderRadius = `${radius}px ${radius}px 0 0`;
        }, { passive: true });
    }
    // ===================== Page5 城市切换 =====================
    const p5Stage = document.querySelector('.p5-stage');
    if (p5Stage) {
        p5Stage.addEventListener('mousemove', (e) => {
            const rect = p5Stage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const sectionWidth = rect.width / 8;
            const cities = ['伦敦','天津','长白山','首尔','重庆','阿勒泰','开罗','西双版纳'];
            const index = Math.floor(x / sectionWidth);
            const city = cities[Math.min(index, 7)];
            document.querySelectorAll('.p5-city').forEach(d => d.classList.remove('active'));
            document.querySelectorAll('.p5-cityview').forEach(d => d.classList.remove('active'));
            document.querySelector(`.p5-city[data-city="${city}"]`)?.classList.add('active');
            document.querySelector(`.p5-cityview[data-city="${city}"]`)?.classList.add('active');
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (e.clientX - rect.left - cx) / cx;
            const dy = (e.clientY - rect.top - cy) / cy;

            document.querySelectorAll('.p5-cityview.active .p5-photo').forEach((photo, i) => {
                const factor = (i + 1) * 4;
                photo.style.setProperty('--tx', (-dx * factor) + 'px');
                photo.style.setProperty('--ty', (-dy * factor) + 'px');
            });
        });
    }

    // page4 圆角扩展动效
    const page4El = document.getElementById('page4');
    if (page4El) {
        window.addEventListener('scroll', () => {
            const rect = page4El.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, 1 - rect.top / (window.innerHeight * 0.5)));
            const radius = Math.round(28 * (1 - progress));
            page4El.style.borderRadius = `${radius}px ${radius}px 0 0`;
        }, { passive: true });
    }

    // 导航跳转
    const navAboutBtn = document.getElementById('navAbout');
    if (navAboutBtn) navAboutBtn.addEventListener('click', () => {
    document.getElementById('page4')?.scrollIntoView({ behavior: 'smooth' });
    });

});