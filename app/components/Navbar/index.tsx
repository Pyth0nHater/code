import { FC } from "react";
<<<<<<< HEAD
import styled from "./navbar.module.scss";
=======
import styled from "./navbar.module.css";
>>>>>>> 04f5f7f8d26340a5fdd3b7819d59b35e7645aab4

import navItems from "@/app/constants";
import Link from "next/link";
import Image from "next/image";

const Navbar: FC = () => {
  return (
    <nav className={styled.navbar}>
      <menu className={styled.navbarMenu}>
        {navItems &&
          navItems.map((item, index) => {
            return (
              <li key={index} className={styled.item}>
                <Link href={item.link} className={styled.link}>
                  <Image src={item.icon} width={22} height={22} alt="icon" />
                  <span> {item.title}</span>
                </Link>
              </li>
            );
          })}
      </menu>
    </nav>
  );
};

export default Navbar;
