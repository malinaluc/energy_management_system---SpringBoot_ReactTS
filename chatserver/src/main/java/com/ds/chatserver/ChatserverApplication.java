package com.ds.chatserver;

import com.ds.chatserver.model.Message;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChatserverApplication {

	public static void main(String[] args) {

//		Message message = new Message();
//		message.setMessage("test");
//		System.out.println(message);

		SpringApplication.run(ChatserverApplication.class, args);
	}

}
