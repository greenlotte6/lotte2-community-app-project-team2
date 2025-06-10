const PostPreview = ({ category, title, date }) => {
  return (
    <div>
      <a href="#">{category}</a>
      <a href="#">{title}</a>
      <a href="#">{date}</a>
    </div>
  );
};

export default PostPreview;
