package com.skilldistillery.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.User;
import com.skilldistillery.repositories.UserRepository;

@Repository
@Transactional
@Service
public class AuthServiceImpl implements AuthService {
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User user) {
		if(userRepo.findByUsername(user.getUsername()) == null) {
			String encodedPW = encoder.encode(user.getPassword());
			user.setPassword(encodedPW); // only persist encoded password
			System.err.println(user);
			return userRepo.saveAndFlush(user);
		}
		System.err.println("Unable to register user");
		return user;
	}

}