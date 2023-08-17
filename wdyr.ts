import * as React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (import.meta.env.DEV) {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// Solution from https://github.com/welldone-software/why-did-you-render/issues/243#issuecomment-1132892461
