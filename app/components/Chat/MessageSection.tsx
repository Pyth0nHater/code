import React from 'react';
import '../../(root)/chat/chat.scss'

function MessageSection() {
    return (
        <div className="message">
            <img className='message-avatar' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShl4MJfA64YNK0sA1biqNfW8k4YuN4c21skK9ca6IvQA&s" alt="avatar" />
            <div className='message-content'>
                <h1>Profile Name</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                </p>
            </div>
            <p className='createdAt'>16:05</p>
        </div>
    )
}

export default MessageSection