import {
  type Conversation,
  type ConversationFlavor,
} from "https://deno.land/x/grammy_conversations@v1.2.0/mod.ts";
import { Context } from "https://deno.land/x/grammy@v1.22.4/mod.ts";

export type MyContext = Context & ConversationFlavor;

export type MyConversation = Conversation<MyContext>;

export interface Bookmark {
  id: string;
  title: string;
  summary: string;
  url: string;
  tags: string;
  created_at: number;
  updated_at: number;
}
