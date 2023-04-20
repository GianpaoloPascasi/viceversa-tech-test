export class UserMessage {
  user: string;
  messages: Array<string>;

  constructor(user: string, messages: Array<string> = []) {
    this.user = user;
    this.messages = messages;
  }

  pushMessages(messages: Array<string>) {
    this.messages.push(...messages);
  }
}
