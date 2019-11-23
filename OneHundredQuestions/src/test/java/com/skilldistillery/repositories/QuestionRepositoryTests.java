package com.skilldistillery.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.skilldistillery.entities.Question;


@ExtendWith(SpringExtension.class)
@SpringBootTest
public class QuestionRepositoryTests {
	@Autowired
	private QuestionRepository repo;

	@Test
	@DisplayName("Tests if repo is mapped correctly")
	public void test1() {
		Optional<Question> questionOpt = repo.findById(1);
		Question question = null;
		if (questionOpt.isPresent()) {
			question = questionOpt.get();
		}
		assertEquals(1, question.getId());
		assertNotNull(question.getQuestion());

	}

	@Test
	@DisplayName("Tests if count of questions is correct")
	public void test2() {
		List<Question> questions = repo.findAll();
		assertEquals(100, questions.get(99).getId());
	}
	

	// create Repositories for users and answers. Buff up Controller and Services 
	
	
}
