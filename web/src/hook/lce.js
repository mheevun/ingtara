import { useQuery } from "react-apollo-hooks";

const GET_POST = gql`
  {
    users {
      id
      name
    }
  }
`;

export const Posts = () => {
  const { loading, data, error } = useQuery(getPosts);
  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error</div>;
  return data.posts.map(post => (
    <div>
      <h3>{post.subject}</h3>
      <p>{post.content}</p>
    </div>
  ));
};
