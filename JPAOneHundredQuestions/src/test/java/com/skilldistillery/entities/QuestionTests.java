package com.skilldistillery.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class QuestionTests {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private Question question;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("questionPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		 em = emf.createEntityManager();
		 question = em.find(Question.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		question = null;
	}
	

	@Test
	@DisplayName("Tests if the question table is mapped correctly")
	void test() {
		assertEquals(1, question.getId());
//		System.out.println(question.getQuestion());
		assertNotNull(question.getQuestion());
	}

}
