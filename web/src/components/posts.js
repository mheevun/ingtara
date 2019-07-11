export const PostsMutation = () => {
  let [subject, setSubject] = useState("");
  let [content, setContent] = useState("");
  const addPostMutation = useMutation(addPost);
  const { loading, data, error } = useQuery(getPosts, { suspend: false });
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addPostMutation({
            variables: {
              subject,
              content,
              userId: "a29aa6ae-8cfc-43f9-997e-73baf21835d8"
            },
            refetchQueries: [{ query: getPosts }]
          });
        }}
      >
        <div>
          <label>Title</label>
          <input onChange={e => setSubject(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <input onChange={e => setContent(e.target.value)} />
        </div>
        <button type="submit">Add Post</button>
      </form>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error...</div>
        ) : (
          data.posts.map(post => (
            <div>
              <h3>{post.subject}</h3>
              <p>{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
