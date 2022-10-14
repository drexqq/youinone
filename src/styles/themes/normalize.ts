import { css } from 'styled-components';

const scrollbar = {
  HIDE: css`
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
};

export default scrollbar;
