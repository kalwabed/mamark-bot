import {
  Bot,
  GrammyError,
  HttpError,
  session,
} from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import {
  conversations,
  createConversation,
} from "https://deno.land/x/grammy_conversations@v1.2.0/mod.ts";
import { addBookmark, showBookmarks } from "./commands.ts";
import { MyContext } from "./types.ts";

const env = await load();
const botToken = env.BOT_TOKEN;

if (!botToken) {
  throw new Error("BOT_TOKEN is required");
}

export const bot = new Bot<MyContext>(botToken);

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.use(session({
  initial() {
    // return empty object for now
    return {};
  },
}));
bot.use(conversations());
bot.use(createConversation(addBookmark));

bot.api.setMyCommands([
  { command: "new", description: "Add new bookmark" },
  { command: "show", description: "Show all bookmarks" },
]);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("new", async (ctx) => {
  return await ctx.conversation.enter("addBookmark");
});
bot.command("show", async (ctx) => await showBookmarks(ctx));

// Start the bot.
await bot.start();
