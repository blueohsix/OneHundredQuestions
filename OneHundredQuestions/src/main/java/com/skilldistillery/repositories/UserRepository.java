package com.skilldistillery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.skilldistillery.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername(@Param("username")String username);

}
