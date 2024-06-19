------ CREATE DATABASE ------

-- DROP DATABASE quotes;

CREATE DATABASE quotes
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.1252'
    LC_CTYPE = 'English_India.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

------ CREATE TABLE ------

-- DROP TABLE public.quotes;

CREATE TABLE public.quotes
(
    sr_no serial NOT NULL,
    quote character varying(300) COLLATE pg_catalog."default",
    author character varying(50) COLLATE pg_catalog."default",
    topic character varying(20) COLLATE pg_catalog."default",
    quote_date character varying(6) COLLATE pg_catalog."default",
    CONSTRAINT quotes_pkey PRIMARY KEY (sr_no),
    CONSTRAINT quotes_quote_date_key UNIQUE (quote_date)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.quotes
    OWNER to postgres;
