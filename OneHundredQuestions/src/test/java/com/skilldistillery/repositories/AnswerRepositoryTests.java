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

import com.skilldistillery.entities.Answer;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class AnswerRepositoryTests {
	@Autowired
	private AnswerRepository repo;
	
	@Test
	@DisplayName("Tests if repo is mapped correctly")
	public void test1() {
		Optional<Answer> answerOpt = repo.findById(1);
		Answer answer = null;
		if (answerOpt.isPresent()) {
			answer = answerOpt.get();
		}
		assertEquals(1, answer.getId());
		assertNotNull(answer.getAnswer());

	}
	@Test
	@DisplayName("Tests if name of user answer index 0 is correct")
	public void test2() {
		List<Answer> answers = repo.findAll();
		assertEquals("Karol", answers.get(0).getUser().getName());
	}

}
