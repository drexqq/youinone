import styled from 'styled-components';
import { HEADER_HEIGHT } from '../consts/DesignConst';

function Header() {
  return (
    <HeaderLayout>
      <div className="logo">THIS IS LOGO</div>
    </HeaderLayout>
  );
}
export default Header;

const HeaderLayout = styled.header`
  height: ${HEADER_HEIGHT}px;
`;
