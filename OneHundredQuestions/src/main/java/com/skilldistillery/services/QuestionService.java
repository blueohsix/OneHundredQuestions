package com.skilldistillery.services;

import java.util.List;
import java.util.Optional;

import com.skilldistillery.entities.Question;

public interface QuestionService {
	List<Question> showAll();
	Optional<Question> showById(Integer id);

}
