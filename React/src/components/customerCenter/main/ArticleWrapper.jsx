import BoardArticle from "./BoardArticle";

const ArticleWrapper = () => {
  const samplePosts = [
    {
      category: "이사",
      title: "사내 복장 단속합니다. 준수하세요.",
      date: "2025.05.28",
    },
    {
      category: "이사",
      title: "오늘 회사에 정진우 뜸. 조심하셈들.",
      date: "2025.05.28",
    },
    { category: "이사", title: "아~~ 피그마 귀찮아~~", date: "2025.05.28" },
    {
      category: "이사",
      title: "게시판 미리보기 항목은 5개 띄우기",
      date: "2025.05.28",
    },
    {
      category: "이사",
      title: "공지사항, 자유게시판 등등",
      date: "2025.05.28",
    },
  ];

  const boards = ["공지사항", "자료실", "부서별 게시판", "자유 게시판"];

  return (
    <div className="article-wrapper">
      {boards.map((boardTitle, index) => (
        <BoardArticle key={index} title={boardTitle} posts={samplePosts} />
      ))}
    </div>
  );
};

export default ArticleWrapper;
