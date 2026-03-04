import { Theme } from '../../../enum/theme/theme.enum';

export const themeList: Theme[] = [Theme.LIGHT, Theme.DARK, Theme.NEUTRAL];

export const themeIcons: Record<Theme, string> = {
  [Theme.LIGHT]: 'light_mode',
  [Theme.DARK]: 'dark_mode',
  [Theme.NEUTRAL]: 'contrast',
};
