import { Bot, session } from "https://deno.land/x/grammy@v1.22.4/mod.ts";
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

const bot = new Bot<MyContext>(botToken);

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
bot.command("show", async (ctx) => {
  return await showBookmarks(ctx);
});

// Start the bot.
await bot.start();
