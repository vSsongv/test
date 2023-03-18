import React from 'react';
import styled from 'styled-components';
import { mainGradient } from '../../styles/styleUtil';

const Container = styled.div`
  width: 850px;
  height: 85px;
  border: 1px solid rgb(168, 168, 168);
  border-radius: 10px;
  position: relative;
  margin: auto;
  margin-top: 60px;
`;

const BottomGradient = styled.div`
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  height: 27px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${mainGradient};
`;

const Type = styled.span`
  font-family: 'NanumGothic';
  font-size: 12px;
  font-weight: 400;
  color: white;
`;

const Wrapper = styled.div`
  width: 848px;
  height: 80px;
  display: flex;
`;

const TypeButton = styled.button`
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: white;
  flex: 1;
  :hover {
    border: 1px solid #3c02bb;
  }
`;

const QuestionTypeNum = () => {
  return (
    <Container>
      <Wrapper>
        <TypeButton>1</TypeButton>
        <TypeButton>2</TypeButton>
        <TypeButton>3</TypeButton>
      </Wrapper>
      <BottomGradient>
        <Type>매칭 전</Type>
        <Type>진행 중</Type>
        <Type>완료</Type>
      </BottomGradient>
    </Container>
  );
};

export default QuestionTypeNum;
