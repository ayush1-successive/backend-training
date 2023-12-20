# Mongoose Overview

## Table of Contents

- [Introduction](#introduction)
  - [What is MongoDB?](#what-is-mongodb)
  - [Key Features](#key-features)
- [Object-Relational Mapping (ORM)](#object-relational-mapping-orm)
- [Introduction to Mongoose](#introduction-to-mongoose)
  - [What is Mongoose?](#what-is-mongoose)
  - [Key Features of Mongoose](#key-features-of-mongoose)
- [Distinctions Between RDBMS and NoSQL Databases](#distinctions-between-rdbms-and-nosql-databases)

## Introduction

### What is MongoDB?

MongoDB is a NoSQL (Not Only SQL) database that provides a flexible, scalable, and high-performance data storage solution. It is classified as a document-oriented database, meaning it stores data in BSON (Binary JSON) documents, which are JSON-like objects with optional schemas.

### Key Features

- **Document-Oriented:** Data is stored in flexible, JSON-like BSON documents.
- **Schema-less:** No rigid schema requirements, allowing easy data evolution.
- **Scalability:** Horizontally scalable by sharding data across multiple servers.
- **High Performance:** Supports indexing and provides efficient querying.
- **Aggregation Framework:** Powerful and expressive query language.

## Object-Relational Mapping (ORM)

Object-Relational Mapping is a programming technique that converts data between incompatible type systems in object-oriented programming languages. In the context of databases, it allows developers to interact with a database using an object-oriented paradigm.

## Introduction to Mongoose

### What is Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data. Mongoose helps in defining the structure, validation, and relationships of your data in a MongoDB database.

### Key Features of Mongoose

- **Schema Definition:** Define data structures using a schema.
- **Validation:** Enforce data integrity through predefined validation rules.
- **Middleware:** Execute functions before or after certain events.
- **Query Building:** Expressive API for building MongoDB queries.
- **Population:** Populate documents with references from other collections.

## Distinctions Between RDBMS and NoSQL Databases

The following table illustrates the key differences between RDBMS and NoSQL database:

| Feature                             | RDBMS                                                                       | MongoDB                                                                                            |
| ----------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Data Structure**                  | Tabular structure with predefined schema.                                   | Document-oriented with flexible, schema-less BSON documents.                                       |
| **Schema**                          | Strict, predefined schema.                                                  | Dynamic and evolving schema.                                                                       |
| **Scalability**                     | Vertical scaling (adding more power to existing hardware).                  | Horizontal scaling (adding more machines to your database).                                        |
| **Flexibility**                     | Limited flexibility due to rigid schema.                                    | High flexibility with dynamic schema.                                                              |
| **Query Language**                  | SQL (Structured Query Language).                                            | JSON-like query language.                                                                          |
| **Consistency and ACID Properties** | Emphasizes ACID properties (Atomicity, Consistency, Isolation, Durability). | Sacrifices strict consistency for performance and scalability.                                     |
| **Use Cases**                       | Best suited for applications with complex transactions and relationships.   | Ideal for projects with evolving schemas, large amounts of data, and horizontal scalability needs. |
