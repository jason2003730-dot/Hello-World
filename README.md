# Project Information 
This is a group project for a simple todo list webpage  

## Project Name
To-do List

## Group Number
Group 27

## Course Code
COMP 3810SEF

## Group Member
s1321724 Chenung Yu Hin  
s1384971 Lee Shing Chun  
s1403484 Su Wah Tung  
s1409437 Lau Pui Ham  
s1421037 Tsang Sung Yau

# Web Link-  
https://reindayo.top/ 

# Project File Introduction
## server.js
This is the main server file, providing the following functionality:  
- **User authentication (login, registration, logout)**  
- **CRUD operations for todo items (Create, Read, Update, Delete)**  
- **RESTful API endpoints**    
- **Session management and user authorization**  
- **Connection to MongoDB database**  

## package.json
Project dependencies include:  
- **express: Web framework**  
- **mongoose: MongoDB ODM**    
- **ejs: Template engine**    
- **cookie-session: Session management**  
- **body-parser: Request body parsing**  

## views
Contains EJS template files:  
- **login.ejs: Login page**    
- **register.ejs: Registration page**    
- **index.ejs: Main page displaying todo list**   
- **todo-edit.ejs: Todo editing page**    
- **Layout and partial component templates**  

## models
Data schemas defined via Mongoose:  
- **User model: User data structure**    
- **Todo model: Todo item data structure**  


# Operation Guides
## Login/Logout Page User Guide
Please create a new account via the registration page (A register now button will show on interface)  
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/8850f93b-2b8b-42cc-bd70-ebd8023a9645" />

## Registration Steps
Visit the /register path  
Enter a username (3–20 characters)  
Enter a password (at least 6 characters)  
Confirm your password  
Click the "Register" button  
<img width="400" height="400" alt="a9bc6942148c2761bb9d61c372d4b927" src="https://github.com/user-attachments/assets/67fc2182-2f63-4111-8816-ef17612a4d41" />



## Login Steps
Navigate to the homepage or the /login path  
Enter your username and password  
Click the "Login" button  
Upon successful login, you will be redirected to your personal todo page  
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/3226c145-4358-4bc7-bec9-50caf9772ece" />


# CRUD Web Operations Guide
## Create task
Enter a title and description in the form on the main page  
Click the "Task" button  
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/3c538f43-9fd8-4ace-93cb-205fc381cf0f" />


## Update
Click the "Edit" button next to the todo item  
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/01f7f09f-4ca9-4a6a-ba0e-512a950474f0" />  
Modify the title and description on the edit page  
Click the "save" button to save changes  
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/a69343a7-eabd-4d3e-b8b2-9a064c62e69b" />


## Delete
Click the "Delete" button next to the todo item  
The item will be deleted immediately  
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/c08ec998-ccd9-42bd-b4f3-b167afa8a1bf" />

## Toggle Complete
Click the checkbox to mark a todo as completed or not completed     (**Click Undo is not completed, click Done is completed**)  
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/6fce02fc-4fc3-4d85-8222-6816a2ea0c08" />


# Features
- **Create, read, update, and delete tasks**
- **User-specific task management**
- **Mark tasks as completed**
- **Clean and responsive user interface**

# Usage examples (For Linux)
 
## Get all tasks for all user  
curl -X GET "https://reindayo.top/api/todos"  

## Get a user's all tasks  
curl -X GET "https://reindayo.top/api/<the userID>"  

## Get a task content  
curl -X GET "https://reindayo.top/api/todos/<the taskID>"  

## Add a Task  
curl -X POST "https://reindayo.top/api/todos"  
-H "Content-Type: application/json"  
-d '{"title":"Task","description":"Description","completed":false,"userId":"<the userID>"}'  

## Update data for a task  
curl -X PUT "https://reindayo.top/api/todos/<the tasksID>"  
-H "Content-Type: application/json"   
-d '{"title":"Updated Task","completed":true}'    

## Delete a data  
curl -X DELETE "https://reindayo.top/api/todos/<the taskID>"  
