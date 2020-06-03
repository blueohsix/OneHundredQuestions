package com.skilldistillery.services;

import com.skilldistillery.entities.User;

public interface UserService {

	User findByUsername(String username);

	User createUser(User user);

	User updateUser(Integer id, User user);

	Boolean deleteUser(String username);

}
