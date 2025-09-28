import React from "react";
import ThreePaneLayout from "./layout";
import LeftPanel from "./panels/left";
import RightPanel from "./panels/right";
import CenterPanel from "./panels/center";

const ResumeBuilderPage = () => {
  return (
    <ThreePaneLayout
      leftContent={<LeftPanel />}
      middleContent={<CenterPanel />}
      rightContent={<RightPanel />}
    />
  );
};

export default ResumeBuilderPage;
