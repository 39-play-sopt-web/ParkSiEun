export const theme = {
  colors: {
    background: '#fff6ee',
    surface: '#ffffff',
    primary: '#a00a39',
    primaryHover: '#7d082d',
    text: '#4a3a30',
    textOnPrimary: '#ffffff',
    subtext: '#a08a7a',
    border: '#f0e2d6',
    error: '#d9480f',
    disabled: '#e8dcd2',
    disabledText: '#b8a596',
  },
} as const;

export type ThemeType = typeof theme;