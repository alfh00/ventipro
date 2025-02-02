import {create} from 'zustand';

interface StoreState {
  selectedComponent: any;
  setSelectedComponent: (component: any) => void;
  view: string;
  setView: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  stageSize: { width: number, height: number };
  setStageSize: (size: { width: number, height: number }) => void;
  scale: number;
  setScale: (scale: number) => void;
  position: { x: number, y: number };
  setPosition: (position: { x: number, y: number }) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
}

export const useCanvaStore = create<StoreState>((set) => ({
  selectedComponent: null,
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  view: '2D',
  setView: (view) => set({ view }),
  darkMode: false,
  setDarkMode: (mode) => set({ darkMode: mode }),
  stageSize: { width: 0, height: 0 },
  setStageSize: (size) => set({ stageSize: size }),
  scale: 1,
  setScale: (scale) => set({ scale }),
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
  showGrid: true,
  setShowGrid: (show) => set({ showGrid: show }),
}));