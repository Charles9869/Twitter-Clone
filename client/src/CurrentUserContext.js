import React from 'react';

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState('loading');
  const [error, SetError] = React.useState(false);

  // Fetch the user data from the API (/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`
  React.useEffect(() => {
    fetch('/api/me/profile')
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data.profile);
        setStatus('idle');
      })
      .catch(err => SetError(true));
  }, [status]);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, status, setStatus, error, SetError }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
