import { FC } from "react";
import styled from "./themes.module.scss";

const Themes: FC = () => {
  return (
    <div className={styled.themes}>
      <h3>The most popular themes</h3>
    </div>
  );
};

export default Themes;
