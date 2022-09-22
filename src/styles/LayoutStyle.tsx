import styled from 'styled-components';
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '../consts/DesignConst';

export const Layout = styled.div`
  padding: 0 1rem;
  max-height: 100vh;
`;

export const PageLayout = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px);
`;
