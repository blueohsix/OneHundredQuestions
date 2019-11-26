package com.skilldistillery.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.skilldistillery.entities.User;
import com.skilldistillery.repositories.UserRepository;

@Repository
@Transactional
public class AuthServiceImpl implements AuthService {
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User user) {
		String encodedPW = encoder.encode(user.getPassword());
		user.setPassword(encodedPW); // only persist encoded password
		System.err.println(user);
		userRepo.saveAndFlush(user);
		System.err.println(user);
		return user;
	}

}