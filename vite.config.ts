import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@welldone-software/why-did-you-render', // <-----
    }),
    eslintPlugin(),
  ],
});

// solution from https://github.com/welldone-software/why-did-you-render/issues/243#issuecomment-1132892461

// export default defineConfig({
//   plugins: [
//     checker({ typescript: true }),
//     svgr(),
//     react({
//       jsxImportSource: '@welldone-software/why-did-you-render', // <-----
//     }),
//   ],
//   resolve: {
//     alias: {
//       // Needed for `useSelector` tracking in wdyr.tsx: https://github.com/welldone-software/why-did-you-render/issues/85
//       'react-redux': 'react-redux/dist/react-redux.js',
//     },
//   },
// });
