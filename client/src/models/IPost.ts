export default interface Post {
  id: number;
  createdat: string;
  authorid: number;
  body: string;
  title: string;
  avatar: string;
  author: string;
  likes: number;
  comments: number;
}
