# To-Do List
This is a group project for a simple todo list webpage 
# Project Information 
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

# CRUD Web Operations Guide
## Create task
Enter a title and description in the form on the main page  
Click the "Task" button  
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/3c538f43-9fd8-4ace-93cb-205fc381cf0f" />


# Table of contents
- [Logo](#logo)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Usage Examples](#usage-examples)


# Logo
<img width="516" height="646" alt="image" src="https://github.com/user-attachments/assets/e4f68fa1-5f56-49a4-9621-5ec988d8c653" />

# Screenshots
<img width="2017" height="1013" alt="image" src="https://github.com/user-attachments/assets/48e898de-dca4-4497-a880-f4efb3abb0d6" />

# Features
- Create, read, update, and delete tasks
- User-specific task management
- Mark tasks as completed
- Clean and responsive user interface

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
