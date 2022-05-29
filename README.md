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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
