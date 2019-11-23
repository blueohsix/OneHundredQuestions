package com.skilldistillery.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.skilldistillery.entities.User;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class UserRepositoryTests {
	@Autowired
	private UserRepository repo;
	
	@Test
	@DisplayName("Tests if repo is mapped correctly")
	public void test1() {
		Optional<User> userOpt = repo.findById(1);
		User user = null;
		if(userOpt.isPresent()) {
			user = userOpt.get();
		}
		assertEquals(1, user.getId());
		assertNotNull(user.getName());
	}
	
	@Test
	@DisplayName("Tests if associate_email is correct")
	public void test2() {
		Optional<User> userOpt = repo.findById(1);
		User user = null;
		if(userOpt.isPresent()) {
			user = userOpt.get();
		}
		
		assertEquals("casey.e.asher@outlook.com", user.getAssociateUsername());
	}

}
