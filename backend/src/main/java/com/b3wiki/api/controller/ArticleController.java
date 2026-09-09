package com.b3wiki.api.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.b3wiki.api.domain.Article;
import com.b3wiki.api.service.ArticleService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<Article>> findAll() {
        return ResponseEntity.ok(articleService.findAll());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Article> findBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(articleService.findBySlug(slug));
    }

    @PostMapping
    public ResponseEntity<Article> create(@Valid @RequestBody Article article) {
        Article created = articleService.saveArticle(article);
        return ResponseEntity
                .created(URI.create("/api/articles/" + created.getSlug()))
                .body(created);
    }
}