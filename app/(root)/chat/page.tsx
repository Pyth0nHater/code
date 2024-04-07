'use client'

import React from 'react';
import './chat.scss';
import squareIcon from '../../../public/square-icon.svg';
import alarmIcon from '../../../public/alarm-icon.svg';
import smileIcon from '../../../public/smile-icon.svg';
import Image from 'next/image'
import MessageSection from '@/app/components/Chat/MessageSection';

function Chat() {
    // стейт для отправки сообщения
    const [message, setMessage] = React.useState('')

    // будущая функция для создания сообщения
    const sendMessage = () => {

    }

    return (
        <div className='Chat-Container'>
            <div className='Top-Content'>
                <article>
                    {/* <div className='avatar'></div> */}
                    <img className='avatar' src="https://static.vecteezy.com/system/resources/previews/000/674/733/non_2x/vector-gamer-mascot-logo-sticker-design.jpg" alt="avatar" />
                    <div className='profile-texts'>
                        <h2>Profile Name</h2>
                        <p>@ProfileName.com</p>
                    </div>
                </article>
                <button className='block-btn'>Block</button>
                <div className='line'></div>

            </div>
            <div className='chat-content'>
                {/* сообщения */}
                <MessageSection />
                <MessageSection />
                <MessageSection />
            </div>
            <div className='text-area-block'>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} name="message" id="" placeholder='Введите сообщения...'></textarea>
                <div className='line-text-area'></div>
                <div className='send-message-section'>
                    <div className='text-area-icons'>
                        <Image style={{ cursor: 'pointer' }} src={squareIcon} alt="square icon" />
                        <Image style={{ cursor: 'pointer' }} src={alarmIcon} alt="clock icon" />
                        <Image style={{ cursor: 'pointer' }} src={smileIcon} alt="smile icon" />
                    </div>
                    <button onClick={() => setMessage('')} className='send-btn'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat