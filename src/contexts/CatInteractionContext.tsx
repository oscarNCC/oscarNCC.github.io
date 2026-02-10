import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export type MeatTarget = { id: number; x: number };

type CatInteractionContextValue = {
  avatarClickCount: number;
  onAvatarClick: () => void;
  meatTargets: MeatTarget[];
  meatEatenCount: number;
  addMeatTarget: (x: number) => void;
  removeMeatTargetById: (id: number) => void;
};

const CatInteractionContext = createContext<CatInteractionContextValue | null>(
  null
);

export function CatInteractionProvider({ children }: { children: ReactNode }) {
  const [avatarClickCount, setAvatarClickCount] = useState(0);
  const [meatTargets, setMeatTargets] = useState<MeatTarget[]>([]);
  const [meatEatenCount, setMeatEatenCount] = useState(0);

  const onAvatarClick = useCallback(() => {
    setAvatarClickCount((c) => c + 1);
  }, []);

  const MAX_MEATS = 5;

  const addMeatTarget = useCallback((x: number) => {
    setMeatTargets((prev) => {
      if (prev.length >= MAX_MEATS) return prev;
      return [...prev, { id: Date.now(), x }];
    });
  }, []);

  const removeMeatTargetById = useCallback((id: number) => {
    setMeatTargets((prev) => prev.filter((m) => m.id !== id));
    setMeatEatenCount((c) => c + 1);
  }, []);

  const value: CatInteractionContextValue = {
    avatarClickCount,
    onAvatarClick,
    meatTargets,
    meatEatenCount,
    addMeatTarget,
    removeMeatTargetById,
  };

  return (
    <CatInteractionContext.Provider value={value}>
      {children}
    </CatInteractionContext.Provider>
  );
}

export function useCatInteraction() {
  const ctx = useContext(CatInteractionContext);
  if (ctx == null) {
    throw new Error(
      'useCatInteraction must be used within CatInteractionProvider'
    );
  }
  return ctx;
}
