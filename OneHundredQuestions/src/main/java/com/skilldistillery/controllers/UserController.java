package com.skilldistillery.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.User;
import com.skilldistillery.services.UserService;

@RestController
@CrossOrigin({ "*", "http://localhost:4205" })
@RequestMapping("api")
public class UserController {

	@Autowired
	private UserService service;

	@GetMapping("user")
	public User findByUsername(Principal principal) {
		return service.findByUsername(principal.getName());
	}

	@PostMapping("user")
	public User create(@RequestBody User user, HttpServletResponse response, HttpServletRequest request, Principal principal) {
		User created = null;
		try {
			created = service.createUser(user);
			StringBuffer url = request.getRequestURL();
			url.append("/" + created.getId());
			response.setStatus(201);
			response.setHeader("Location", url.toString());

		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
		return created;
	}

	@PutMapping("user/{id}")
	public User update(@PathVariable("id") int id, @RequestBody User user, HttpServletResponse response,
			Principal principal) {
		User updated = null;
		try {
			if (principal.getName().equalsIgnoreCase(user.getUsername())) {
				updated = service.updateUser(id, user);
				response.setStatus(200);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
		return updated;
	}
	@DeleteMapping("user")
	public void delete(HttpServletResponse response, Principal principal) {
		try {
			if (principal.getName().equalsIgnoreCase(service.findByUsername(principal.getName()).getUsername())) {
				if (service.deleteUser(principal.getName())) {
					response.setStatus(204);
				} else {
					response.setStatus(404);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}
	}
}
