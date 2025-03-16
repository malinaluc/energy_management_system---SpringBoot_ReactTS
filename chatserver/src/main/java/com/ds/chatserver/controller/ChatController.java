package com.ds.chatserver.controller;

import com.ds.chatserver.model.Status;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.ds.chatserver.model.Message;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class ChatController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final Set<String> connectedUsers = new HashSet<>();

    public ChatController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/message") //when we want ot send a message to this method we need to use /app/message
    @SendTo("/chatroom/public")
    private Message receivePublicMessage(@Payload Message message) {

        System.out.println(message.getSenderName() + ":" +message.getMessage());
        if (message.getStatus() == Status.JOIN) {
            System.out.println(message.getSenderName() + "sent the status: " +message.getStatus());
            connectedUsers.add(message.getSenderName());
            broadcastUserList();
        } else if (message.getStatus() == Status.LEAVE) {
            System.out.println(message.getSenderName() + "sent the status: " +message.getStatus());
            connectedUsers.remove(message.getSenderName());
            broadcastUserList();
        }
        return message;
    }

    @MessageMapping("/private-message") //send message to a particular user
    public Message receivePrivateMessage(@Payload Message message){
        System.out.println(message.getReceiverName() + ":" +message.getMessage());
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message); // ex: /user/David/private
        return message;
    }

    private void broadcastUserList() {
        simpMessagingTemplate.convertAndSend("/chatroom/connected-users", connectedUsers);
    }
}