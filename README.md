# Quotes

Quotes is a simple three tier application which displays... well "Quotes" from famous personalities. The apps whose backend is written in Java with the help of Spring Boot, fetches the quotes from the PostgreSQL database and send to the presentation layer written in HTML, CSS and JavaScript. Starting from "Quote of the day" where a different quote will be displayed each day, even on 29th Feb. Then the second page is where you have options to read quotes on various topics, each topic has multiple quotes and a new quote on same topic can be loaded by press of a button. on the management side an administrator can delete a quote, update any quote of the day, or add a new quote. There is no authentication for administrator as of now. you are an admin user if you have management portal link.

## Software/Libraries required
1 - JDK 21  
2 - Python 3.12  
3 - PostgreSQL 11  
4 - Python Module `psycopg2`  
5 - Any IDE for Java  

## How to install and run the project
1 - Clone the repository  
2 - Create Database using `Table_and_DB_creation_DDL.sql` present in helper folder  
3 - Create Table using `Table_and_DB_creation_DDL.sql`, Make sure to create table in correct Database  
4 - Update `db_conn_details.py` with appropriate database connection details  
5 - Load the data in database using `db_loader.py`  
6 - Open the Java Project in any IDE  
7 - Update `application.properties` with appropriate database connection details  
8 - Run the Spring Boot Application  
9 - Project is now up and running. open any HTML file from Front End folder to see the project in action  
  
**NOTE** - If you are changing port number in `application.properties` make sure to change it in `apiCallers.js` file as well which is present at `Front End\js`.  

## Explanation

## Front End
There are three HTML files which a user can open to interact with the backend server.  

**1- Quote of the day** - `quoteOfTheDay.html` is a basic page with just does a GET HTTP request to the server with current date as a query parameter to the endpoint. The backend server sends the quote with the matching date, giving user with the **Quote of the day**.  

**2- Quote on topics** - `quoteByTopic.html` first fetch list of all topics from the server then create button for each of them dynamically. Each button when pressed will fetch and display quotes on their respective topics. Along with that there is `Load new quote` button which will fetch new quote on same topic.  

**3- Managing Quotes** - To perform administrator task `manageQuote.html` is used. This HTML page can delete a quote when an id is provided. Update a quote of specific date or add a new quote.  

All the client-side validation and dynamic updating of pages are taken care by their respective JavaScript files.  

## Back End
The back bone of the project is a Spring Boot application which is handling API request coming from front end. The application has handler function for request coming in. These requests include, GET request for quote based on ID or Date, List of topics, A single quote based on topic name and some other handler function which are not called from front end like all quotes in Database or All quotes for a particular topic. Along with GET Request the is POST Request for creation of new quote. PATCH Request to update a quote and DELETE request to delete a quote. The flow of function calls is similar to a usual Spring Boot Application, Controller calling Service Class and Service Class calling Repository.

## Credits
Below are the websites from where all the quotes featuring in this project were fetched, please go through these articles if you have time.  
1- Quotes based on Learning - https://startupistanbul.com/blog/2015/06/15-quotes-that-will-inspire-you-to-never-stop-learning/  
2- All remaining Quotes - https://ishwarjha.medium.com/365-quotes-to-motivate-you-for-all-365-days-in-2023-98daa5c61132  
