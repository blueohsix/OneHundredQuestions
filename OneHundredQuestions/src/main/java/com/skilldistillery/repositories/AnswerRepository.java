package com.skilldistillery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
	List<Answer> findByUserId(Integer uid);

}
