import { useCallback, useRef, forwardRef } from 'react';
import styled from 'styled-components';

interface ITextAreaProps {
  id: number;
  value: string;
  setItem(id: number, value: string): void;
  setAddContent(content: string): void;
}

function AutoHeightTextArea(
  { id, value, setItem, setAddContent }: ITextAreaProps,
  ref: HTMLTextAreaElement | any,
) {
  const textRef = ref ? ref : useRef<HTMLTextAreaElement>(null);
  const heightHandler = useCallback(() => {
    if (textRef.current) {
      if (textRef.current.scrollHeight < 32) {
        textRef.current.style.height = textRef.current.scrollHeight + 'px';
      }
      if (id !== -1) {
        setItem(id, textRef.current.value);
      } else {
        setAddContent(textRef.current.value);
      }
    }
  }, []);
  return (
    <TextAreaWrap
      ref={textRef}
      defaultValue={value}
      placeholder="Add Todos..."
      onKeyDown={heightHandler}
      onKeyUp={heightHandler}
    />
  );
}

const TextAreaWrap = styled.textarea`
  display: block;
  width: 100%;
  word-break: break-all;
  ${({ theme }) => theme.font.TODO_ITEM};
  height: 16px;
`;

export default forwardRef(AutoHeightTextArea);
