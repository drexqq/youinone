import styled from 'styled-components';
import { FOOTER_HEIGHT, PAGE_TITLE_PADDING } from '../consts/DesignConst';

export const Layout = styled.div`
  padding: 0 1rem;
  max-height: 100vh;
`;

export const PageLayout = styled.div`
  padding-top: ${PAGE_TITLE_PADDING}px;
  height: calc(100vh - ${FOOTER_HEIGHT}px);
`;
