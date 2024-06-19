package com.sufiyan.quotes.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sufiyan.quotes.model.Quote;

@Repository
public interface QuoteRepository extends JpaRepository<Quote,Integer>{

	Optional<Quote> findByQuoteDate(String quoteDate);
	
	Optional<Quote> findById(int id);

	Optional<List<Quote>> findByTopic(String topic);
	
	@Query("SELECT DISTINCT q.topic from Quote q")
	List<String> findDistinctTopic();
	
}
