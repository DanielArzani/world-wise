/**
 * How to use
 * import styled from 'styled-components';
 * import media from '../utils/mediaQueries';
 *
 * const Box = styled.div`
 * background: blue;
 *
 *  @media ${media.md} {
 *    background: red;
 *  }
 * `;
 * */

type MediaQuerySizes = {
  xsm: number;
  sm: number;
  md: number;
  l: number;
  xl: number;
};

type MediaQueries = {
  [key in keyof MediaQuerySizes]: string;
};

const sizes: MediaQuerySizes = {
  xsm: 320,
  sm: 640,
  md: 768,
  l: 1024,
  xl: 1280,
};

const media: MediaQueries = Object.keys(sizes).reduce((acc, label) => {
  const key = label as keyof MediaQuerySizes;
  acc[key] = `(min-width: ${sizes[key]}px)`;
  return acc;
}, {} as MediaQueries);

export default media;
