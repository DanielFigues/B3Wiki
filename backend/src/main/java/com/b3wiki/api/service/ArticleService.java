package com.b3wiki.api.service;

import java.text.Normalizer;
import java.util.List;

import org.springframework.stereotype.Service;

import com.b3wiki.api.domain.Article;
import com.b3wiki.api.domain.ArticleRepository;
import com.b3wiki.api.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    public Article findBySlug(String slug) {
        return articleRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found for slug: " + slug));
    }

    public Article saveArticle(Article article) {
        article.setSlug(generateSlug(article.getTitle()));
        return articleRepository.save(article);
    }

    private String generateSlug(String title) {
        if (title == null) {
            return "";
        }
        String normalized = Normalizer.normalize(title, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        return normalized.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-+|-+$)", "");
    }
}