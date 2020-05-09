import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

// Import Components
import HomeFeed from './components/HomeFeed';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Bookmarks from './components/Bookmarks';
import TweetDetails from './components/TweetDetails';
import Sidebar from './components/Sidebar';
import GlobalStyles from './GlobalStyles';
import Error from './components/Error';
// Import Context
import { CurrentUserContext } from './CurrentUserContext';

// Import Image
import SpinnerSrc from './spinner.gif';

const App = () => {
  const { currentUser, status, error } = React.useContext(CurrentUserContext);
  return (
    <Wrapper>
      <GlobalStyles />

      <BrowserRouter>
        <Sidebar />
        {error ? (
          <Error />
        ) : status === 'loading' ? (
          <SpinnerWrapper>
            <Spinner src={SpinnerSrc} alt='error'></Spinner>
          </SpinnerWrapper>
        ) : (
          <Container>
            <Switch>
              <Route exact path='/'>
                <HomeFeed currentUser={currentUser} status={status} />
              </Route>
              <Route exact path='/notifications'>
                <Notifications />
              </Route>
              <Route exact path='/bookmarks'>
                <Bookmarks />
              </Route>
              <Route exact path='/tweet/:tweetId'>
                <TweetDetails />
              </Route>
              <Route exact path='/:profileId'>
                <Profile />
              </Route>
            </Switch>
          </Container>
        )}
      </BrowserRouter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 20px;
  position: relative;
`;

const Container = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  margin-left: 20px;
`;

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
export default App;
