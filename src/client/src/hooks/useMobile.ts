import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

/**
 * Watch the screen width and return whether it is less than or equal to a theme breakpoint.
 *
 * @param   {string}  breakpoint The theme breakpoint the screen width is less than or equal to (xs, sm, md, lg, xl)
 * @returns {boolean} Whether the screen width is less than or equal to the breakpoint
 */
export const useMobile = (breakpoint: Breakpoint) => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};
