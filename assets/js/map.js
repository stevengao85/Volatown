
(() => {
  const STORAGE_KEY = 'volatility_city_save_v1';
  const chapters = [
    { id: 1, title: '第一关：方向与买卖', goddess: 'Delta', desc: '地点在方向街。先把看涨、看跌与买卖方式拆开。' },
    { id: 2, title: '第二关：打和点', goddess: 'Vega', desc: '地点在波动集市。方向对了还不够，价格还得跨过成本线。' },
    { id: 3, title: '第三关：价内价外', goddess: 'Rho', desc: '地点在价值档案馆。把价内、价平、价外分清楚。' },
    { id: 4, title: '第四关：时间价值', goddess: 'Theta', desc: '地点在时间塔一层。理解期权价格中的时间价值。' },
    { id: 5, title: '第五关：Theta 的含义与应用', goddess: 'Theta', desc: '地点在时间塔二层。理解时间流逝如何持续侵蚀买方。' },
    { id: 6, title: '第六关：Delta 的含义与应用', goddess: 'Delta', desc: '地点在方向街高台。理解敏感度与方向暴露。' },
    { id: 7, title: '第七关：Vega 的含义与应用', goddess: 'Vega', desc: '地点在波动广场。理解隐含波动率为何能左右期权价格。' },
    { id: 8, title: '第八关：简单的期权组合', goddess: 'Gamma', desc: '地点在风控大厅。把单个工具拼成定义风险的组合。' },
    { id: 9, title: '第九关：业绩期赌期权', goddess: 'Gamma', desc: '地点在业绩竞技场。理解财报前后隐波与幅度的双重风险。' }
  ];

  const infoPanel = document.getElementById('infoPanel');
  const infoEyebrow = document.getElementById('infoEyebrow');
  const infoTitle = document.getElementById('infoTitle');
  const infoBody = document.getElementById('infoBody');
  const progressText = document.getElementById('progressText');
  const clearText = document.getElementById('clearText');
  const chapterList = document.getElementById('chapterList');
  const closeInfo = document.getElementById('closeInfo');

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { unlockedChapter: 1, cleared: {} };
      const parsed = JSON.parse(raw);
      return {
        unlockedChapter: Math.max(1, Math.min(9, parsed.unlockedChapter || 1)),
        cleared: parsed.cleared || {}
      };
    } catch {
      return { unlockedChapter: 1, cleared: {} };
    }
  }

  function saveState(state) {
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
      catch { return {}; }
    })();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...state }));
  }

  let state = loadState();

  function statusOf(id) {
    if (state.cleared?.[id]) return 'cleared';
    if (id <= state.unlockedChapter) return 'current';
    return 'locked';
  }

  function render() {
    const clearedCount = Object.keys(state.cleared || {}).filter(k => state.cleared[k]).length;
    progressText.textContent = `第 ${state.unlockedChapter} / 9 关可挑战`;
    clearText.textContent = `已通关 ${clearedCount} 关`;

    document.querySelectorAll('.stage-node').forEach(btn => {
      const id = Number(btn.dataset.id);
      btn.classList.remove('current', 'cleared', 'locked');
      const status = statusOf(id);
      btn.classList.add(status);
      btn.disabled = false;
      btn.title = `${chapters[id - 1].title} · ${status === 'locked' ? '未解锁' : status === 'cleared' ? '已通过' : '可挑战'}`;
    });

    chapterList.innerHTML = chapters.map(ch => {
      const status = statusOf(ch.id);
      const statusText = status === 'locked' ? '未解锁' : status === 'cleared' ? '已通过' : '可挑战';
      return `
        <div class="chapter-card ${status}">
          <div class="meta">
            <strong>${ch.id}. ${ch.title}</strong>
            <span class="status-tag ${status}">${statusText}</span>
          </div>
          <p>${ch.goddess} 负责 · ${ch.desc}</p>
        </div>
      `;
    }).join('');
  }

  function openInfo(id) {
    const ch = chapters[id - 1];
    const status = statusOf(id);
    infoEyebrow.textContent = `Chapter ${id} · ${ch.goddess}`;
    infoTitle.textContent = ch.title;
    infoBody.innerHTML = `
      <p>${ch.desc}</p>
      <p>当前状态：<strong>${status === 'locked' ? '未解锁' : status === 'cleared' ? '已通过' : '可挑战'}</strong></p>
      <p>地图逻辑：完成本关学习与答题后，下一关按钮自动解锁。当前预览页已经接入本地存档键 <code>${STORAGE_KEY}</code>，后续可以直接并入主游戏。</p>
      <p>你要的重点我已经先放进来：<strong>大地图背景、九关按钮、顺序解锁、锁定态视觉</strong>。下一步再继续补角色立绘和关卡背景。</p>
    `;
    infoPanel.classList.add('show');
  }

  document.querySelectorAll('.stage-node').forEach(btn => {
    btn.addEventListener('click', () => openInfo(Number(btn.dataset.id)));
  });

  closeInfo.addEventListener('click', () => infoPanel.classList.remove('show'));
  document.getElementById('resetProgress').addEventListener('click', () => {
    state = { unlockedChapter: 1, cleared: {} };
    saveState(state);
    render();
    openInfo(1);
  });
  document.getElementById('unlockAll').addEventListener('click', () => {
    state = { unlockedChapter: 9, cleared: {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true} };
    saveState(state);
    render();
    openInfo(9);
  });

  render();
  openInfo(1);
})();
