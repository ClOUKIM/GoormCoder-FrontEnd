import React, { useState } from 'react'
import styled from 'styled-components'
import { ChatRoom, DisplayProps, User } from '../types'
import Chat from './Chat'
import { getChatRooms } from '../../../services/api/chatAPI'
import { getUserID } from '../../../services/api/userAPI'

const ChatList = () => {
    const userID = getUserID("51");
    const chatRooms = getChatRooms(userID.userID);
    const [roomData, setRoomData] = useState<ChatRoom>(chatRooms[0]);
    const [display, setDisplay] = useState<boolean>(false);
    const setChatDetail = (room: ChatRoom) => {
        setRoomData(room);
        setDisplay(true)
    }
    return (
        <ChatListContainer>
            <List>
                {chatRooms.map((room, index) => (
                    <ChatContent key={index} onClick={() => setChatDetail(room)}>
                        {room.userName}
                    </ChatContent>
                ))}
            </List>
            <ChatContainer display={display}>
                <Chat chatRoomData={roomData} setDisplay={setDisplay} />
            </ChatContainer>
        </ChatListContainer>
    )
}

export default ChatList

const ChatListContainer = styled.div`
    height: 100%;
    overflow: auto;
`
const List = styled.div`
    & :hover {
        background-color: whitesmoke;
    }
`

const ChatContent = styled.div`
    padding: 20px;
    border-bottom: 1px solid;
    cursor: pointer;
`

const ChatContainer = styled.div<DisplayProps>`
    display: ${props => props.display ? "block" : "none"};
    position: absolute;
    top:0px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: white;
`