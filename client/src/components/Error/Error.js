import React from 'react';
import styled from 'styled-components';
import { FaBomb } from 'react-icons/fa';

const Error = () => {
  return (
    <Wrapper>
      <Bomb></Bomb>
      <h1>An unknown error has occured</h1>
      <ErrorMessage>
        Please try refreshing the page, or{' '}
        <ContactLink href='#' onClick={() => window.location.reload()}>
          contact support{' '}
        </ContactLink>
        if the problem persists
      </ErrorMessage>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  width: 80%;
  margin: 0 auto;
  height: 250px;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Bomb = styled(FaBomb)`
  font-size: 40px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  margin-top: 20px;
`;
const ContactLink = styled.a`
  color: blue;
`;
export default Error;
