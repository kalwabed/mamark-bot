import {
  Bot,
  Context,
  session,
} from "https://deno.land/x/grammy@v1.22.4/mod.ts";
import { load } from "https://deno.land/std@0.223.0/dotenv/mod.ts";
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from "https://deno.land/x/grammy_conversations@v1.2.0/mod.ts";

type MyContext = Context & ConversationFlavor;
type MyConversation = Conversation<MyContext>;

async function movie(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply("Can you tell me what this bookmark is called??");
  const title = await conversation.form.text();
  await ctx.reply(
    "Can you give me a brief overview of what this bookmark is about?",
  );
  const summary = await conversation.form.text();
  await ctx.reply(`Give me the URL for the bookmark ${title}`);
  const url = await conversation.form.text();
  await ctx.reply("Are there any keywords for this bookmark?");
  const tags = await conversation.form.text();

  return await ctx.reply(
    `summary: ${summary}, title: ${title}, url: ${url}, tags: ${tags}`,
  );
}

const env = await load();
const botToken = env.BOT_TOKEN;

if (!botToken) {
  throw new Error("BOT_TOKEN is required");
}

const bot = new Bot<MyContext>(botToken);

// Install the session plugin.
bot.use(session({
  initial() {
    // return empty object for now
    return {};
  },
}));

// Install the conversations plugin.
bot.use(conversations());

bot.use(createConversation(movie));

bot.api.setMyCommands([
  { command: "new", description: "Add new bookmark" },
  { command: "show", description: "Show all bookmarks" },
]);

bot.command("new", async (ctx) => {
  return await ctx.conversation.enter("movie");
});

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", async (ctx) => {
  console.log(await ctx.conversation.active());
});

// Start the bot.
bot.start();
