import React from 'react';
import styled from 'styled-components';

import { CurrentUserContext } from '../../CurrentUserContext';
import { COLORS } from '../../constants';

const CreateTweet = ({ setLoading }) => {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [characterCount, setCharacterCount] = React.useState(280);
  const [TweetMessage, setTweetMessage] = React.useState('');

  // Check the tweet length
  let tweetIsNull = characterCount >= 0 && characterCount < 280;

  // Removes 1 index each time a letter is entered
  const handleCharacterChange = (value) => {
    setCharacterCount(280); // Reset the value
    setCharacterCount((characterCount) => characterCount - value);
  };

  // Post a tweet
  const handleTweet = () => {
    fetch('/api/tweet', {
      method: 'POST',
      body: JSON.stringify({ status: TweetMessage }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    setLoading(true);
  };

  return (
    <div>
      <Title>
        <Container>Home</Container>
      </Title>
      <Wrapper>
        <Container>
          <InputContainer>
            <Avatar src={currentUser.avatarSrc} height={50} />
            <TextArea
              cols='60'
              placeholder="What's happening"
              onChange={(e) => {
                setTweetMessage(e.target.value.toString());
                handleCharacterChange(e.target.value.length);
              }}
              value={characterCount === 280 ? '' : TweetMessage}
            ></TextArea>
          </InputContainer>
        </Container>
        <TweetButtonWraper>
          <Count test={characterCount}>{characterCount}</Count>
          <Button
            tweetIsNull={tweetIsNull}
            onClick={() => {
              if (tweetIsNull) {
                setCharacterCount(280);
                tweetIsNull && handleTweet();
              }
            }}
          >
            Tweet
          </Button>
        </TweetButtonWraper>
      </Wrapper>
    </div>
  );
};

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;
const Title = styled.h3`
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  border-bottom: 10px solid #ddd;
`;

const Avatar = styled.img`
  border-radius: 50%;
  margin-right: 10px;
`;

const InputContainer = styled.div`
  margin: 10px;
  height: 50px;
  display: flex;
`;

const TweetButtonWraper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

const Button = styled.button`
  border-radius: 20px;
  padding: 10px 15px;
  border: none;
  font-size: 18px;
  margin: 10px;
  color: #fff;
  background-color: ${(props) =>
    props.tweetIsNull ? `${COLORS.primary}` : '#B098FF'};
  cursor: ${(props) => props.tweetIsNull && 'pointer'};
`;

const Count = styled.h3`
  color: ${(props) =>
    props.test < 0
      ? 'red'
      : props.test >= 0 && props.test < 100
      ? 'gold'
      : 'gray'};
`;

const TextArea = styled.textarea`
  font-size: 20px;
  resize: none;
  border: none;
  height: 100px;
  margin-top: 10px;
  outline: none;
  overflow: hidden;
`;

export default CreateTweet;
