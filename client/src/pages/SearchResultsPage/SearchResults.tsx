import { useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { Post } from "../../components/Post/Post";
import { postsApi } from "../../store/services/posts.service";
import "./SearchResults.scss";

export const SearchResultsPage = () => {
  const searchQuery = (useLocation().state as string) || "";
  const { data: posts } = postsApi.useSearchPostsQuery(searchQuery);

  if (posts?.length === 0) {
    return <h2>Ничего не найдено : (</h2>;
  }

  return (
    <div className='search_result_page'>
      <h2>Результаты поиска:</h2>
      <div className='posts_container'>
        {posts ? posts.map((post) => <Post post={post} key={post.id} className='overflow_hidden' />) : <Loader />}
      </div>
    </div>
  );
};
