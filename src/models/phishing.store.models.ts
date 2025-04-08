import type { TError } from "./auth.store.models";

export type PhishingState = {
    attempts: IDataItem[]
}

export interface IDataItem {
    id: string;
    email: string;
    emailContent: string;
    userClicked: boolean;
  }

  export interface IDataItemeExport {
    data: IDataItem[] | null;
    message: TError | null;
  }