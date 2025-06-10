import CircleItem from "./CircleItem";

const CircleMenu = () => {
  return (
    <div className="circle-menu">
      <CircleItem
        imgSrc="/images/customerCenter/Settings.png"
        alt="환경설정 아이콘"
        label="환경설정"
      />
      <CircleItem
        imgSrc="/images/customerCenter/Icon.png"
        alt="프로젝트 아이콘"
        label="프로젝트"
      />
      <CircleItem
        imgSrc="/images/customerCenter/free-icon-chatbot-3091840 2.png"
        alt="챗봇 아이콘"
        label="챗봇"
      />
    </div>
  );
};

export default CircleMenu;
