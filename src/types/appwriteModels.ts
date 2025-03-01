import { Models } from "appwrite"

export interface ChatDocument extends Models.Document {
  $id: string;
  title: string;
}

export type UserModel = Models.User<Models.Preferences>;
export type DocumentModel = Models.Document;

export type ChatList = Models.DocumentList<ChatDocument>

// export type DocumentListModel<T = Models.Document> = Models.DocumentList<T>;
// export type File = Models.File
