export default interface Comment {
  id: number;
  createdat: string;
  authorid: number;
  body: string;
  author: string;
  avatar: string;
  likes: number;
  comments: Comment[];
}
