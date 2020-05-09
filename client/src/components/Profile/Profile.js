import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from '../../CurrentUserContext';
import { COLORS } from '../../constants';
import { TiLocationOutline } from 'react-icons/ti';
import { FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';
import ProfileBar from '../ProfileBar';

const Profile = () => {
  const { SetError } = React.useContext(CurrentUserContext);
  const [profileInfo, setProfileInfo] = React.useState({});
  const { profileId } = useParams();

  React.useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => res.json())
      .then((data) => setProfileInfo(data.profile))
      .catch((err) => SetError(true));
  }, [profileId]);

  return (
    <div>
      <PictureInfo>
        <Banner src={profileInfo.bannerSrc}></Banner>
        <Avatar src={profileInfo.avatarSrc}></Avatar>
        {profileInfo.isBeingFollowedByYou ? (
          <FollowingButton primary>Following</FollowingButton>
        ) : (
          <FollowingButton primary>Follow</FollowingButton>
        )}
      </PictureInfo>
      <Info>
        <Container>
          <DisplayName>{profileInfo.displayName}</DisplayName>
          <HandleName>@{profileInfo.handle}</HandleName>
          {profileInfo.isFollowingYou && <Test>Follows you</Test>}
          <Bio>{profileInfo.bio}</Bio>

          <Location>
            {profileInfo.location && (
              <>
                <TiLocationOutline />
                <Joined>{profileInfo.location}</Joined>
              </>
            )}

            {profileInfo.joined && (
              <>
                <FiCalendar />
                <Joined>
                  {format(Date.parse(profileInfo.joined), 'LLL yyyy')}
                </Joined>
              </>
            )}
          </Location>
          <FollowContainer>
            <Follow>
              <NumFollow>{profileInfo.numFollowing}</NumFollow>
              Following
            </Follow>
            <Follow>
              <NumFollow>{profileInfo.numFollowers}</NumFollow>
              Followers
            </Follow>
          </FollowContainer>
        </Container>
      </Info>
      <ProfileBar profileId={profileId} />
    </div>
  );
};

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;
const PictureInfo = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
`;

const Info = styled.div`
  margin-bottom: 40px;
`;

const Banner = styled.img`
  width: 100%;
  height: 300px;
`;

const Avatar = styled.img`
  position: absolute;
  left: 20px;
  top: 210px;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  border: 5px solid #fff;
`;

const FollowingButton = styled.button`
  background-color: ${(props) => (props.primary ? `${COLORS.primary}` : 'red')};
  color: #fff;
  border-radius: 20px;
  outline: none;
  border: none;
  padding: 10px 15px;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 320px;
  max-width: 150px;
  font-size: 18px;
`;

const DisplayName = styled.h3`
  font-weight: bold;
`;

const HandleName = styled.span`
  color: gray;
  font-size: 15px;
  font-weight: bold;
  padding: 2px;
`;

const Test = styled.span`
  background-color: #e8e9f0;
  color: gray;
  border-radius: 5px;
  margin-left: 10px;
  padding: 2px;
`;

const Bio = styled.p`
  margin-top: 10px;
`;

const Location = styled.p`
  color: gray;
  font-weight: bold;
  margin-top: 10px;
`;

const Joined = styled.span`
  margin-left: 10px;
  margin-right: 10px;
`;

const FollowContainer = styled.div`
  margin-top: 10px;
  margin-left: 0;
  text-align: left;
`;
const Follow = styled.span`
  color: gray;
  font-weight: bold;
  margin-right: 10px;
`;

const NumFollow = styled.span`
  color: #000;
  margin-right: 5px;
`;
export default Profile;
