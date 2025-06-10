import Header from "../../components/customerCenter/View/Header";
import Attachment from "../../components/customerCenter/View/Attachment";
import Content from "../../components/customerCenter/View/Content";

import ActionButtons from "../../components/customerCenter/View/ActionButtons";
import BackButton from "../../components/customerCenter/View/BackButton";
import { Title } from "../../components/board/common/Title";

const ViewPage = () => {
  return (
    <section>
      <div>
        <Title />
        <div className="article-wrapper">
          <a href="#" className="move-list">
            &lt; 목록으로
          </a>
          <div className="notice-box">
            <Header
              category="[안내]"
              title="공지사항 입니다."
              date="2025.05.28"
            />
            <Attachment />
            <Content />
          </div>
          <ActionButtons />
          <BackButton />
        </div>
      </div>
    </section>
  );
};

export default ViewPage;
