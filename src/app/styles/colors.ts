export const COLORS = {
    blue: '#5E2BFF',
    red: '#FB3640',
    green: '#86CB92',
    yellow: '#FFD166',
    purple: '#C04CFD',
} as const;

export type Color = typeof COLORS[keyof typeof COLORS];