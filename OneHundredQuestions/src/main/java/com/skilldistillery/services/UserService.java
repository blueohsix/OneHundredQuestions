package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.User;

public interface UserService {

	List<User> index();

	User showById(Integer id);
	
	User findByUsername(String username);

	User createUser(User user);

	User updateUser(Integer id, User user);

	Boolean deleteUser(Integer id);

}
