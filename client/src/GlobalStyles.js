import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin:0;
    padding: 0;
    font-family:sans-serif;
  }

  body {
    width:60%;
    max-width:80%;
    margin: 0 auto;
  }

  a {
    text-decoration:none;
    color: #000;
  }
`;
