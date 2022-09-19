import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
 
* {
  box-sizing: border-box; 
  outline: none;
}

body{
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
}

img{
  width: 100%;
  height: 100%;
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