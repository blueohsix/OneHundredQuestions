package com.skilldistillery.services;

import java.util.List;
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
	public List<User> index() {
		return repo.findAll();
	}

	@Override
	public User showById(Integer id) {
		Optional<User> user = repo.findById(id);
		if (user.isPresent()) {

			return user.get();
		} else {
			return null;
		}

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
			updateUser.setPassword(encoder.encode(user.getPassword()));
			updateUser.setUsername(user.getUsername());
			updateUser.setName(user.getName());
			updateUser.setAssociateUsername(user.getAssociateUsername());
	
			repo.saveAndFlush(updateUser);
		}
		
		return updateUser;
	}

	@Override
	public Boolean deleteUser(Integer id) {
		Optional<User> userOpt = repo.findById(id);
		if(userOpt.isPresent()) {
			repo.delete(userOpt.get());
			return true;
		}
		else {
			System.err.println("user does not exist");
			return false;
		}
	}

}
