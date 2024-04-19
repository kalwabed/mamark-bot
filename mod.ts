import {
  Bot,
  webhookCallback,
} from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { UserFromGetMe } from "https://deno.land/x/grammy@v1.22.4/types.ts";

interface Environment {
  BOT_TOKEN: string;
}

let botInfo: UserFromGetMe | undefined = undefined;

export default {
  async fetch(request: Request, env: Environment) {
    try {
      const bot = new Bot(env.BOT_TOKEN, { botInfo });

      if (botInfo === undefined) {
        await bot.init();
        botInfo = bot.botInfo;
      }

      bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
      bot.on("message", (ctx) => ctx.reply("Got another message!"));

      const cb = webhookCallback(bot, "cloudflare-mod");

      return await cb(request);
    } catch (e) {
      return new Response(e.message);
    }
  },
};
