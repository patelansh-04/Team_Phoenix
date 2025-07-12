# 🔐 Auth API
| Method | Route                | Description        |
| ------ | -------------------- | ------------------ |
| POST   | `/api/auth/register` | Register user      |
| POST   | `/api/auth/login`    | Login & get token  |
| POST   | `/api/auth/logout`   | Clear login cookie |
| GET    | `/api/auth/me`       | Get logged-in user |

# 👤 User Profile
| Method | Route                | Description                      |
| ------ | -------------------- | -------------------------------- |
| PUT    | `/api/users/profile` | Update user name (auth required) |


# ✅ Task API (Auth Required)
| Method | Route                   | Description     |
| ------ | ----------------------- | --------------- |
| GET    | `/api/tasks/getTasks`   | Get your tasks  |
| POST   | `/api/tasks/createTask` | Create new task |




# ✅ Items API (Auth Required)
| Method | Route                   | Description     | Output    |
| ------ | ----------------------- | --------------- | --------- |
| GET    | `/api/items`            | Get All Items   | res.featuredItems |
| POST   | `/api/tasks/createTask` | Create new task |           |


# 🧠 Notes
Roles:
- user (default): Can manage own tasks
- admin: Can view all tasks