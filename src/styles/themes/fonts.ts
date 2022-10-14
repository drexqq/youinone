import { css } from 'styled-components';

const BOLD = 700;
const MEDIUM = 600;
const NORMAL = 500;

const font = {
  BOLD: css`
    font-weight: ${BOLD};
  `,
  MEDIUM: css`
    font-weight: ${MEDIUM};
  `,
  P_TITLE: css`
    font-size: 1.5rem;
    font-weight: ${BOLD};
    line-height: 30px;
  `,
  TODO_ITEM: css`
    font-size: 0.875rem;
    font-weight: ${NORMAL};
    line-height: 1;
  `,

  FOOTER_CSS: css`
    font-size: 0.875rem;
    font-weight: ${MEDIUM};
    line-height: 14px;
  `,
};

export default font;
