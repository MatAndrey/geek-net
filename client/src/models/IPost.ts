export default interface Post {
  id: number;
  createdat: string;
  authorid: number;
  body: string;
  title: string;
  avatar: string;
  name: string;
  likes: number;
  comments: number;
}
