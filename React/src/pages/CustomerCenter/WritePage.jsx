import TypeSelector from "../../components/customerCenter/Write/TypeSelector";
import TitleInput from "../../components/customerCenter/Write/TitleInput";
import FileUpload from "../../components/customerCenter/Write/FileUpload";
import ContentTextarea from "../../components/customerCenter/Write/ContentTextarea";
import ActionButtons from "../../components/customerCenter/Write/ActionButtons";
import BackButton from "../../components/customerCenter/Write/BackButton";
import {Title} from "../../components/customerCenter/common/Title";

const WritePage = () => {
  return (
    <section>
      <div>
        <Title />
        <div className="article-wrapper">
          <a href="#" className="move-list">
            &lt; 목록으로
          </a>

          <form action="#">
            <TypeSelector />

            <TitleInput />

            <FileUpload />

            <ContentTextarea />

            <hr />

            <ActionButtons />

            <BackButton />
          </form>
        </div>
      </div>
    </section>
  );
};

export default WritePage;
