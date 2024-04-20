# Mamark bot

Telegram bot for me to be able to interact with my public personal [bookmarks](https://www.kalwabed.com/bookmarks).

## Tech
- Deno
- Grammy
- Turso

## How it works

The idea is that I can save my personal bookmarks in a simple way through a Telegram bot and consume them on [my web page](https://www.kalwabed.com/bookmarks).

## Usage

**Make sure you already have the required environment files `.env`**
```sh
# you can just copy the examples.
cp .env.example .env
```

- `TURSO_DATABASE_URL`: Your Turso database URL.
- `TURSO_AUTH_TOKEN`: Your Turso auth token.
- `BOT_TOKEN`: Refer to [docs](https://core.telegram.org/bots#how-do-i-create-a-bot) to create your own bot and retrieve the token here.

### Run locally
Make sure to install Deno: https://deno.land/manual/getting_started/installation
Then start the project:

```
deno task dev
```

You can check your bot.

### Deploy
Deploy it via Fly.

```sh
flyctl deploy
```

[Learn more](https://grammy.dev/hosting/fly#hosting-fly).

## License
MIT
