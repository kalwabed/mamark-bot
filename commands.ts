import { db } from "./db.ts";
import { MyContext, MyConversation } from "./types.ts";

export async function addBookmark(
  conversation: MyConversation,
  ctx: MyContext,
) {
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

  await db.execute({
    sql:
      "INSERT INTO bookmarks VALUES (:id, :title, :summary, :url, :tags, :created_at, :updated_at)",
    args: {
      id: crypto.randomUUID(),
      title,
      summary,
      url,
      tags,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    },
  });

  return await ctx.reply(
    `A new bookmark with the title '${title}' has been successfully added!`,
  );
}

export async function showBookmarks(ctx: MyContext) {
  const result = await db.execute("SELECT * FROM bookmarks");
  const bookmarks = result.rows;
  const bookmarkTitles = [];

  for (const bm of bookmarks) {
    bookmarkTitles.push(bm.title);
  }

  return await ctx.reply(bookmarkTitles.join("\n"));
}
