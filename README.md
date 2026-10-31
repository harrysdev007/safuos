# SAFUOS

A desktop-style website for $SAFUOS on BNB Chain. Includes draggable windows, application launcher, taskbar, terminal, token information, the intended SAFU Fund recipient and a donation explorer.

## Run

Node.js 22 or later. No dependencies required.

```sh
npm start
```

Open http://localhost:3000. The server supports the `PORT` environment variable. Run `npm run check` for JavaScript syntax checks.

## Static hosting

Publish the `public/` directory. No build step is required.

## Project status

The token is in preparation. Contract, fees and transfer route are not finalized. No wallet connection, donation transaction or live on-chain data feed is implemented. The SAFU recipient is documented on Ethereum. The project is independent of Binance.

Window content uses measured pages to fit the available space while retaining large, bold typography.
