import { db } from "./db.ts";
import { Bookmark, MyContext, MyConversation } from "./types.ts";

export async function addBookmark(
  conversation: MyConversation,
  ctx: MyContext,
) {
  await ctx.reply("Can you tell me what this bookmark is called?");
  const title = await conversation.form.text();
  await ctx.reply(
    "Can you give me a brief overview of what this bookmark is about?",
  );
  const summary = await conversation.form.text();
  await ctx.reply(`Give me the URL for the bookmark ${title}`);
  const url = await conversation.form.text();
  await ctx.reply("Are there any keywords for this bookmark?");
  let tags = await conversation.form.text();

  if (tags.toLowerCase() === "no") {
    tags = "";
    await ctx.reply("Ok, no problem!");
  }

  const loading = await ctx.reply("Wait a moment...");
  await ctx.deleteMessages([loading.message_id]);

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
  const bookmarks: Bookmark[] = result.rows;

  const displayBookmarks = bookmarks.map((bm, idx) => `${idx + 1}. ${bm.title}`)
    .join("\n");
  const loading = await ctx.reply("Wait a moment...");
  await ctx.deleteMessages([loading.message_id]);
  await ctx.reply("Your current bookmarks: \n" + displayBookmarks);
}
