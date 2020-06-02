package com.skilldistillery.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.Answer;
import com.skilldistillery.services.AnswerService;

@RestController
@CrossOrigin({ "*", "http://localhost:4205" })
@RequestMapping("api")
public class AnswerController {
	@Autowired
	private AnswerService service;

	/* Returns a list of Answers; Half of the logged in user;
	 half of their associated username */
	@GetMapping("answer")
	public List<Answer> index(HttpServletRequest request, HttpServletResponse response, Principal principal) {
		try {
			List<Answer> answers = service.findByUsername(principal.getName());
			return answers;
		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
			return null;
		}
	}

	@PutMapping("answer/{id}")
	public Answer updateAnswer(@PathVariable Integer id, @RequestBody Answer answer, HttpServletRequest request,
			HttpServletResponse response, Principal principal) {

		try {

			Answer updatedAnswer = service.updateAnswer(id, answer);
			StringBuffer url = request.getRequestURL();
			System.err.println("Line 70, AnswerController: " + url);
			response.setStatus(200);
			response.setHeader("Location", url.toString());
			return updatedAnswer;

		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
			return null;
		}

	}
	@PostMapping("answer/") 
		public Answer createAnswer(@RequestBody Answer answer, HttpServletRequest request,
			HttpServletResponse response, Principal principal) {
		
		try {

			Answer newAnswer = service.createAnswer(answer);
			StringBuffer url = request.getRequestURL();
			url.append(newAnswer.getId());
			System.err.println("Line 91, AnswerController: " + url);
			response.setStatus(200);
			response.setHeader("Location", url.toString());
			return newAnswer;

		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
			return null;
		}
		
	}

}
