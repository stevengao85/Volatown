
(() => {
  const data = window.GAME_DATA;
  const STORAGE_KEY = 'volatility_city_save_v1';
  const SLOT_PREFIX = 'volatility_city_slot_';
  const PENDING_CHAPTER_KEY = 'volatility_city_pending_start_v1';
  const FINAL_CLEAR_MESSAGE = '恭喜您，已经完成并通过测试，您现在已经成为波动城的合格公民，成为了五位希腊女神的邻居！祝您今后期权交易顺利。您可以退出游戏或回主菜单。';
  const DEFAULTS = {
    unlockedChapter: 1,
    cleared: {},
    bestScores: {},
    lastCheckpoint: null,
    settings: {
      typingSpeed: data.settings.typingSpeed,
      autoDelay: data.settings.autoDelay,
      reduceMotion: false
    }
  };

  const state = loadState();
  let session = null;
  let typingTimer = null;
  let autoTimer = null;
  let isTyping = false;
  let backlog = [];
  let activeModal = null;

  const screens = {
    title: document.getElementById('title-screen'),
    chapters: document.getElementById('chapter-screen'),
    archive: document.getElementById('archive-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen')
  };

  const els = {
    titleProgress: document.getElementById('title-progress'),
    chapterGrid: document.getElementById('chapter-grid'),
    chapterSummary: document.getElementById('chapter-summary'),
    archiveGrid: document.getElementById('archive-grid'),
    bg: document.getElementById('scene-background'),
    sceneIdentityLayer: document.getElementById('scene-identity-layer'),
    sceneLoading: document.getElementById('scene-loading'),
    hudChapter: document.getElementById('hud-chapter'),
    hudPhase: document.getElementById('hud-phase'),
    quizTopbar: document.getElementById('quiz-topbar'),
    btnQuizScene: document.getElementById('btn-quiz-scene'),
    btnQuizHome: document.getElementById('btn-quiz-home'),
    portraitLeft: document.getElementById('portrait-left'),
    portraitCenter: document.getElementById('portrait-center'),
    portraitRight: document.getElementById('portrait-right'),
    sceneFrame: document.getElementById('scene-frame'),
    actorLayer: document.getElementById('actor-layer'),
    actorLeft: document.getElementById('actor-left'),
    actorCenter: document.getElementById('actor-center'),
    actorRight: document.getElementById('actor-right'),
    speakerAvatar: document.getElementById('speaker-avatar'),
    speakerName: document.getElementById('speaker-name'),
    speakerRole: document.getElementById('speaker-role'),
    lineIndicator: document.getElementById('line-indicator'),
    dialoguePanel: document.getElementById('dialogue-panel'),
    chatThread: document.getElementById('chat-thread'),
    dialogueText: document.getElementById('dialogue-text'),
    btnNext: document.getElementById('btn-next'),
    quizPanel: document.getElementById('quiz-panel'),
    quizPanelScroll: document.getElementById('quiz-panel-scroll'),
    quizTitle: document.getElementById('quiz-title'),
    quizDifficulty: document.getElementById('quiz-difficulty'),
    quizQuestion: document.getElementById('quiz-question'),
    quizOptions: document.getElementById('quiz-options'),
    quizFeedback: document.getElementById('quiz-feedback'),
    quizProgress: document.getElementById('quiz-progress'),
    btnQuizNext: document.getElementById('btn-quiz-next'),
    resultWrap: document.querySelector('#result-screen .result-wrap'),
    resultTitle: document.getElementById('result-title'),
    resultCopy: document.getElementById('result-copy'),
    resultStats: document.getElementById('result-stats'),
    resultActions: document.querySelector('#result-screen .result-actions'),
    btnResultNext: document.getElementById('btn-result-next'),
    btnResultRetry: document.getElementById('btn-result-retry'),
    btnResultMap: document.querySelector('#result-screen [data-nav="chapters"]'),
    btnResultHome: document.querySelector('#result-screen [data-nav="title"]'),
    modalOverlay: document.getElementById('modal-overlay'),
    systemModal: document.getElementById('system-modal'),
    saveModal: document.getElementById('save-modal'),
    loadModal: document.getElementById('load-modal'),
    logModal: document.getElementById('log-modal'),
    settingsModal: document.getElementById('settings-modal'),
    saveSlots: document.getElementById('save-slots'),
    loadSlots: document.getElementById('load-slots'),
    logList: document.getElementById('log-list'),
    typingSpeed: document.getElementById('typing-speed'),
    autoDelay: document.getElementById('auto-delay'),
    reduceMotion: document.getElementById('reduce-motion'),
  };

  const portraits = Object.fromEntries(data.characters.map(c => [c.name, c.portrait]));
  const avatars = Object.fromEntries(data.characters.map(c => [c.name, c.avatar || c.portrait]));
  const characterInfo = Object.fromEntries(data.characters.map(c => [c.name, c]));
  const chapterSceneLayers = {};
  const chapterSceneLabels = {
    1: [
      { name: 'Master', role: '老师', x: 0.115, y: 0.765 },
      { name: 'Delta', role: '方向女神', x: 0.495, y: 0.79 },
      { name: 'Apprentice', role: '学徒', x: 0.835, y: 0.76 }
    ]
  };
  let sceneImageMeta = { width: 2048, height: 1024, url: '' };
  const body = document.body;

  init();

  function init() {
    bindGlobalActions();
    renderTitleStats();
    renderChapterGrid();
    renderArchive();
    hydrateSettings();
    const pendingStart = consumePendingChapterStart();
    if (pendingStart) {
      startChapter(pendingStart.chapterId, pendingStart.checkpoint || null);
      return;
    }
    const initial = window.location.hash === '#archive' ? 'archive' : window.location.hash === '#chapters' ? 'chapters' : 'title';
    navigate(initial);
  }

  function bindGlobalActions() {
    document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => handleMenuAction(btn.dataset.action));
    });
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.nav === 'title') {
          requestReturnToTitle();
          return;
        }
        navigate(btn.dataset.nav);
      });
    });
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', closeModal);
    });

    els.btnNext.addEventListener('click', nextDialogue);
    document.getElementById('dialogue-panel').addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      nextDialogue();
    });
    document.getElementById('btn-auto').addEventListener('click', toggleAuto);
    document.getElementById('btn-skip').addEventListener('click', skipDialogue);
    document.getElementById('btn-log').addEventListener('click', openLogModal);
    document.getElementById('btn-system').addEventListener('click', () => openModal('system'));
    if (els.btnQuizHome) els.btnQuizHome.addEventListener('click', requestReturnToTitle);

    document.getElementById('btn-resume').addEventListener('click', closeModal);
    document.getElementById('btn-save').addEventListener('click', openSaveModal);
    document.getElementById('btn-load').addEventListener('click', openLoadModal);
    document.getElementById('btn-restart-chapter').addEventListener('click', restartCurrentChapter);

    els.btnQuizNext.addEventListener('click', nextQuizQuestion);
    els.btnResultRetry.addEventListener('click', () => {
      if (session) startChapter(session.chapterId);
    });
    els.btnResultNext.addEventListener('click', handleResultNext);
    document.getElementById('btn-settings-save').addEventListener('click', saveSettings);

    window.addEventListener('resize', () => {
      if (session?.phase === 'dialogue') {
        renderChatThread();
      }
      renderSceneLabels();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!els.modalOverlay.classList.contains('hidden')) {
          closeModal();
        } else if (screens.game.classList.contains('active')) {
          openModal('system');
        }
      }
      if ((e.code === 'Space' || e.code === 'Enter' || e.code === 'NumpadEnter') && screens.game.classList.contains('active') && activeModal === null) {
        e.preventDefault();
        if (!els.quizPanel.classList.contains('hidden')) {
          if (!els.btnQuizNext.classList.contains('hidden')) nextQuizQuestion();
          return;
        }
        nextDialogue();
      }
    });
    els.modalOverlay.addEventListener('click', (e) => {
      if (e.target === els.modalOverlay) closeModal();
    });
  }


  function requestReturnToTitle() {
    stopAuto();
    clearTyping();
    closeModal();
    window.location.hash = '#title';
    window.location.reload();
  }

  function queueChapterRefresh(chapterId, checkpoint = null) {
    stopAuto();
    clearTyping();
    closeModal();
    try {
      sessionStorage.setItem(PENDING_CHAPTER_KEY, JSON.stringify({ chapterId, checkpoint }));
    } catch (error) {
      console.warn('Unable to queue chapter refresh', error);
    }
    window.location.hash = '#game';
    window.location.reload();
  }

  function consumePendingChapterStart() {
    try {
      const raw = sessionStorage.getItem(PENDING_CHAPTER_KEY);
      if (!raw) return null;
      sessionStorage.removeItem(PENDING_CHAPTER_KEY);
      return JSON.parse(raw);
    } catch (error) {
      console.warn('Unable to read pending chapter refresh', error);
      sessionStorage.removeItem(PENDING_CHAPTER_KEY);
      return null;
    }
  }

  function handleMenuAction(action) {
    switch (action) {
      case 'start':
        navigate('chapters');
        break;
      case 'continue':
        continueGame();
        break;
      case 'chapters':
        navigate('chapters');
        break;
      case 'archive':
        navigate('archive');
        break;
      case 'settings':
        openModal('settings');
        break;
      case 'reset':
        if (confirm('确定清空所有自动存档、手动存档与章节进度吗？')) {
          resetAllProgress();
        }
        break;
    }
  }

  function navigate(name) {
    stopAuto();
    clearTyping();
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    body.dataset.screen = name;
    closeModal();
    if (name === 'title') renderTitleStats();
    if (name === 'chapters') renderChapterGrid();
  }

  function renderTitleStats() {
    const clearedCount = Object.keys(state.cleared).filter(k => state.cleared[k]).length;
    const total = data.chapters.length;
    const avg = clearedCount
      ? (Object.values(state.bestScores).reduce((a, b) => a + b, 0) / clearedCount).toFixed(1)
      : '0.0';
    if (!els.titleProgress) return;
    els.titleProgress.innerHTML = `
      <div class="stat-row"><span>已通关章节</span><strong>${clearedCount} / ${total}</strong></div>
      <div class="progress-bar"><div class="progress-fill" style="width:${(clearedCount / total) * 100}%"></div></div>
      <div class="stat-row"><span>当前解锁</span><strong>第 ${state.unlockedChapter} 关</strong></div>
      <div class="stat-row"><span>平均得分</span><strong>${avg} / 3</strong></div>
    `;
  }

  function renderChapterGrid() {
    const clearedCount = Object.keys(state.cleared).filter(k => state.cleared[k]).length;
    els.chapterSummary.textContent = `已通关 ${clearedCount} / ${data.chapters.length} 关 · 当前解锁到第 ${state.unlockedChapter} 关`;

    const links = data.chapters.slice(0, -1).map((ch, index) => {
      const next = data.chapters[index + 1];
      const dx = next.mapX - ch.mapX;
      const dy = next.mapY - ch.mapY;
      const length = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const active = state.unlockedChapter > ch.id;
      return `
        <div class="map-link ${active ? 'active' : ''}"
             style="left:${ch.mapX}%; top:${ch.mapY}%; width:${length}%; transform:rotate(${angle}deg)"></div>
      `;
    }).join('');

    const nodes = data.chapters.map(ch => {
      const locked = ch.id > state.unlockedChapter;
      const cleared = !!state.cleared[ch.id];
      const tooltipDirection = ch.mapY <= 30 ? 'tooltip-down' : 'tooltip-up';
      const stateLabel = locked ? '未解锁' : (cleared ? '已通关' : '可挑战');
      return `
        <button class="map-node ${locked ? 'locked' : ''} ${cleared ? 'cleared' : ''} ${tooltipDirection}"
                style="left:${ch.mapX}%; top:${ch.mapY}%"
                data-node="${ch.id}"
                aria-label="${ch.title}">
          <span class="map-node-ring"></span>
          <span class="map-node-num">${ch.id}</span>
          <span class="map-node-tooltip">
            <strong>${ch.title}</strong>
            <em>${ch.location} · ${ch.goddess}</em>
            <span>${stateLabel}</span>
          </span>
        </button>
      `;
    }).join('');

    els.chapterGrid.innerHTML = `
      <div class="map-layout">
        <div class="map-board-wrap">
          <div class="map-board">
            <img class="map-board-image" src="assets/img/fantasy/bg-map.jpg" alt="波动城总地图">
            <div class="map-board-shade"></div>
            <div class="map-overlay">
              ${nodes}
            </div>
          </div>
        </div>
        <aside class="map-info-panel">
          <div class="map-info-scroll">
            <div class="map-info-kicker">Volatility City Route</div>
            <h3>波动城总地图</h3>
            <p>左侧是完整地图。点击已经点亮的章节节点，就能进入对应关卡。完成当前章节并答对至少 2 题，下一关才会解锁。</p>
            <div class="map-plaque-stats">
              <span>已通关：${clearedCount} / ${data.chapters.length}</span>
              <span>当前解锁：第 ${state.unlockedChapter} 关</span>
            </div>
            <div class="map-guide-list">
              <div class="map-guide-item"><strong>地图说明</strong>发光节点可以直接进入。灰色节点表示还没解锁。</div>
              <div class="map-guide-item"><strong>解锁规则</strong>每一关先看完剧情，再进入答题。至少答对 2 题才能点亮下一关。</div>
              <div class="map-guide-item"><strong>当前入口</strong>第 ${state.unlockedChapter} 关已经开放，点左侧地图上的对应节点即可开始。</div>
              <div class="map-guide-item"><strong>欢迎语</strong>Welcome to Volatown</div>
              <div class="map-guide-item"><strong>探索提示</strong>地图页不会显示剧情按钮，也不会显示关卡内的继续按钮。这里只负责选关与查看解锁状态。</div>
              <div class="map-guide-item"><strong>操作说明</strong>右侧信息区支持滚动。滚轮、触控板或拖动滚动条都可以查看下方内容。</div>
            </div>
          </div>
        </aside>
      </div>
    `;

    els.chapterGrid.querySelectorAll('[data-node]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.node);
        const chapter = getChapter(id);
        if (id > state.unlockedChapter) {
          toast(`【${chapter.title}】尚未解锁。先完成前面的学习与试炼。`);
          return;
        }
        queueChapterRefresh(id);
      });
    });
  }

  function renderArchive() {
    els.archiveGrid.innerHTML = data.characters.map(char => `
      <article class="archive-card parchment">
        <img src="${char.archivePortrait || char.portrait}" alt="${char.name}">
        <div>
          <h3>${char.name}</h3>
          <h4>${char.title}</h4>
          <p>${char.personality}</p>
        </div>
      </article>
    `).join('');
  }

  function hydrateSettings() {
    els.typingSpeed.value = state.settings.typingSpeed;
    els.autoDelay.value = state.settings.autoDelay;
    els.reduceMotion.checked = !!state.settings.reduceMotion;
    document.documentElement.style.setProperty('scroll-behavior', state.settings.reduceMotion ? 'auto' : 'smooth');
  }

  function saveSettings() {
    state.settings.typingSpeed = Number(els.typingSpeed.value);
    state.settings.autoDelay = Number(els.autoDelay.value);
    state.settings.reduceMotion = !!els.reduceMotion.checked;
    persistState();
    closeModal();
    toast('设置已保存');
  }

  function startChapter(chapterId, checkpoint = null) {
    const chapter = getChapter(chapterId);
    if (!chapter) return;
    if (chapterId > state.unlockedChapter) {
      toast('这一关还未解锁。先通过前面的挑战。');
      return;
    }
    clearTyping();
    stopAuto();
    backlog = [];
    session = {
      chapterId,
      phase: checkpoint?.phase || 'dialogue',
      lineIndex: checkpoint?.lineIndex || 0,
      quizIndex: checkpoint?.quizIndex || 0,
      score: checkpoint?.score || 0,
      answered: checkpoint?.answered || [],
      currentResult: checkpoint?.currentResult || null,
      awaitingQuizConfirm: checkpoint?.awaitingQuizConfirm || false,
      auto: false
    };
    backlog = chapter.dialogue.slice(0, session.lineIndex).map(([speaker, text]) => ({ speaker, text }));
    navigate('game');
    els.hudChapter.textContent = chapter.title;
    els.dialoguePanel.classList.add('hidden');
    els.quizPanel.classList.add('hidden');
    showSceneLoading(true);
    applySceneLayers(chapterId);
    preloadSceneBackground(chapter.background).then(meta => {
      if (!session || session.chapterId !== chapterId) return;
      sceneImageMeta = { width: meta.width || 2048, height: meta.height || 1024, url: chapter.background };
      els.bg.style.backgroundImage = `url('${chapter.background}')`;
      showSceneLoading(false);
      renderSceneLabels();
      renderChatThread();
      renderChapterFrame();
      autoSave();
    });
  }

  function formatQuizSceneLabel(chapter) {
    const numerals = ['零','一','二','三','四','五','六','七','八','九','十'];
    const chapterNumber = chapter && chapter.id < numerals.length ? numerals[chapter.id] : String(chapter?.id || '');
    return `第${chapterNumber}关 ${chapter?.location || chapter?.title || ''}`.trim();
  }

  function renderChapterFrame() {
    const chapter = getChapter(session.chapterId);
    const quizMode = session.phase === 'quiz';
    screens.game.classList.toggle('quiz-overlay-mode', quizMode);
    if (els.quizTopbar) {
      els.quizTopbar.classList.toggle('hidden', !quizMode);
      els.quizTopbar.setAttribute('aria-hidden', String(!quizMode));
    }
    if (els.btnQuizScene && chapter) {
      els.btnQuizScene.textContent = formatQuizSceneLabel(chapter);
    }
    if (session.phase === 'dialogue') {
      els.hudPhase.textContent = '剧情';
      els.sceneFrame.classList.remove('quiz-mode');
      els.dialoguePanel.classList.remove('hidden');
      els.quizPanel.classList.add('hidden');
      if (session.awaitingQuizConfirm) {
        renderDialogueReadyForQuiz();
      } else {
        renderDialogueLine(chapter.dialogue[session.lineIndex]);
      }
    } else if (session.phase === 'quiz') {
      els.hudPhase.textContent = '试炼';
      els.sceneFrame.classList.add('quiz-mode');
      els.dialoguePanel.classList.add('hidden');
      els.quizPanel.classList.remove('hidden');
      renderQuizQuestion();
    }
  }

  function renderDialogueLine(line) {
    if (!line) {
      session.awaitingQuizConfirm = true;
      renderDialogueReadyForQuiz();
      autoSave();
      return;
    }
    const [speaker, text] = line;
    const chapter = getChapter(session.chapterId);
    els.lineIndicator.textContent = `${session.lineIndex + 1} / ${chapter.dialogue.length}`;
    els.btnNext.textContent = '继续';
    const hint = document.querySelector('.chat-sidebar .hint');
    if (hint) hint.textContent = '点击继续，或按空格推进';
    renderChatThread(speaker, '', true);
    typeText(text, {
      onProgress: (partial) => renderChatThread(speaker, partial, true),
      onDone: () => {
        backlog.push({ speaker, text });
        backlog = backlog.slice(-120);
        renderChatThread();
        const isLastLine = session && session.phase === 'dialogue' && session.lineIndex >= chapter.dialogue.length - 1;
        if (isLastLine) {
          stopAuto();
          session.awaitingQuizConfirm = true;
          renderDialogueReadyForQuiz();
          autoSave();
          return;
        }
        if (session.auto) {
          autoTimer = window.setTimeout(nextDialogue, state.settings.autoDelay);
        }
      }
    });
  }

  function setPortraits() {}

  function applySceneLayers() {
    els.sceneFrame.classList.remove('compact-stage');
    if (els.actorLayer) els.actorLayer.classList.add('hidden');
  }

  function applyDialogueAnchor() {}

  function isRightAlignedSpeaker(speaker) {
    return speaker === 'Apprentice';
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }


  function preloadSceneBackground(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth || 2048, height: img.naturalHeight || 1024 });
      img.onerror = () => resolve({ width: 2048, height: 1024 });
      img.src = url;
    });
  }

  function showSceneLoading(isLoading) {
    if (!els.sceneLoading) return;
    els.sceneLoading.classList.toggle('hidden', !isLoading);
  }

  function getContainedImageBox(containerWidth, containerHeight, imageWidth, imageHeight) {
    const scale = Math.min(containerWidth / imageWidth, containerHeight / imageHeight);
    const width = imageWidth * scale;
    const height = imageHeight * scale;
    const left = (containerWidth - width) / 2;
    const top = (containerHeight - height) / 2;
    return { left, top, width, height };
  }

  function renderSceneLabels() {
    if (!els.sceneIdentityLayer) return;
    const labels = chapterSceneLabels[session?.chapterId];
    if (!labels || !labels.length) {
      els.sceneIdentityLayer.innerHTML = '';
      els.sceneIdentityLayer.classList.add('hidden');
      return;
    }
    const canvas = els.bg?.parentElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const box = getContainedImageBox(rect.width, rect.height, sceneImageMeta.width || 2048, sceneImageMeta.height || 1024);
    els.sceneIdentityLayer.innerHTML = labels.map(label => {
      const left = box.left + box.width * label.x;
      const top = box.top + box.height * label.y;
      return `<div class="scene-id-tag" style="left:${left}px;top:${top}px"><strong>${escapeHtml(label.name)}</strong><span>${escapeHtml(label.role)}</span></div>`;
    }).join('');
    els.sceneIdentityLayer.classList.remove('hidden');
  }

  function renderDialogueReadyForQuiz() {
    const chapter = getChapter(session.chapterId);
    els.lineIndicator.textContent = `已读完 ${chapter.dialogue.length} / ${chapter.dialogue.length}`;
    els.btnNext.textContent = '进入测试';
    const hint = document.querySelector('.chat-sidebar .hint');
    if (hint) hint.textContent = '点击继续，或按空格 / 回车进入答题';
    renderChatThread();
  }

  function enterQuizPhase() {
    if (!session) return;
    session.phase = 'quiz';
    session.quizIndex = 0;
    session.currentResult = null;
    session.awaitingQuizConfirm = false;
    renderChapterFrame();
    autoSave();
  }

  function renderChatThread(liveSpeaker = null, liveText = '', isLive = false) {
    const messages = [...backlog];
    if (liveSpeaker) messages.push({ speaker: liveSpeaker, text: liveText, live: isLive });

    els.chatThread.innerHTML = messages.map((msg, idx) => {
      const info = characterInfo[msg.speaker] || { title: '' };
      const align = isRightAlignedSpeaker(msg.speaker) ? 'right' : 'left';
      const avatar = avatars[msg.speaker] || portraits[msg.speaker] || portraits.Master;
      const prevSpeaker = idx > 0 ? messages[idx - 1].speaker : null;
      const isContinuation = prevSpeaker === msg.speaker;
      return `
        <article class="chat-message ${align} ${isContinuation ? 'chat-continuation' : ''} ${msg.live ? 'chat-live' : ''}" data-message-index="${idx}">
          ${isContinuation ? '' : `<img class="chat-avatar" src="${avatar}" alt="${escapeHtml(msg.speaker)} 头像">`}
          <div class="chat-bubble">
            <div class="chat-meta">
              <div>
                <div class="chat-speaker">${escapeHtml(msg.speaker)}</div>
                <div class="chat-role">${escapeHtml(info.title || '')}</div>
              </div>
            </div>
            <div class="chat-line">${escapeHtml(msg.text)}</div>
          </div>
        </article>
      `;
    }).join('');

    requestAnimationFrame(() => {
      els.chatThread.scrollTop = els.chatThread.scrollHeight;
    });
  }

  function typeText(text, handlers = {}) {
    clearTyping();
    if (typeof handlers === 'function') handlers = { onDone: handlers };
    const onProgress = handlers.onProgress;
    const onDone = handlers.onDone;
    if (state.settings.reduceMotion) {
      isTyping = false;
      onProgress?.(text);
      onDone?.();
      return;
    }
    isTyping = true;
    let i = 0;
    typingTimer = window.setInterval(() => {
      const partial = text.slice(0, i + 1);
      onProgress?.(partial);
      i += 1;
      if (i >= text.length) {
        clearTyping();
        onProgress?.(text);
        onDone?.();
      }
    }, state.settings.typingSpeed);
  }

  function nextDialogue() {
    if (!session || session.phase !== 'dialogue') return;
    if (session.awaitingQuizConfirm) {
      enterQuizPhase();
      return;
    }
    const currentLine = getChapter(session.chapterId).dialogue[session.lineIndex];
    if (isTyping && currentLine) {
      clearTyping();
      renderChatThread();
      if (!backlog.length || backlog[backlog.length - 1]?.text !== currentLine[1]) {
        backlog.push({ speaker: currentLine[0], text: currentLine[1] });
        backlog = backlog.slice(-120);
      }
      renderChatThread();
      const isLastLine = session.lineIndex >= getChapter(session.chapterId).dialogue.length - 1;
      if (isLastLine) {
        stopAuto();
        session.awaitingQuizConfirm = true;
        renderDialogueReadyForQuiz();
        autoSave();
      } else if (session.auto) {
        autoTimer = window.setTimeout(nextDialogue, state.settings.autoDelay);
      }
      return;
    }
    session.lineIndex += 1;
    renderChapterFrame();
    autoSave();
  }

  function skipDialogue() {
    if (!session || session.phase !== 'dialogue') return;
    clearTyping();
    stopAuto();
    session.lineIndex = getChapter(session.chapterId).dialogue.length;
    renderChapterFrame();
    autoSave();
  }

  function toggleAuto() {
    if (!session || session.phase !== 'dialogue') return;
    session.auto = !session.auto;
    document.getElementById('btn-auto').textContent = session.auto ? '自动：开' : '自动';
    if (session.auto && !isTyping) {
      autoTimer = window.setTimeout(nextDialogue, state.settings.autoDelay);
    } else {
      stopAuto();
    }
  }

  function stopAuto() {
    if (autoTimer) window.clearTimeout(autoTimer);
    autoTimer = null;
    if (session) session.auto = false;
    const btnAuto = document.getElementById('btn-auto');
    if (btnAuto) btnAuto.textContent = '自动';
  }

  function clearTyping() {
    if (typingTimer) window.clearInterval(typingTimer);
    typingTimer = null;
    isTyping = false;
  }

  function renderQuizQuestion() {
    const chapter = getChapter(session.chapterId);
    const q = chapter.quiz[session.quizIndex];
    if (!q) {
      finishChapter();
      return;
    }
    (els.quizPanelScroll || els.quizPanel).scrollTop = 0;
    els.quizTitle.textContent = `第 ${session.quizIndex + 1} 题 / ${chapter.quiz.length}`;
    els.quizDifficulty.textContent = `难度 ${q.difficulty}`;
    els.quizQuestion.textContent = q.question;
    els.quizProgress.textContent = `当前得分：${session.score} / ${chapter.quiz.length}`;
    els.quizFeedback.textContent = '请选择一个答案。';
    els.btnQuizNext.classList.add('hidden');
    els.btnQuizNext.textContent = session.quizIndex >= chapter.quiz.length - 1 ? '完成本关' : '下一题';

    els.quizOptions.innerHTML = q.options.map((opt, idx) => `
      <button class="option-btn" data-option="${idx}" aria-label="选项 ${String.fromCharCode(65 + idx)}">
        <span class="option-btn__content">
          <strong>${String.fromCharCode(65 + idx)}.</strong>
          <span class="option-btn__text">${opt}</span>
        </span>
        <span class="option-btn__mark" aria-hidden="true"></span>
      </button>
    `).join('');

    els.quizOptions.querySelectorAll('[data-option]').forEach(btn => {
      btn.addEventListener('click', () => answerQuestion(Number(btn.dataset.option)));
    });
  }

  function answerQuestion(optionIndex) {
    const chapter = getChapter(session.chapterId);
    const q = chapter.quiz[session.quizIndex];
    if (session.answered[session.quizIndex]) return;
    const correct = optionIndex === q.answer;
    if (correct) session.score += 1;
    session.answered[session.quizIndex] = {
      selected: optionIndex,
      correct
    };

    els.quizOptions.querySelectorAll('.option-btn').forEach(btn => {
      const idx = Number(btn.dataset.option);
      btn.classList.add('disabled');
      if (idx === q.answer) btn.classList.add('correct');
      if (idx === optionIndex && !correct) btn.classList.add('wrong');
    });

    els.quizFeedback.innerHTML = `<strong>${correct ? '回答正确。' : '回答错误。'}</strong><br>${q.explanation}`;
    els.quizProgress.textContent = `当前得分：${session.score} / ${chapter.quiz.length}`;
    els.btnQuizNext.classList.remove('hidden');
    requestAnimationFrame(() => {
      els.btnQuizNext.scrollIntoView({ block: 'nearest', behavior: state.settings.reduceMotion ? 'auto' : 'smooth' });
    });
    autoSave();
  }

  function nextQuizQuestion() {
    session.quizIndex += 1;
    renderQuizQuestion();
    autoSave();
  }


  function setResultScreenMode(mode) {
    const isFinale = mode === 'finale';
    els.resultWrap.classList.toggle('finale-mode', isFinale);
    els.resultActions.classList.toggle('finale-actions', isFinale);
    els.resultStats.classList.toggle('hidden', isFinale);
    els.btnResultRetry.classList.toggle('hidden', isFinale);
    if (els.btnResultMap) els.btnResultMap.classList.toggle('hidden', isFinale);
    if (els.btnResultHome) els.btnResultHome.classList.toggle('hidden', isFinale);
  }

  function finishChapter() {
    const chapter = getChapter(session.chapterId);
    const total = chapter.quiz.length;
    const passed = session.score >= 2;
    const isFinale = passed && chapter.id === data.chapters.length;
    state.bestScores[chapter.id] = Math.max(state.bestScores[chapter.id] || 0, session.score);
    if (passed) {
      state.cleared[chapter.id] = true;
      state.unlockedChapter = Math.max(state.unlockedChapter, Math.min(data.chapters.length, chapter.id + 1));
    }
    state.lastCheckpoint = {
      chapterId: chapter.id,
      phase: 'result',
      lineIndex: chapter.dialogue.length,
      quizIndex: chapter.quiz.length,
      score: session.score,
      answered: session.answered,
      passed,
      finale: isFinale
    };
    persistState();

    navigate('result');
    if (isFinale) {
      setResultScreenMode('finale');
      els.resultTitle.textContent = '最终通关';
      els.resultCopy.textContent = FINAL_CLEAR_MESSAGE;
      els.resultStats.innerHTML = '';
      els.btnResultNext.textContent = '回主菜单';
      return;
    }

    setResultScreenMode('default');
    els.resultTitle.textContent = passed ? '挑战成功' : '试炼未通过';
    els.resultCopy.textContent = passed
      ? `${chapter.goddess} 认可了你的判断。你获得了奖励「${chapter.reward}」，并解锁了下一段旅程。`
      : `${chapter.goddess} 没让你过。分数不够，先把概念捋顺，再回来重试。`;
    els.resultStats.innerHTML = `
      <div class="result-item"><strong>${session.score} / ${total}</strong><span>本关得分</span></div>
      <div class="result-item"><strong>${state.bestScores[chapter.id]} / ${total}</strong><span>历史最佳</span></div>
      <div class="result-item"><strong>${passed ? '已解锁' : '未解锁'}</strong><span>下一关状态</span></div>
    `;
    els.btnResultNext.textContent = passed && chapter.id < data.chapters.length ? '进入下一关' : '返回章节选择';
  }

  function handleResultNext() {
    if (!state.lastCheckpoint) {
      navigate('chapters');
      return;
    }
    if (state.lastCheckpoint.finale) {
      requestReturnToTitle();
      return;
    }
    const currentId = state.lastCheckpoint.chapterId;
    const passed = state.lastCheckpoint.passed;
    if (passed && currentId < data.chapters.length) {
      queueChapterRefresh(currentId + 1);
    } else {
      navigate('chapters');
    }
  }

  function continueGame() {
    const checkpoint = state.lastCheckpoint;
    if (!checkpoint) {
      toast('还没有可继续的进度，已为你打开第一关。');
      startChapter(1);
      return;
    }
    if (checkpoint.phase === 'result') {
      const nextId = checkpoint.passed ? Math.min(data.chapters.length, checkpoint.chapterId + 1) : checkpoint.chapterId;
      if (nextId === checkpoint.chapterId && !checkpoint.passed) {
        startChapter(nextId);
      } else {
        navigate('chapters');
      }
      return;
    }
    startChapter(checkpoint.chapterId, checkpoint);
  }

  function restartCurrentChapter() {
    if (!session) return;
    closeModal();
    startChapter(session.chapterId);
  }

  function openSaveModal() {
    renderSaveSlots();
    openModal('save');
  }

  function openLoadModal() {
    renderLoadSlots();
    openModal('load');
  }

  function openLogModal() {
    els.logList.innerHTML = backlog.length
      ? backlog.map(item => `<div class="log-item"><strong>${item.speaker}</strong>：${item.text}</div>`).join('')
      : '<div class="log-item">当前还没有已记录的台词。</div>';
    openModal('log');
  }

  function renderSaveSlots() {
    els.saveSlots.innerHTML = [1, 2, 3].map(slot => {
      const snap = readSlot(slot);
      return `
        <div class="slot-card">
          <div class="slot-meta">
            <strong>存档 ${slot}</strong>
            ${snap ? `
              <span>${snap.chapterTitle}</span>
              <span>阶段：${snap.phaseLabel} · ${snap.timestamp}</span>
            ` : '<span class="slot-empty">空槽位</span>'}
          </div>
          <button class="menu-btn primary" data-save-slot="${slot}">保存到这里</button>
        </div>
      `;
    }).join('');
    els.saveSlots.querySelectorAll('[data-save-slot]').forEach(btn => {
      btn.addEventListener('click', () => {
        saveToSlot(Number(btn.dataset.saveSlot));
      });
    });
  }

  function renderLoadSlots() {
    els.loadSlots.innerHTML = [1, 2, 3].map(slot => {
      const snap = readSlot(slot);
      return `
        <div class="slot-card">
          <div class="slot-meta">
            <strong>存档 ${slot}</strong>
            ${snap ? `
              <span>${snap.chapterTitle}</span>
              <span>阶段：${snap.phaseLabel} · ${snap.timestamp}</span>
            ` : '<span class="slot-empty">空槽位</span>'}
          </div>
          <button class="menu-btn ${snap ? 'primary' : ''}" ${snap ? '' : 'disabled'} data-load-slot="${slot}">${snap ? '读取这个存档' : '空槽位'}</button>
        </div>
      `;
    }).join('');
    els.loadSlots.querySelectorAll('[data-load-slot]').forEach(btn => {
      btn.addEventListener('click', () => {
        loadFromSlot(Number(btn.dataset.loadSlot));
      });
    });
  }

  function saveToSlot(slot) {
    const checkpoint = buildCheckpoint();
    if (!checkpoint) {
      toast('当前没有可保存的进度。');
      return;
    }
    const payload = {
      ...checkpoint,
      chapterTitle: getChapter(checkpoint.chapterId).title,
      phaseLabel: checkpoint.phase === 'dialogue' ? '剧情' : '试炼',
      timestamp: new Date().toLocaleString('zh-CN')
    };
    localStorage.setItem(SLOT_PREFIX + slot, JSON.stringify(payload));
    renderSaveSlots();
    toast(`已保存到存档 ${slot}`);
  }

  function loadFromSlot(slot) {
    const snap = readSlot(slot);
    if (!snap) return;
    closeModal();
    startChapter(snap.chapterId, snap);
    toast(`已读取存档 ${slot}`);
  }

  function readSlot(slot) {
    try {
      const raw = localStorage.getItem(SLOT_PREFIX + slot);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function buildCheckpoint() {
    if (!session) return state.lastCheckpoint;
    return {
      chapterId: session.chapterId,
      phase: session.phase,
      lineIndex: session.lineIndex,
      awaitingQuizConfirm: !!session.awaitingQuizConfirm,
      quizIndex: session.quizIndex,
      score: session.score,
      answered: session.answered,
      currentResult: session.currentResult || null,
      passed: false
    };
  }

  function autoSave() {
    state.lastCheckpoint = buildCheckpoint();
    persistState();
  }

  function openModal(type) {
    activeModal = type;
    els.modalOverlay.classList.remove('hidden');
    [els.systemModal, els.saveModal, els.loadModal, els.logModal, els.settingsModal].forEach(m => m.classList.add('hidden'));
    if (type === 'system') els.systemModal.classList.remove('hidden');
    if (type === 'save') els.saveModal.classList.remove('hidden');
    if (type === 'load') els.loadModal.classList.remove('hidden');
    if (type === 'log') els.logModal.classList.remove('hidden');
    if (type === 'settings') {
      hydrateSettings();
      els.settingsModal.classList.remove('hidden');
    }
  }

  function closeModal() {
    activeModal = null;
    els.modalOverlay.classList.add('hidden');
    [els.systemModal, els.saveModal, els.loadModal, els.logModal, els.settingsModal].forEach(m => m.classList.add('hidden'));
  }

  function resetAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
    [1,2,3].forEach(slot => localStorage.removeItem(SLOT_PREFIX + slot));
    Object.assign(state, structuredClone(DEFAULTS));
    session = null;
    backlog = [];
    persistState();
    renderTitleStats();
    renderChapterGrid();
    closeModal();
    navigate('title');
    toast('所有进度已清空。');
  }

  function getChapter(id) {
    return data.chapters.find(ch => ch.id === id);
  }

  function uniqueCast(chapter) {
    const names = chapter.dialogue.map(line => line[0]);
    return [...new Set(names)];
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULTS);
      const parsed = JSON.parse(raw);
      return {
        ...structuredClone(DEFAULTS),
        ...parsed,
        settings: {
          ...DEFAULTS.settings,
          ...(parsed.settings || {})
        }
      };
    } catch {
      return structuredClone(DEFAULTS);
    }
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderTitleStats();
  }

  function toast(message) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), 1800);
  }
})();
