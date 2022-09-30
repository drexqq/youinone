import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HEADER_HEIGHT } from '../consts/DesignConst';

function Header() {
  return (
    <HeaderLayout>
      <Link to={'/'} className="logo">
        THIS IS LOGO
      </Link>
    </HeaderLayout>
  );
}
export default Header;

const HeaderLayout = styled.header`
  height: ${HEADER_HEIGHT}px;
`;
