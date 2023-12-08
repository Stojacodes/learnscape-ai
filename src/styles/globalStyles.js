// styles/globalStyles.js
import { css } from '@emotion/react';

export const globalStyles = css`
  :root {
    --color-white: #FFFFFF;
    --color-grey-4: #CED4DA;
    --color-grey-5: #ADB5BD;
    --color-grey-6: #6C757D;
    --color-primary: #0D6EFD;
    --color-secondary: #6C757D;
    --color-background: #E9ECEF;
    --text-color-interactive-light: #0D6EFD;
    --text-color-primary-dark: #FFFFFF;
    --text-color-primary-light: #2F353F;
    --header-height: 60px; // Example height, adjust as needed
  }

 
  body {
    background-color: var(--color-background);
    color: var(--text-color-primary-light);
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-weight: 300;
    line-height: normal; /* You might want to set a specific value here */
  }

  a {
    color: var(--text-color-interactive-light);
    font-weight: 300;
    font-size: 16px;
    /* ... */
  }

  /* Other styles */
`;
