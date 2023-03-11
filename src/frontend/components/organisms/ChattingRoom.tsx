import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { border, boxShadow } from '../../styles/styleUtil';
import ChattingInput from '../molescules/ChattingInput';
import Message from '../molescules/Message';

const ChattingRoomContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 5px;
  width: 43vw;
  height: 100%;
  background-color: white;
  box-shadow: ${boxShadow};
`;

const ChattingBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 595px;
  width: 97%;
  ${border(2)}
`;

const ChattingRoom = () => {
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messageRef.current?.focus();
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e);
  };
  return (
    <ChattingRoomContainer>
      <ChattingBox>
        <Message />
      </ChattingBox>
      <ChattingInput handleFile={handleFile} messageRef={messageRef} />
    </ChattingRoomContainer>
  );
};

export default ChattingRoom;
