package com.sufiyan.quotes.services;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import com.sufiyan.quotes.model.Quote;
import com.sufiyan.quotes.repositories.QuoteRepository;

import utility.Utils;

@Service
public class QuoteService {

	@Autowired
	QuoteRepository quotesRepository;

	public QuoteService() {
	}

	public ResponseEntity<List<Quote>> getQuotes() {
		try {
			return new ResponseEntity<>(quotesRepository.findAll(), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Quote> getQuotesById(int id) {
		Optional<Quote> quote;
		
		try {
			quote = quotesRepository.findById(id);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (quote.isPresent()) {
			return new ResponseEntity<>(quote.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<Quote> getQuotesByDate(String quoteDate) {
		Optional<Quote> quote;
		
		try {
			quote = quotesRepository.findByQuoteDate(quoteDate);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if (quote.isPresent()) {
			return new ResponseEntity<>(quote.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
	}

	public ResponseEntity<List<Quote>> getAllQuotesByTopic(String topic) {
		Optional<List<Quote>> quotesByTopic;
		try {
			quotesByTopic = quotesRepository.findByTopic(topic);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(quotesByTopic.isPresent()) {
			return new ResponseEntity<>(quotesByTopic.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
		}
		
	}

	public ResponseEntity<Quote> getQuotesByTopic(String topic) {
		Random random = new Random();
		Optional<List<Quote>> quotesByTopic;
		
		try {
			quotesByTopic = quotesRepository.findByTopic(topic);
		}catch(Exception e) {
			return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if(quotesByTopic.isPresent()) {
			int randInt = random.nextInt(quotesByTopic.get().size());
			return new ResponseEntity<>(quotesByTopic.get().get(randInt), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
		}
		
	}

	public ResponseEntity<List<String>> getAllTopic() {
		try {
			return new ResponseEntity<>(quotesRepository.findDistinctTopic(), HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<String> saveQuote(Quote quote) {
		try {
			if (quotesRepository.findById(quote.getId()).isEmpty()) {
				quotesRepository.save(quote);
				return new ResponseEntity<>("Quote Added!!", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("Duplicate Key Found!!", HttpStatus.BAD_REQUEST);
			} 
		}catch (Exception e) {
			return new ResponseEntity<>("Unable to save Quote.",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<String> deleteQuote(int id) {
		Optional<Quote> quote;
		
		try {
			quote = quotesRepository.findById(id);
			if (quote.isEmpty()) {
				return new ResponseEntity<>("No Quote found to delete", HttpStatus.BAD_REQUEST);	
			}
			if (quote.get().getQuoteDate() != null) {
				return new ResponseEntity<>("Quote is assocaited with date can't be deleted", HttpStatus.BAD_REQUEST);
			}
			quotesRepository.deleteById(id);
			return new ResponseEntity<>("Quote Deleted!!", HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<>("Unable to delete Quote.",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Quote> updateQuoteByQuoteDate(String quoteDate, Map<String, Object> fields) {
		Optional<Quote> quote;
		
		try {
			quote = quotesRepository.findByQuoteDate(quoteDate);
			if (quote.isPresent()) {
				fields.forEach((key, value) -> {
					Field field = ReflectionUtils.findField(Quote.class, key);
					field.setAccessible(true);
					ReflectionUtils.setField(field, quote.get(), value);
				});
				return new ResponseEntity<>(quotesRepository.save(quote.get()), HttpStatus.OK);
			}
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<Quote> getQuotesByDateOrId(String quoteDate, String id) {
		int intId;
		
		if(!Utils.isEmptyOrNull(quoteDate) && !Utils.isEmptyOrNull(id)) {	
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		if(Utils.isEmptyOrNull(quoteDate) && Utils.isEmptyOrNull(id)) {
			return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
		}
		if(!Utils.isEmptyOrNull(id)) {	
			try{
				intId = Integer.parseInt(id);
			}
			catch(Exception e){
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); 
			}
			return getQuotesById(intId);
		}else {
			return getQuotesByDate(quoteDate);
		}
	}

}
