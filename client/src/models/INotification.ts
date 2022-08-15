export default interface INotification {
  type: "info" | "error";
  text: string;
  id?: number;
  timeout?: number;
}
