export interface BasePairData {
  id: number;
  type: 'AT' | 'TA' | 'CG' | 'GC';
  y: number;
  rotation: number;
}

export const DNA_STRUCTURE = {
  RADIUS: 2,
  STRAND_GAP: 2.5,
  BASE_PAIR_HEIGHT: 0.5,
  ROTATION_STEP: Math.PI / 8,
  TOTAL_PAIRS: 20,
};

export const BASE_COLORS = {
  A: '#ff4d4d',
  T: '#4dff88',
  C: '#4da6ff',
  G: '#ffcc4d',
};

export const getBaseColors = (type: string) => {
  switch (type) {
    case 'AT': return [BASE_COLORS.A, BASE_COLORS.T];
    case 'TA': return [BASE_COLORS.T, BASE_COLORS.A];
    case 'CG': return [BASE_COLORS.C, BASE_COLORS.G];
    case 'GC': return [BASE_COLORS.G, BASE_COLORS.C];
    default: return [BASE_COLORS.A, BASE_COLORS.T];
  }
};
