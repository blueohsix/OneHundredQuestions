package com.skilldistillery.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.User;
import com.skilldistillery.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository repo;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User findByUsername(String username) {
		return repo.findByUsername(username);
	}

	@Override
	public User createUser(User user) {
		User newUser = null;
		if (user != null) {
			newUser = repo.saveAndFlush(user);
		}
			return newUser;
	}

	@Override
	public User updateUser(Integer id, User user) {
		Optional<User> userOpt = repo.findById(id);
		User updateUser = null;
		if(userOpt.isPresent()) {
			 updateUser = userOpt.get();
			 if(user.getPassword().length() > 0 ) {
			updateUser.setPassword(encoder.encode(user.getPassword()));
			 }
			updateUser.setUsername(user.getUsername());
			updateUser.setName(user.getName());
			updateUser.setAssociateUsername(user.getAssociateUsername());
	
			repo.saveAndFlush(updateUser);
		}
		
		return updateUser;
	}

	@Override
	public Boolean deleteUser(String username) {
		User user = repo.findByUsername(username);
		if(user.getId() > 0) {
			repo.delete(user);
			return true;
		}
		else {
			System.err.println("user does not exist");
			return false;
		}
	}

}
