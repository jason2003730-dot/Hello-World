# To-Do List
This is a project for a simple todo list webpage 
# Web Link-
https://reindayo.top/ 
# Table of contents
-Logo  
-functions  
-Screenshots  


# Logo
<img width="516" height="646" alt="image" src="https://github.com/user-attachments/assets/e4f68fa1-5f56-49a4-9621-5ec988d8c653" />




# Screenshots
<img width="2017" height="1013" alt="image" src="https://github.com/user-attachments/assets/48e898de-dca4-4497-a880-f4efb3abb0d6" />

# Functions
// for Linux
// get all tasks for all user
curl -X GET "https://reindayo.top/api/todos"

// get a user's all tasks
curl -X GET "https://reindayo.top/api/<the userID>"

// get a task content
curl -X GET "https://reindayo.top/api/todos/<the taskID>"

// add a Task
curl -X POST "https://reindayo.top/api/todos" -H "Content-Type: application/json" -d '{"title":"Task","description":"Description","completed":false,"userId":"<the userID>"}'

// update data for a task
curl -X PUT "https://reindayo.top/api/todos/<the tasksID>" -H "Content-Type: application/json" -d '{"title":"Updated Task","completed":true}'

// delete a data
curl -X DELETE "https://reindayo.top/api/todos/<the taskID>"
