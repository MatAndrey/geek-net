export default interface Comment {
  id: number;
  createdat: string;
  authorid: number;
  body: string;
  name: string;
  avatar: string;
  likes: number;
  comments: Comment[];
}
