package com.skilldistillery.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.Question;
import com.skilldistillery.services.QuestionService;

@RestController
@CrossOrigin({ "*", "http://localhost:4205" })
@RequestMapping("api")
public class QuestionController {
	@Autowired
	private QuestionService service;

	@GetMapping("questions")
	public List<Question> index(HttpServletRequest request, HttpServletResponse response, Principal principal) {
		try {
			List<Question> questions = service.showAll();
			if (questions == null) {
				response.setStatus(404);
			} else {
				response.setStatus(200);
			}
			return questions;
		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
			return null;
		}
	}

	@GetMapping("question/{id}")
	public Question questionById(@PathVariable Integer id, HttpServletRequest request, HttpServletResponse response, Principal principal) {
		try {
			Optional<Question> questionOpt = service.showById(id);
			if (questionOpt == null) {
				response.setStatus(404);
			} else {
				response.setStatus(200);
			}
			if (questionOpt.isPresent()) {
				Question question = questionOpt.get();
				return question;
			} else {
				return null;
			}
		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
			return null;
		}

	}

}