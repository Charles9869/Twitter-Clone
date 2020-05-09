import React from 'react';
import styled from 'styled-components';
import Tweet from '../Tweet';
import { COLORS } from '../../constants';

import { CurrentUserContext } from '../../CurrentUserContext';
const ProfileBar = ({ profileId }) => {
  const [TweetByUser, setTweetByUser] = React.useState({});
  const [TweetButton, setTweetButton] = React.useState(true);
  const [MediaButton, setMediaButton] = React.useState(false);
  const [LikeButton, setLikeButton] = React.useState(false);
  const [tweets, setTweets] = React.useState({});
  const { SetError } = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        const { tweetsById } = data;
        setTweetByUser(tweetsById);
      })
      .catch((err) => SetError(true));

    fetch('/api/me/home-feed')
      .then((res) => res.json())
      .then((data) => {
        const { tweetsById } = data;
        setTweets(tweetsById);
      });
  }, [profileId]);

  return (
    <Active>
      <Wrapper>
        <Button
          onClick={() => {
            setTweetButton(!TweetButton);
            setMediaButton(false);
            setLikeButton(false);
          }}
          className={TweetButton ? 'active' : null}
        >
          Tweets
        </Button>
        <Button
          onClick={() => {
            setMediaButton(!MediaButton);
            setTweetButton(false);
            setLikeButton(false);
          }}
          className={MediaButton ? 'active' : null}
        >
          Media
        </Button>
        <Button
          onClick={() => {
            setLikeButton(!LikeButton);
            setMediaButton(false);
            setTweetButton(false);
          }}
          className={LikeButton ? 'active' : null}
        >
          Likes
        </Button>
      </Wrapper>
      <TweetsWrapper>
        {TweetButton &&
          TweetByUser &&
          Object.values(TweetByUser).map((tweet) => {
            return <Tweet key={tweet.id} tweet={tweet} />;
          })}
      </TweetsWrapper>
      {LikeButton &&
        Object.values(tweets).map((tweet) => {
          if (tweet.isLiked) return <Tweet key={tweet.id} tweet={tweet} />;
        })}
      {MediaButton && <h1 style={{ textAlign: 'center' }}>No Media</h1>}
    </Active>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.div`
  width: 33%;
  text-align: center;
  font-weight: bold;
  padding-bottom: 10px;
  cursor: pointer;
`;

const TweetsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Active = styled.div`
  .active {
    color: ${COLORS.primary};
    border-bottom: 5px solid ${COLORS.primary};
  }
`;

export default ProfileBar;
