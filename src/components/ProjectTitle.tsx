import styled from 'styled-components';

interface IProjectTitle {
  name: string;
}

function ProjectTitle({ name }: IProjectTitle) {
  return <TitleLayout>{name}</TitleLayout>;
}

export default ProjectTitle;

const TitleLayout = styled.h2`
  ${({ theme }) => theme.font.P_TITLE};
`;
