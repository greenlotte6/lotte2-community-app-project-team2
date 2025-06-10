import Sidebar from "../../components/page/Sidebar";
import ContentArea from "../../components/page/ContentArea";

const PageSection = () => {
  return (
    <section>
      <div>
        <div className="title">
          <p>페이지</p>
        </div>
        <div className="article-wrapper">
          <div className="main">
            <Sidebar />
            <ContentArea />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageSection;
