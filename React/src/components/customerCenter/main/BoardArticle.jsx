import PostPreview from "./PostPreview";

const BoardArticle = ({ title, posts }) => {
  return (
    <article>
      <div className="sub-title">
        <p>{title}</p>
        <a href="#">
          <img src="/images/board/Group 20.svg" alt="더보기" />
        </a>
      </div>
      <div className="content">
        {posts.map((post, index) => (
          <PostPreview
            key={index}
            category={post.category}
            title={post.title}
            date={post.date}
          />
        ))}
      </div>
    </article>
  );
};

export default BoardArticle;
