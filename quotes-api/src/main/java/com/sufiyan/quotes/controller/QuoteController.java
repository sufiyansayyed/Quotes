package com.sufiyan.quotes.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sufiyan.quotes.model.Quote;
import com.sufiyan.quotes.services.QuoteService;

@RestController
public class QuoteController {
	
	@Autowired
	QuoteService quotesService;
	
	@GetMapping("/quotes/all")
	public ResponseEntity<List<Quote>> getQuotes() {
		return quotesService.getQuotes();	
	}
	
	@GetMapping("/quotes")
	public ResponseEntity<Quote> getQuotesByDate(@RequestParam(name = "date",required=false) String quoteDate, @RequestParam(name = "id",required = false) String id) {
		return quotesService.getQuotesByDateOrId(quoteDate,id);	
	}
	
	@GetMapping("/quotes/topics/{topic}")
	public ResponseEntity<List<Quote>> getAllQuotesByTopic(@PathVariable String topic ) {
		return quotesService.getAllQuotesByTopic(topic);
	}
	
	@GetMapping("/quotes/topics/{topic}/single")
	public ResponseEntity<Quote> getQuotesByTopic(@PathVariable String topic) {
		return quotesService.getQuotesByTopic(topic);
	}
	
	@GetMapping("/quotes/topics")
	public ResponseEntity<List<String>> getTopic() {
		return quotesService.getAllTopic();
	}
	
	@PostMapping("/quotes")
	public ResponseEntity<String> putQuote(@RequestBody Quote quote) {
		return  quotesService.saveQuote(quote);
	}
	
	@PatchMapping("/quotes/{quoteDate}")
	public ResponseEntity<Quote> updateQuotebyQuoteDate(@PathVariable String quoteDate, @RequestBody Map<String,Object> fields) {
		return quotesService.updateQuoteByQuoteDate(quoteDate,fields);
	}
	
	@DeleteMapping("/quotes/{id}")
	public ResponseEntity<String> deleteQuote(@PathVariable int id) {
		return  quotesService.deleteQuote(id);
	}
}
