import { css } from 'styled-components';

const BOLD = 700;
const MIDEUM = 600;

const font = {
  P_TITLE: css`
    font-size: 1.5rem;
    font-weight: ${BOLD};
    line-height: 30px;
  `,
  TODO_ITEM: css`
    font-size: 1rem;
    font-weight: ${BOLD};
    line-height: 18px;
  `,

  FOOTER_CSS: css`
    font-size: 0.875rem;
    font-weight: ${MIDEUM};
    line-height: 14px;
  `,
};

export default font;
