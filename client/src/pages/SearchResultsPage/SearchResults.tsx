import { useLocation } from "react-router-dom";
import { PostList } from "../../components/PostList/PostList";
import { postsApi } from "../../store/services/posts.service";
import "./SearchResults.scss";

export const SearchResultsPage = () => {
  const searchQuery = (useLocation().state as string) || "";

  return (
    <div className='search_result_page'>
      <h2>Результаты поиска:</h2>
      {<PostList postApi={postsApi.useSearchPostsQuery} search={searchQuery} />}
    </div>
  );
};
