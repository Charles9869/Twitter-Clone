import React from 'react';
import styled from 'styled-components';

import CreateTweet from './CreateTweet';
import Tweet from '../Tweet';
import SpinnerSrc from '../../spinner.gif';

import { CurrentUserContext } from '../../CurrentUserContext';
const HomeFeed = ({ currentUser, status }) => {
  // All States
  const [Tweets, setTweets] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const { SetError } = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    fetch('/api/me/home-feed')
      .then((res) => res.json())
      .then((data) => {
        setTweets(data.tweetsById);
        setLoading(false);
      })
      .catch((err) => SetError(true));
  }, [loading]); // Reload the compoents if loading changes

  return (
    <Wrapper>
      <CreateTweet setLoading={setLoading} />
      {loading ? (
        <SpinnerWrapper>
          <Spinner src={SpinnerSrc} />
        </SpinnerWrapper>
      ) : (
        <TweetsWrapper>
          {Object.values(Tweets).map((tweet) => {
            return <Tweet key={tweet.id} tweet={tweet} />;
          })}
        </TweetsWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Spinner = styled.img`
  width: 40px;
  height: 40px;
`;

const TweetsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export default HomeFeed;
