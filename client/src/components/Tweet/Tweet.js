import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { FaRetweet } from 'react-icons/fa';

import TweetButtons from '../TweetButtons';

const Tweet = ({ tweet }) => {
  const history = useHistory();

  const goToUserPage = (e) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      history.push(`/${tweet.author.handle}`);
    } else if (e.type === 'click') {
      e.stopPropagation();
      history.push(`/${tweet.author.handle}`);
    }
  };

  const goToTweetPage = (e) => {
    if (e.key === 'Enter') history.push(`/tweet/${tweet.id}`);
    else if (e.type === 'click') {
      e.stopPropagation();
      history.push(`/tweet/${tweet.id}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Wrapper
        tabIndex='0'
        data-component={tweet.id}
        id={tweet.id}
        onClick={(e) => goToTweetPage(e)}
        onKeyPress={(e) => goToTweetPage(e)}
        aria-label={'View Tweet'}
      >
        <Row>
          <Avatar
            tabIndex='0'
            src={tweet.author.avatarSrc}
            onClick={(e) => goToUserPage(e)}
            onKeyPress={(e) => goToUserPage(e)}
          />
        </Row>
        <Row style={{ width: '100%' }}>
          <Column>
            {tweet.retweetFrom && (
              <Retweeted>
                <FaRetweet style={{ marginRight: '10px' }} />
                <span>{tweet.retweetFrom.displayName} Retweeted</span>
              </Retweeted>
            )}
          </Column>
          <Column style={{ display: 'flex', flexDirection: 'row' }}>
            <DisplayName
              tabIndex='0'
              onClick={(e) => goToUserPage(e)}
              onKeyPress={(e) => goToUserPage(e)}
            >
              {tweet.author.displayName}
            </DisplayName>
            <HandleName>@{tweet.author.handle}</HandleName>
            <Timestamp>
              {format(Date.parse(tweet.timestamp), 'MMM do')}
            </Timestamp>
          </Column>
          <Column>
            <TweetStatus>{tweet.status}</TweetStatus>
            {tweet.media.length ? (
              <MediaWrapper>
                <Media src={tweet.media[0].url} alt='media'></Media>
              </MediaWrapper>
            ) : null}
          </Column>
        </Row>
      </Wrapper>
      <TweetButtons tweet={tweet} />
    </div>
  );
};

const Wrapper = styled.span`
  padding: 20px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const Row = styled.div`
  padding: 10px;
`;

const Column = styled.div``;

const Avatar = styled.img`
  border-radius: 50%;
  height: 50px;
`;

const DisplayName = styled.span`
  font-weight: bold;
  margin-right: 10px;
  &:hover {
    border-bottom: 1px solid #000;
  }
`;

const HandleName = styled.span`
  color: gray;
  margin-right: 10px;
`;

const Timestamp = styled.span`
  color: gray;
`;

const MediaWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const Media = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
`;

const TweetStatus = styled.p`
  margin-top: 10px;
  max-width: 300px;
`;

const Retweeted = styled.span`
  color: gray;
  display: flex;
  align-items: center;
`;

export default Tweet;
