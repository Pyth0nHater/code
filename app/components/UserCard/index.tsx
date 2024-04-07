import { FC } from "react";
<<<<<<< HEAD
import styled from "./userCard.module.scss";
=======
import styled from "./userCard.module.css";
>>>>>>> 04f5f7f8d26340a5fdd3b7819d59b35e7645aab4

import Image from "next/image";
import { Pencil } from "lucide-react";

import avatar from "@/public/avatar.png";

const UserCard: FC = () => {
  return (
    <div className={styled.userCard}>
      <div className={styled.avatar}>
        <Image src={avatar} alt="avatar" width={60} height={60} style={{ borderRadius: "50%" }} />
      </div>

      <div className={styled.cardData}>
        <div className={styled.userName}>
          <strong>Eblan Daun</strong>
          <button className={styled.btn}>
            <Pencil color="grey" size={22} />
          </button>
        </div>
        <span>@eblanchik</span>
        <span>Status: Official CS:GO Trader, billioner, cocksucker</span>
        <span>Moscow, Russia</span>
        <span>333 Friends</span>
        <p>steam my links</p>
      </div>
    </div>
  );
};

export default UserCard;
