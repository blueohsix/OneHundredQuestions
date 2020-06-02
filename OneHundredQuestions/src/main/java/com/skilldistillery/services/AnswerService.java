package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.Answer;

public interface AnswerService {
	List<Answer> findByUsername(String username);
	Answer updateAnswer(Integer id, Answer answer);
	Answer createAnswer(Answer answer);
	
}
