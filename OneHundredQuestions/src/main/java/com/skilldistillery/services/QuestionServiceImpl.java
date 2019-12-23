package com.skilldistillery.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.Question;
import com.skilldistillery.repositories.CategoryRepository;
import com.skilldistillery.repositories.QuestionRepository;

@Service
public class QuestionServiceImpl implements QuestionService {
	@Autowired
	private QuestionRepository repo;

	@Override
	public List<Question> showAll() {
		return repo.findAll();
	}

	@Override
	public Optional<Question> showById(Integer id) {
		return repo.findById(id);
	}
}
