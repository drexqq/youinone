import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { FOOTER_HEIGHT } from '../consts/DesignConst';

import IconTodo from '../assets/icons/todo.svg';
import IconMemo from '../assets/icons/memo.svg';
import IconWeather from '../assets/icons/weather.svg';
import IconTrans from '../assets/icons/translate.svg';
import IconAll from '../assets/icons/all.svg';
import IconTodoActive from '../assets/icons/todo-active.svg';
import IconMemoActive from '../assets/icons/memo-active.svg';
import IconWeatherActive from '../assets/icons/weather-active.svg';
import IconTransActive from '../assets/icons/translate-active.svg';
import IconAllActive from '../assets/icons/all-active.svg';

function Footer() {
  const [page, setPage] = useState<string>('');
  const location = useLocation();
  const path = location.pathname.replace('/', '');
  const pageList = [
    {
      path: '/todo',
      icon: page === 'todo' ? IconTodoActive : IconTodo,
      text: '할일',
    },
    {
      path: '/memo',
      icon: page === 'memo' ? IconMemoActive : IconMemo,
      text: '메모',
    },
    {
      path: '/weather',
      icon: page === 'weather' ? IconWeatherActive : IconWeather,
      text: '날씨',
    },
    {
      path: '/translate',
      icon: page === 'translate' ? IconTransActive : IconTrans,
      text: '번역',
    },
    {
      path: '/all',
      icon: page === 'all' ? IconAllActive : IconAll,
      text: '전체',
    },
  ];
  useEffect(() => {
    setPage(path);
  }, [location]);
  return (
    <FooterLayout>
      {pageList.map(({ path, icon, text }) => {
        return (
          <FooterButton
            to={path}
            key={path}
            className={`/${page}` === path ? 'active' : ''}
          >
            <img src={icon} alt={`${path}-icon`} />
            <p>{text}</p>
          </FooterButton>
        );
      })}
    </FooterLayout>
  );
}
export default Footer;

const FooterLayout = styled.footer`
  display: flex;
  border-top: 1px solid #eee;
  height: ${FOOTER_HEIGHT}px;
`;

const FooterButton = styled(Link)`
  flex-basis: 20%;
  padding-top: 16px;
  text-align: center;
  color: #adadad;
  img {
    max-width: 25px;
    height: auto;
  }
  &.active {
    p {
      color: #333333;
    }
  }
  p {
    padding-top: 4px;
    ${({ theme }) => theme.font.FOOTER_CSS};
    color: inherit;
  }
`;
