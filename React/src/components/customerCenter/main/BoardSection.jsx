import CircleMenu from "./CircleMenu";
import ArticleWrapper from "./ArticleWrapper";
import { Title } from "../../customerCenter/common/Title";

const BoardSection = () => {
  return (
    <section>
      <div>
        <Title/>
        <CircleMenu />
        <ArticleWrapper />
      </div>
    </section>
  );
};

export default BoardSection;
