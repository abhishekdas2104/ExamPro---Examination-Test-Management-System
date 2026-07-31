package com.examportal.backend.service;

import com.examportal.backend.dto.*;

import com.examportal.backend.entity.User;

import com.examportal.backend.exception.EmailAlreadyExistsException;
import com.examportal.backend.exception.UnauthorizedAccessException;

import com.examportal.backend.repository.UserRepository;

import com.examportal.backend.security.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@SuppressWarnings("null")
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new EmailAlreadyExistsException(request.getEmail());
        }

        User.Role assignedRole = User.Role.STUDENT;

        if ("ADMIN".equalsIgnoreCase(request.getRole())) {

            String requiredSecret = "ADMIN_SECRET_KEY_123456";

            if (request.getAdminSecurityKey() == null || !requiredSecret.equals(request.getAdminSecurityKey())) {

                throw new UnauthorizedAccessException("Invalid Admin Security Key");
            }

            assignedRole = User.Role.ADMIN;
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())

                .password(passwordEncoder.encode(request.getPassword()))
                .role(assignedRole)
                .build();

        userRepository.save(user);

        Authentication auth = authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtUtils.generateJwtToken(auth);

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

    public AuthResponse login(LoginRequest request) {

        Authentication auth = authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = jwtUtils.generateJwtToken(auth);

        User user = userRepository.findByEmail(request.getEmail())

                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
