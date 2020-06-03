package com.skilldistillery.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.Answer;
import com.skilldistillery.entities.User;
import com.skilldistillery.repositories.AnswerRepository;
import com.skilldistillery.repositories.UserRepository;

@Service
public class AnswerServiceImpl implements AnswerService {
	@Autowired
	private AnswerRepository answerRepo;
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Answer> findByUsername(String username) {
		User user = userRepo.findByUsername(username);
		List<Answer> answers = answerRepo.findByUserUsername(username);
		try {
			answers.addAll(answerRepo.findByUserUsername(user.getAssociateUsername()));
			return answers;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return answers;
		}
	}

	@Override
	public Answer updateAnswer(Integer id, Answer answer) {
		Optional<Answer> answerOpt = answerRepo.findById(id);
		if (answerOpt.isPresent()) {
			Answer answerForUpdate = answerOpt.get();
			answerForUpdate = answer;
			answerForUpdate.setId(id);
			Answer updatedAnswer = answerRepo.saveAndFlush(answerForUpdate);
			return updatedAnswer;
		} else {
			return null;
		}
	}


	
	@Override
	public Answer createAnswer(Answer answer) {
		try {
			return answerRepo.saveAndFlush(answer);
		}
		catch(Exception e) {
			System.err.println("Failure creating answer");
			return answer;
		}
	}
}
