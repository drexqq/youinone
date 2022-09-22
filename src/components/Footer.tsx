import { Link } from 'react-router-dom';
import styled from 'styled-components';

import IconTodoActive from '../assets/icons/todo-active.svg';
import IconMemo from '../assets/icons/memo.svg';
import IconMemoIcon from '../assets/icons/memo-active.svg';
import IconWeather from '../assets/icons/weather.svg';
import IconWeatherActive from '../assets/icons/weather-active.svg';
import IconTrans from '../assets/icons/translate.svg';
import IconTransActive from '../assets/icons/translate-active.svg';
import IconAll from '../assets/icons/all.svg';
import IconAllActive from '../assets/icons/all-active.svg';

function Footer() {
  return (
    <FooterLayout>
      <FooterButton to="/todo">
        <img src={IconTodoActive} alt="todolist" />
        <p>할일</p>
      </FooterButton>
      <FooterButton to="/memo">
        <img src={IconMemo} alt="todolist" />
        <p>메모</p>
      </FooterButton>
      <FooterButton to="/weather">
        <img src={IconWeather} alt="todolist" />
        <p>날씨</p>
      </FooterButton>
      <FooterButton to="/translate">
        <img src={IconTrans} alt="todolist" />
        <p>번역</p>
      </FooterButton>
      <FooterButton to="/all">
        <img src={IconAll} alt="todolist" />
        <p>전체</p>
      </FooterButton>
    </FooterLayout>
  );
}
export default Footer;

const FooterLayout = styled.footer`
  display: flex;
  border-top: 1px solid #eee;
  height: 90px;
`;

const FooterButton = styled(Link)`
  flex-basis: 20%;
  padding-top: 15px;
  text-align: center;
  img {
    max-width: 25px;
    height: auto;
  }
  p {
    padding-top: 4px;
    font-size: 0.875rem;
  }
`;
