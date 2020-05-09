import React from 'react';
import styled from 'styled-components';

import { FiShare } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { FiRepeat } from 'react-icons/fi';
import { COLORS } from '../../constants';

const TweetButtons = ({ tweet }) => {
  const [isRetweet, setIsRetweet] = React.useState(tweet.isRetweeted);
  const [isLiked, setIsLiked] = React.useState(tweet.isLiked);
  const [numLikes, setNumLikes] = React.useState(tweet.numLikes);
  const [numRetweets, setNumRetweets] = React.useState(tweet.numRetweets);

  const handleLike = () => {
    if (!isLiked) setNumLikes((numLikes) => numLikes + 1);
    else setNumLikes((numLikes) => numLikes - 1);
    setIsLiked(!isLiked);
    fetch(`/api/tweet/${tweet.id}/like`, {
      method: 'PUT',
      body: JSON.stringify({ like: !isLiked }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleRetweet = () => {
    if (!isRetweet) setNumRetweets((numRetweets) => numRetweets + 1);
    else setNumRetweets((numRetweets) => numRetweets - 1);
    fetch(`/api/tweet/${tweet.id}/retweet`, {
      method: 'PUT',
      body: JSON.stringify({ retweet: !isRetweet }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setIsRetweet(!isRetweet);
  };

  return (
    <Wrapper>
      <Message>
        <FiMessageCircle />
      </Message>
      <Retweet
        Retweet={isRetweet}
        onClick={(e) => handleRetweet()}
        id={tweet.id}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FiRepeat />
          <StatsContainer>{numRetweets}</StatsContainer>
        </div>
      </Retweet>
      <Heart Liked={isLiked} onClick={(e) => handleLike()} id={tweet.id}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaHeart />
          <StatsContainer>{numLikes}</StatsContainer>
        </div>
      </Heart>
      <Share>
        <FiShare />
      </Share>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  padding-left: 100px;
  padding-bottom: 10px;
`;

const Button = styled.button`
  background: none;
  font-size: 20px;
  margin-right: 100px;
  font-weight: bold;
  border-radius: 100%;
  padding: 7px 7px;
  border: none;
  cursor: pointer;
  transition: 500ms;
`;

const StatsContainer = styled.span`
  font-size: 14px;
  margin-left: 5px;
`;

const Message = styled(Button)`
  &:hover {
    background: ${COLORS.background};
    color: ${COLORS.primary};
  }
`;

const Retweet = styled(Button)`
  color: ${(props) => props.Retweet && '#99BDB8'};
  &:hover {
    background: ${COLORS.retweet};
  }
`;

const Share = styled(Button)`
  &:hover {
    background: ${COLORS.share};
  }
`;

const Heart = styled(Button)`
  color: ${(props) => props.Liked && '#E0245E'};
  &:hover {
    background-color: ${COLORS.eart};
  }
`;

export default TweetButtons;
