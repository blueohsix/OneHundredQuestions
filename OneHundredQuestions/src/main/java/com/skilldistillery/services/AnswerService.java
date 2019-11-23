package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.Answer;

public interface AnswerService {
	List<Answer> showAll();
	Answer updateAnswer(Integer id, Answer answer);
	
}
