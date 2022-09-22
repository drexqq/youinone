import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
 
* {
  box-sizing: border-box; 
  outline: none;
  color: #333333;
}

body{
  font-family: 'Pretendard', 'Noto Sans KR',sans-serif;
  font-size: 16px;
  overflow: hidden;
}

img{
  width: 100%;
  height: 100%;
}

a {
  text-decoration: none;
  color: #333333;
}

/* input 기본 스타일 초기화 */
input {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
}

/* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
input::-ms-clear { display: none; }

/* input type number 에서 화살표 제거 */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
}
`;

export default GlobalStyle;
