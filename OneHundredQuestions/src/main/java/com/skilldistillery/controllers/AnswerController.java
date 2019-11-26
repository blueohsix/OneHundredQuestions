package com.skilldistillery.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	@GetMapping("answers")
	public List<Answer> index(HttpServletRequest request, HttpServletResponse response, Principal principal) {
		try {
			List<Answer> answers = service.showAll();
			if (answers == null) {
				response.setStatus(404);
			} else {
				response.setStatus(200);
			}
			return answers;
		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
			return null;
		}
	}
	@GetMapping("answer/{uid}")
	public List<Answer> answersByUserId(@PathVariable Integer uid, HttpServletRequest request, HttpServletResponse response, Principal principal) {
		try {
			List<Answer> answers = service.showByUserId(uid);
			if (answers == null) {
				response.setStatus(404);
			} else {
				response.setStatus(200);
			}
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
			url.append("/");
			url.append(updatedAnswer.getId());
			System.err.println(url);
			response.setStatus(200);
			response.setHeader("Location", url.toString());
			return updatedAnswer;

		} catch (Exception e) {
			response.setStatus(400);
			e.printStackTrace();
			return null;
		}

	}

}
