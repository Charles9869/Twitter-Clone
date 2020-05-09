import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Tweet from '../Tweet';
import SpinnerSrc from '../../spinner.gif';
import { FaArrowLeft } from 'react-icons/fa';
import { CurrentUserContext } from '../../CurrentUserContext';

const TweetDetails = () => {
  const { tweetId } = useParams();
  const [currentTweet, setCurrentTweet] = React.useState({});
  const { SetError } = React.useContext(CurrentUserContext);

  const history = useHistory();
  React.useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentTweet(data.tweet);
      })
      .catch((err) => SetError(true));
  }, []);

  const goBackToPage = (e) => {
    if (e.key === 'Enter') history.goBack();
    else if (e.type === 'click') history.goBack();
  };

  return (
    <div>
      <Title>
        <Container>
          <div
            tabIndex='0'
            onClick={(e) => goBackToPage(e)}
            onKeyPress={(e) => goBackToPage(e)}
          >
            <Arrow></Arrow>
            Meow
          </div>
        </Container>
      </Title>
      {Object.values(currentTweet).length ? (
        <Tweet tweet={currentTweet} />
      ) : (
        <SpinnerWrapper>
          <Spinner src={SpinnerSrc}></Spinner>
        </SpinnerWrapper>
      )}
    </div>
  );
};

const SpinnerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Spinner = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const Arrow = styled(FaArrowLeft)`
  color: gray;
  margin-right: 10px;
`;
export default TweetDetails;
