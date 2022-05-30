This is a serverless [Next.js](https://nextjs.org/) project built to run on [Firebase/Google functions](https://firebase.google.com/docs/functions).

## Getting Started

Install the dependencies, and update your environment variables in `src/client/.env`.

Initialize `Firebase` project and select Hosting only:

```bash
firebase init
...
(*) Hosting: Set up GitHub Action deploys.
```

Run the `Nextjs` development server and open [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
# or
yarn dev
```

Run the `Firebase functions / hosting` local server and open [http://localhost:5000](http://localhost:5000):

```bash
npm run serve
# or
yarn serve
```

Deploy to `Firebase functions / hosting`:

```bash
npm run deploy
# or
yarn deploy
```

You can start editing the app by modifying the files in the `src/client` folder.

## Features

- [x] [`firebase`](https://github.com/firebase/firebase-js-sdk) email / password authentication
- [x] session management (idle timer)
- [x] [`notistack`](https://github.com/iamhosseindhv/notistack) alerts
- [x] [`redux`](https://github.com/reduxjs/redux)
- [x] [`mui core`](https://github.com/mui/material-ui) ui library
- [x] [`styled-components`](https://github.com/styled-components/styled-components)
- [x] theme selection (dark / light mode)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Firebase Documentation](https://firebase.google.com/docs) - learn about Firebase features and API.
- [MUI Documentation](https://mui.com/material-ui/getting-started/installation/) - learn about MUI features and API.
