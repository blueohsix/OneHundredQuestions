package com.skilldistillery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {

}
