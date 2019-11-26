package com.skilldistillery.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.Answer;
import com.skilldistillery.repositories.AnswerRepository;

@Service
public class AnswerServiceImpl implements AnswerService {
	@Autowired
	private AnswerRepository repo;

	@Override
	public List<Answer> showAll() {
		return repo.findAll();
	}
	

	@Override
	public Answer updateAnswer(Integer id, Answer answer) {
		Optional<Answer> answerOpt = repo.findById(id);
		if (answerOpt.isPresent()) {
			Answer answerForUpdate = answerOpt.get();
			answerForUpdate = answer;
			answerForUpdate.setId(id);
			Answer updatedAnswer = repo.saveAndFlush(answerForUpdate);
			return updatedAnswer;
		} else {
			return null;
		}
	}


	@Override
	public List<Answer> showByUserId(Integer uid) {
		return repo.findByUserId(uid);
	}
}
