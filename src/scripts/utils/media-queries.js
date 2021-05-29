import WINDOW_SIZES from '../const/window_sizes';

const {
  EXTRA_SMALL, SMALL, MEDIUM, LARGE, EXTRA_LARGE,
} = WINDOW_SIZES;

const mediaQueries = {
  isXsAndLarger: () => (
    window.matchMedia(`(min-width: ${EXTRA_SMALL.min}px)`).matches
  ),
  isSmallAndLarger: () => (
    window.matchMedia(`(min-width: ${SMALL.min}px)`).matches
  ),
  isMediumAndLarger: () => (
    window.matchMedia(`(min-width: ${MEDIUM.min}px)`).matches
  ),
  isLargeAndLarger: () => (
    window.matchMedia(`(min-width: ${LARGE.min}px)`).matches
  ),
  isXlAndLarger: () => (
    window.matchMedia(`(min-width: ${EXTRA_LARGE.min}px)`).matches
  ),
};

export default mediaQueries;
