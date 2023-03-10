import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
  ${reset} 

    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
        
        
    }
    h1,h2,h3 {
      font-family:'NanumSquareNeo-bold';
    }

    h4,h5{
      font-family:'NanumSquareNeo-Regular';
    }


    html{
        font-size: 62.5%; 
        @media only screen and (max-width: 75em) {
          font-size: 50%;
        }

        @media only screen and (max-width: 50.25em) {
          font-size: 40%;
        }

        @media only screen and (max-width: 31em) {
          font-size: 27%;
        }
    }
    body{
        font-family: 'NanumSquareNeo-Regular';
        background-color: #F7F7F7;
        font-size:1.6rem;
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
`;

export default GlobalStyles;
