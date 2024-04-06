import { ReactNode } from "react";
import styled from "./root.module.css";
import Image from "next/image";

import logo from "@/public/logo.svg";

import UserCard from "@/app/components/UserCard";
import Navbar from "@/app/components/Navbar";
import MightLike from "@/app/components/MightLike";
import Trends from "@/app/components/Trends";
import Themes from "../components/Themes";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className={styled.header}>
        <Image src={logo} width={335} height={40} alt="logo" priority />
      </header>

      <main
        className={styled.main}
        style={{ backgroundImage: `url(/main-bg.png)` }}
      >
        <div className={`${styled.wrapper} container`}>
          <section className={styled.tools}>
            <UserCard />

            <div className={styled.toolsComponents}>
              <MightLike />

              <Trends />

              <Themes />
            </div>
          </section>
          <Navbar />
          <section className="main">{children}</section>
        </div>
      </main>
    </>
  );
};

export default HomeLayout;
