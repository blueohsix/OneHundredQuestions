package com.skilldistillery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
	
}
