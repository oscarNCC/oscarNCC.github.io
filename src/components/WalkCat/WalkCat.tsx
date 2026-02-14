/**
 * Bottom bar cat: walk (idle sprite 加速) / run (walk sprite) / idle (站立).
 * Requires in public/: cat-walk.webp = run sprite, cat-idle.webp = walk + idle sprite.
 *
 * 黑閃可能原因與對應：
 * - Canvas clearRect：本元件用 CSS sprite，無 Canvas，不適用。
 * - PNG 黑底：sprite 匯出時索引色未轉 alpha 或背景為黑 → Aseprite/Piskel 將 Index 0 設透明或匯出 RGBA。
 * - React 渲染閃：用 requestAnimationFrame + 每幀單次 setState，避免 setInterval 與多狀態更新間隙。
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useCatInteraction } from '../../contexts/CatInteractionContext';
import styles from './WalkCat.module.css';

const MEAT_EMOJI = '🍗';
const CAT_FALL_DURATION_MS = 1800;
const MEAT_ARRIVE_THRESHOLD = 12;

const RUN_SHEET_FRAMES = 13; // cat-walk.webp = run
const RUN_FRAME_COUNT = 13;
const IDLE_COLS = 7;
const IDLE_ROWS = 1;
const FPS = 15;
const FRAME_DURATION_MS = 1000 / FPS;
const WALK_SPEED_PX = 1;   // walk 狀態（idle 圖）移動速度
const RUN_SPEED_PX = 1.5;    // run 狀態（walk 圖）移動速度
const WALK_ANIM_SPEED = 2;   // walk 時 idle 動畫每幀跳幾格（2 = 加速）
const IDLE_CHECK_INTERVAL_MS = 15000;
const IDLE_MIN_DURATION_MS = 2000;
const IDLE_MAX_DURATION_MS = 3000;
const IDLE_CHANCE = 0.5;
const RUN_CHANCE = 0.4;       // 移動中隨機切換成 run 的機率
const RUN_CHECK_INTERVAL_MS = 8000;

type Direction = 'left' | 'right';
type Mode = 'walk' | 'run' | 'idle';

const MODES: Mode[] = ['walk', 'run', 'idle'];

type SheetSize = {
  frameWidth: number;
  frameHeight: number;
  sheetWidth: number;
  sheetHeight: number;
  vertical?: boolean;
  /** Idle 網格：有值時用 col/row 算 backgroundPosition */
  cols?: number;
  rows?: number;
};

type AnimationState = {
  x: number;
  direction: Direction;
  frameIndex: number;
  idleFrameIndex: number;
};

type Phase = 'hidden' | 'falling' | 'onBar';

export function WalkCat() {
  const { avatarClickCount, meatTargets, meatEatenCount, addMeatTarget, removeMeatTargetById } = useCatInteraction();
  const barRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('hidden');
  const [mode, setMode] = useState<Mode>('walk');
  const [animation, setAnimation] = useState<AnimationState>({
    x: 0,
    direction: 'right',
    frameIndex: 0,
    idleFrameIndex: 0,
  });
  const [containerWidth, setContainerWidth] = useState(0);
  const [walkSize, setWalkSize] = useState<SheetSize | null>(null);
  const [idleSize, setIdleSize] = useState<SheetSize | null>(null);

  const modeRef = useRef(mode);
  const containerWidthRef = useRef(containerWidth);
  const walkSizeRef = useRef(walkSize);
  const idleSizeRef = useRef(idleSize);
  const phaseRef = useRef(phase);
  const meatTargetsRef = useRef(meatTargets);
  const meatEatenCountRef = useRef(meatEatenCount);
  const prevAvatarClickCountRef = useRef(avatarClickCount);

  modeRef.current = mode;
  containerWidthRef.current = containerWidth;
  walkSizeRef.current = walkSize;
  idleSizeRef.current = idleSize;
  phaseRef.current = phase;
  meatTargetsRef.current = meatTargets;
  meatEatenCountRef.current = meatEatenCount;

  const { x, direction, frameIndex, idleFrameIndex } = animation;

  const setRandomMode = useCallback(() => {
    setMode(MODES[Math.floor(Math.random() * MODES.length)]);
    setAnimation((prev) => ({
      ...prev,
      direction: Math.random() < 0.5 ? 'left' : 'right',
    }));
  }, []);

  const updateContainerWidth = useCallback(() => {
    if (barRef.current) {
      setContainerWidth(barRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    const walkImg = new Image();
    walkImg.onload = () => {
      const sheetWidth = walkImg.naturalWidth;
      const sheetHeight = walkImg.naturalHeight;
      setWalkSize({
        sheetWidth,
        sheetHeight,
        frameWidth: sheetWidth / RUN_SHEET_FRAMES,
        frameHeight: sheetHeight,
      });
    };
    walkImg.src = '/cat-walk.webp';

    const idleImg = new Image();
    idleImg.onload = () => {
      const sheetWidth = idleImg.naturalWidth;
      const sheetHeight = idleImg.naturalHeight;
      // Idle 使用 4x2 網格（8 格），避免被當成 8 格橫排而變成跑馬燈
      const frameW = Math.floor(sheetWidth / IDLE_COLS);
      const frameH = Math.floor(sheetHeight / IDLE_ROWS);
      setIdleSize({
        sheetWidth,
        sheetHeight,
        frameWidth: frameW,
        frameHeight: frameH,
        cols: IDLE_COLS,
        rows: IDLE_ROWS,
      });
    };
    idleImg.src = '/cat-idle.webp';
  }, []);

  useEffect(() => {
    updateContainerWidth();
    const resizeObserver = new ResizeObserver(updateContainerWidth);
    if (barRef.current) resizeObserver.observe(barRef.current);
    return () => resizeObserver.disconnect();
  }, [updateContainerWidth]);

  useEffect(() => {
    if (avatarClickCount === 0) setPhase('hidden');
    else if (avatarClickCount >= 1 && phase === 'hidden') setPhase('falling');
  }, [avatarClickCount]);

  useEffect(() => {
    if (phase !== 'falling') return;
    const t = setTimeout(() => setPhase('onBar'), CAT_FALL_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const didLandRef = useRef(false);
  useEffect(() => {
    if (phase === 'onBar' && !didLandRef.current && containerWidth > 0) {
      didLandRef.current = true;
      const fw = walkSize?.frameWidth ?? idleSize?.frameWidth ?? 40;
      const centerX = Math.max(0, (containerWidth - fw) / 2);
      setAnimation((prev) => ({ ...prev, x: centerX }));
    }
    if (phase !== 'onBar') didLandRef.current = false;
  }, [phase, containerWidth, walkSize?.frameWidth, idleSize?.frameWidth]);

  // 每多按一下頭像就多掉一根 🍗
  useEffect(() => {
    if (avatarClickCount >= 2 && avatarClickCount > prevAvatarClickCountRef.current) {
      prevAvatarClickCountRef.current = avatarClickCount;
      const cw = containerWidthRef.current;
      const fw = walkSizeRef.current?.frameWidth ?? idleSizeRef.current?.frameWidth ?? 40;
      const maxX = Math.max(0, cw - fw);
      const targetX = maxX > 0 ? Math.random() * maxX : 0;
      addMeatTarget(targetX);
    } else if (avatarClickCount < prevAvatarClickCountRef.current) {
      prevAvatarClickCountRef.current = avatarClickCount;
    }
  }, [avatarClickCount, addMeatTarget]);

  const frameWidth =
    mode === 'run' ? walkSize?.frameWidth ?? 32 : idleSize?.frameWidth ?? 32;

  useEffect(() => {
    const maxX = Math.max(0, containerWidth - frameWidth);
    if (containerWidth > 0 && x > maxX) {
      setAnimation((prev) => ({ ...prev, x: maxX }));
    }
  }, [containerWidth, x, frameWidth]);

  // 單一 requestAnimationFrame 迴圈：每幀只一次 setState，減少 React 渲染閃爍
  useEffect(() => {
    let rafId: number;
    let lastMs: number | null = null;

    const tick = (timestamp: number) => {
      if (lastMs == null) lastMs = timestamp;
      const elapsed = timestamp - lastMs;
      if (elapsed < FRAME_DURATION_MS) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastMs = timestamp;

      const ph = phaseRef.current;
      if (ph !== 'onBar') {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const m = modeRef.current;
      const cw = containerWidthRef.current;
      const ws = walkSizeRef.current;
      const is = idleSizeRef.current;
      const targets = meatTargetsRef.current;
      const eaten = meatEatenCountRef.current;
      const speedMul = Math.min(1 + eaten * 0.2, 2.2);

      setAnimation((prev) => {
        if (targets.length > 0) {
          // 找離貓目前位置最近的那根 🍗（用 id 移除，避免連續兩幀誤刪到另一根）
          let nearestId = targets[0].id;
          let meatX = targets[0].x;
          for (let i = 1; i < targets.length; i++) {
            const d = Math.abs(targets[i].x - prev.x);
            if (d < Math.abs(meatX - prev.x)) {
              nearestId = targets[i].id;
              meatX = targets[i].x;
            }
          }
          const dist = meatX - prev.x;
          const sign = dist > 0 ? 1 : dist < 0 ? -1 : 0;
          let nextX = prev.x + RUN_SPEED_PX * speedMul * sign;
          const maxX = cw > 0 && ws ? Math.max(0, cw - ws.frameWidth) : 0;
          if (Math.abs(nextX - meatX) < MEAT_ARRIVE_THRESHOLD) {
            nextX = meatX;
            removeMeatTargetById(nearestId);
          } else {
            nextX = Math.max(0, Math.min(maxX, nextX));
          }
          return {
            ...prev,
            x: nextX,
            direction: sign >= 0 ? 'right' : 'left',
            frameIndex: (prev.frameIndex + 1) % RUN_FRAME_COUNT,
          };
        }
        if (m === 'run') {
          const maxX = cw > 0 && ws ? Math.max(0, cw - ws.frameWidth) : 0;
          let nextX = prev.x + RUN_SPEED_PX * speedMul * (prev.direction === 'right' ? 1 : -1);
          let nextDir = prev.direction;
          if (nextX >= maxX) {
            nextX = maxX;
            nextDir = 'left';
          }
          if (nextX <= 0) {
            nextX = 0;
            nextDir = 'right';
          }
          return {
            ...prev,
            frameIndex: (prev.frameIndex + 1) % RUN_FRAME_COUNT,
            x: nextX,
            direction: nextDir,
          };
        }
        if (m === 'walk') {
          const maxX = cw > 0 && is ? Math.max(0, cw - is.frameWidth) : 0;
          let nextX = prev.x + WALK_SPEED_PX * speedMul * (prev.direction === 'right' ? 1 : -1);
          let nextDir = prev.direction;
          if (nextX >= maxX) {
            nextX = maxX;
            nextDir = 'left';
          }
          if (nextX <= 0) {
            nextX = 0;
            nextDir = 'right';
          }
          return {
            ...prev,
            idleFrameIndex:
              (prev.idleFrameIndex + WALK_ANIM_SPEED) % (IDLE_COLS * IDLE_ROWS),
            x: nextX,
            direction: nextDir,
          };
        }
        return {
          ...prev,
          idleFrameIndex: (prev.idleFrameIndex + 1) % (IDLE_COLS * IDLE_ROWS),
        };
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [removeMeatTargetById]);

  // 隨機進入 idle；結束後隨機回到 walk 或 run（有肉時不切換）
  useEffect(() => {
    if (meatTargets.length > 0) return;
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      if ((mode === 'walk' || mode === 'run') && Math.random() < IDLE_CHANCE) {
        setAnimation((prev) => ({ ...prev, idleFrameIndex: 0 }));
        setMode('idle');
        const duration =
          IDLE_MIN_DURATION_MS +
          Math.random() * (IDLE_MAX_DURATION_MS - IDLE_MIN_DURATION_MS);
        idleTimeout = setTimeout(() => {
          setMode(Math.random() < 0.5 ? 'walk' : 'run');
        }, duration);
      }
    }, IDLE_CHECK_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, [mode, meatTargets.length]);

  // 移動中隨機在 walk ⇄ run 之間切換（有肉時不切換）
  useEffect(() => {
    if (meatTargets.length > 0) return;
    const interval = setInterval(() => {
      if (mode === 'walk' && Math.random() < RUN_CHANCE) setMode('run');
      if (mode === 'run' && Math.random() < RUN_CHANCE) setMode('walk');
    }, RUN_CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [mode, meatTargets.length]);

  const safeWalkIndex = frameIndex % RUN_FRAME_COUNT;
  const idleFrameCount = IDLE_COLS * IDLE_ROWS;
  const safeIdleIndex = idleFrameIndex % idleFrameCount;
  const isIdleGrid = idleSize?.cols != null && idleSize?.rows != null;
  const idleCol = isIdleGrid ? safeIdleIndex % (idleSize!.cols ?? 1) : 0;
  const idleRow = isIdleGrid ? Math.floor(safeIdleIndex / (idleSize!.cols ?? 1)) : 0;

  // 越吃越大：每吃一根放大一點，最大約 1.5 倍
  const eatScale = Math.min(1 + meatEatenCount * 0.5, 1.5);
  const transform = `translateX(${x}px) scale(${eatScale})${direction === 'left' ? ' scaleX(-1)' : ''}`;

  const goingToMeat = meatTargets.length > 0;
  // run 狀態：cat-walk.webp（含跑向肉時）
  const runStyle =
    walkSize &&
    ({
      transform,
      transformOrigin: 'bottom left',
      width: walkSize.frameWidth,
      height: walkSize.frameHeight,
      backgroundImage: 'url(/cat-walk.webp)',
      backgroundPosition: `${-Math.round(safeWalkIndex * walkSize.frameWidth)}px 0`,
      backgroundSize: `${walkSize.sheetWidth}px ${walkSize.sheetHeight}px`,
      opacity: mode === 'run' || goingToMeat ? 1 : 0,
      pointerEvents: mode === 'run' || goingToMeat ? 'auto' : 'none',
    } as const);

  // walk + idle 狀態：cat-idle.webp（walk 時加速播）
  const idleSheetStyle =
    idleSize &&
    ({
      transform,
      transformOrigin: 'bottom left',
      width: idleSize.frameWidth,
      height: idleSize.frameHeight,
      backgroundImage: 'url(/cat-idle.webp)',
      backgroundPosition: isIdleGrid
        ? `${-Math.round(idleCol * idleSize.frameWidth)}px ${-Math.round(idleRow * idleSize.frameHeight)}px`
        : '0 0',
      backgroundSize: `${idleSize.sheetWidth}px ${idleSize.sheetHeight}px`,
      opacity: !goingToMeat && (mode === 'walk' || mode === 'idle') ? 1 : 0,
      pointerEvents: !goingToMeat && (mode === 'walk' || mode === 'idle') ? 'auto' : 'none',
    } as const);

  const showCatOnBar = phase === 'onBar';
  const fallCatSize = idleSize ?? walkSize;

  return (
    <>
      {phase === 'falling' && fallCatSize && (
        <div className={styles.fallingCatWrap} aria-hidden>
          <div
            className={styles.cat}
            style={{
              width: fallCatSize.frameWidth,
              height: fallCatSize.frameHeight,
              backgroundImage: 'url(/cat-idle.webp)',
              backgroundPosition: '0 0',
              backgroundSize: `${fallCatSize.sheetWidth}px ${fallCatSize.sheetHeight}px`,
              backgroundRepeat: 'no-repeat',
              imageRendering: 'pixelated',
            }}
          />
        </div>
      )}
      {/* 🍗 由天而降：每按一下多一根，用固定層顯示 */}
      {phase === 'onBar' && meatTargets.map((meat) => (
        <div
          key={meat.id}
          className={styles.fallingMeatWrap}
          style={{ left: `${meat.x}px` }}
          aria-hidden
        >
          <span className={styles.fallingMeatEmoji}>{MEAT_EMOJI}</span>
        </div>
      ))}
      <div
        ref={barRef}
        className={styles.bar}
        style={phase === 'hidden' ? { pointerEvents: 'none', cursor: 'default' } : undefined}
        onClick={phase === 'onBar' ? setRandomMode : undefined}
        onKeyDown={phase === 'onBar' ? (e) => e.key === 'Enter' && setRandomMode() : undefined}
        role={phase === 'onBar' ? 'button' : undefined}
        tabIndex={phase === 'onBar' ? 0 : undefined}
        aria-label={phase === 'onBar' ? '點擊隨機切換貓的狀態：走路、跑步、站立' : undefined}
      >
        {showCatOnBar && walkSize && runStyle && (
          <div className={styles.cat} style={runStyle} aria-hidden />
        )}
        {showCatOnBar && idleSize && idleSheetStyle && (
          <div className={styles.cat} style={idleSheetStyle} aria-hidden />
        )}
      </div>
    </>
  );
}
