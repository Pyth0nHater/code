'use client';

import React, { FormEvent } from 'react';
import styles from './chat.module.scss';
import SelectChatUsers from '@/app/components/Chat/SelectChatUsers';
import loopIcon from '../../../public/loop-chat-icon.svg';
import menuIcon from '../../../public/chat-menu.svg';
import Image from 'next/image';
import Message from '@/app/components/Chat/Message';
import axios from 'axios';
import { socket } from './socket';
// icons
import clipIcon from '../../../public/clip.svg';
import smileIcon from '../../../public/smile-emoji.svg';
import drawerIcon from '../../../public/drawer.svg';
import whiteClip from '../../../public/white-clip.svg';
import photoAddIcon from '../../../public/add-photo.svg';
import fileAddIcon from '../../../public/add-file.svg';
import videoAddIcon from '../../../public/video-add.svg';
import loadingIcon from '../../../public/loading.svg'



function Chat() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [AllMessages, setAllMessages] = React.useState<Message[]>([]);
  const [message, setMessage] = React.useState('');
  const [chatId, setChatId] = React.useState('');
  const [userId, setUserId] = React.useState<number | null>(null);
  const [chats, setChats] = React.useState<any[]>([]);
  // добавления файлов, фото, вижео и тд...
  const [addSomething, setAddSomething] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  interface Message {
    id: number;
    text: string;
    senderId: number;
    chatId: string;
  }

  // функция для отправки и добовления в массив
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      //получение времени отправления сообщения
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();

      const sendTime = `${hours}:${minutes}`;

      socket.emit('message', {
        text: message,
        senderId: userId,
        chatId: chatId,
      });
      setMessage('');
    }
  };

  React.useEffect(() => {
    socket.on('msg', (data) => {
      setAllMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('msg');
    };
  }, [socket]); // [socket] убрал я из useEffect если ошибки будут добавьте снова убрал потому что build не рабаотал

  React.useEffect(() => {
  const userId = prompt('enter Id');
  setUserId(Number(userId));

  axios
    .get(`${process.env.SERVER_URL}/user/${userId}`)
    .then((response) => {
      setChats(response.data.chats);
      socket.emit(
        'join room',
        response.data.chats.map((chat: { id: string }) => chat.id),
      );
      setIsLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}, []);


  interface ChatData {
    id: string;
    messages: any[]; // Замените any на тип данных ваших сообщений
  }

  const updateData = (value: ChatData) => {
    setChatId(value.id);
    setAllMessages(value.messages);
  };

  const handleCreateNewChat = () => {
    const friendId = prompt('Enter friendId');
    socket.emit('create chat', {
      user1Id: userId,
      user2Id: Number(friendId),
    });

    socket.on('chat created', (data) => {
      setChatId(data.id);
      const newChat = {
        id: data.id,
        name: friendId,
      };
      setChats((prevChats) => [...prevChats, newChat]);
    });
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleOpenAddSomething = () => {
    setAddSomething(!addSomething);
  };

  const handleCloseAddSomething = () => {
    setAddSomething(false);
  };

  return (
    <div className={styles.container}>
      {/* <button onClick={handleCreateNewChat}>New chat</button> */}
      <div className={styles.usersSection}>
        <div className={styles.inputArea}>
          <input type="text" placeholder="Поиск" />
        </div>
        <div className={styles.chatsSection}>
        {isLoading && <Image className={styles['loading-icon']} src={loadingIcon} alt="Loading" />}

          {chats.map((chat, index) => (
            <SelectChatUsers key={index} chatName={chat} updateData={updateData} />
          ))}
        </div>
      </div>
      <div className={styles.rightChat}>
        <div className={styles.topRightChat}>
          <div className={styles.texts}>
            <h2>ROOT</h2>
            <p>@root</p>
          </div>
          <div className={styles.icons}>
            <Image src={loopIcon} alt="loop" />
            {openMenu && (
              <div className={styles.chatMenu}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Image onClick={handleCloseMenu} src={drawerIcon} alt="white clip" />
                  <h2 onClick={handleCloseMenu}>Очистить диалог</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Image onClick={handleCloseMenu} src={whiteClip} alt="white clip" />
                  <h2 onClick={handleCloseMenu}>Очистить диалог</h2>
                </div>
              </div>
            )}
            <button>Block</button>
            <Image onClick={handleOpenMenu} src={menuIcon} alt="menu" />
          </div>
          <div className={styles.downLine}></div>
        </div>

        <div className={styles.scrollContent} style={{ height: '600px', overflow: 'auto' }}>
          <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {AllMessages.map((msg, index) => (
              <Message key={index} messageValue={msg.text} userId={`User: ${msg.senderId}`} />
            ))}
          </section>
        </div>

        <div className={styles.messageArea}>
          <div className={styles.input}>
            {/* форма отправки сообщения */}
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSend(e)}>
              <input
                type="text"
                placeholder="Напишите сообщение..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
            <div className={styles.iconsToSend}>
              {addSomething && (
                <div className={styles.addSomethingSection}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Image
                      onClick={handleCloseAddSomething}
                      src={photoAddIcon}
                      alt="photo add icon"
                    />
                    <h2 onClick={handleCloseAddSomething}>Добавить фото</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Image
                      onClick={handleCloseAddSomething}
                      src={fileAddIcon}
                      alt="file add icon"
                    />
                    <h2 onClick={handleCloseAddSomething}>Добавить файл</h2>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Image
                      onClick={handleCloseAddSomething}
                      src={videoAddIcon}
                      alt="video add icon"
                    />
                    <h2 onClick={handleCloseAddSomething}>Добавить видео</h2>
                  </div>
                </div>
              )}
              <Image onClick={handleOpenAddSomething} src={clipIcon} alt="clip icon" />
              <Image src={smileIcon} alt="smile icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
