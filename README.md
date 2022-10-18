# week-10-node-009-live-project

Victoria Abioye
1. installed passport, express, express-session, passport-google-oauth2 and their types


# WhatsApp Clone


# user signup
POST

http://localhost:5000/signup
User Story
As a user, I want to be able to register using my email and choosing a password. A verification email should be sent to enable to verify my account.

+Acceptance Criteria:+
Input fields to enter are Email Address and Password.
All fields should be required.
Emails should be unique.
Verification email must be sent on successful signup
Bodyraw (json)
json
{
  "firstName": "Foluso",
  "lastName": "Kayode",
  "email": "folusolibrary@gmail.com",
  "phoneNumber": "08169606970",
  "password": "12345"
}


# user login
POST
http://localhost:5000/users/login

Authorization
Bearer Token
Token
Request Headers
Bodyraw (json)
json
{
  "email": "dupe@gmail.com",
  "password": "12345"
}

# logout
GET
http://localhost:5000/users/logout


# Edit Profile
PUT
update user profile
http://localhost:5000/userprofile/61f2c020f4d42840945793d6
Make things easier for your teammates with a complete request description.
Request Headers
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1a2FzaW4xQGdtYWlsLmNvbSIsImlhdCI6MTY0MzI5OTA5NywiZXhwIjoxNjQzMzg1NDk3fQ._AfKIAdqSmIK_ai_kDqhkynJZvs2x9Zxl4Ggg48ZZV8
Bodyraw (json)
json
{
  "firstName": "Ebuka1",
  "lastName": "Okafor2",
  "about": "Oga patapata at the top"
}

# get user profile
GET

http://localhost:5000/userprofile/61f2d6d9b1276d33416ea16a
Request Headers
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1a2FzaW4xQGdtYWlsLmNvbSIsImlhdCI6MTY0MzMwMTg5NCwiZXhwIjoxNjQzMzg4Mjk0fQ.Y2obQ3SsC4c0Lcd2VVVDv7P7FOJZVJwlzBDrf-1Bq_s
Change & Reset Password
Make things easier for your teammates with a complete folder description.
GET
change user password
http://localhost:5000/change_password/61f2c020f4d42840945793d6
Request Headers
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1a2FzaW4xQGdtYWlsLmNvbSIsImlhdCI6MTY0MzI5OTA5NywiZXhwIjoxNjQzMzg1NDk3fQ._AfKIAdqSmIK_ai_kDqhkynJZvs2x9Zxl4Ggg48ZZV8
Bodyraw (json)
json
{
  "password": "bukas1234",
  "passConfirm": "bukas1234"
}

# user forgot password

POST
http://localhost:5000/forgot_password
Bodyraw (json)
json
{
  "email": "bukasin1@gmail.com"
}

# user reset password
POST

http://localhost:5000/reset_password/61f2c020f4d42840945793d6/0f26a2f5ecfae2d865d70a7213192bdc2d87c82de31e147213f193b1eb344084
Bodyraw (json)
json
{
  "password": "bukas12345",
  "passConfirm": "bukas12345"
}

# Groups and Messages
POST
Create a new group
http://localhost:5000/groups
Make things easier for your teammates with a complete request description.
Bodyraw (json)
json
{
  "group_name": "testers",
  "group_desc": "we are the main testers"
}


# Create Group Messages
POST
http://localhost:5000/messages/g-message/61f5e1b0300ab21658b562e9
As a registered user, I can create and send messages (videos, text, audio and files) to other registered groups I belong to.
Usage
Make a POST request to '/messages/p-message/:groupId'.
Bodyform-data
messageContent
This is a message content.


# Create Private messages
POST
http://localhost:5000/messages/p-message
As a registered user, I can create and send messages (videos, text, audio and files) to other registered users and groups.
Usage
Make a POST request to '/messages/p-message/:receiverId'.
Sample Output
{ "message": "successful",
"newMessage": { "senderId": "61f93ddaf9c36b80077c783b",
"isRead": false,
"toFriend": true,
"toGroup": false,
"isDeleted": false,
"message": [ "https://res.cloudinary.com/samsonajulor/image/upload/v1643801985/whatsapp-clone-uploads/tmp-1-1643801980768_tq30an.pdf" ],
"_id": "61fa6d812f55c44f3a73a520",
"createdAt": "2022-02-02T11:39:45.900Z", "updatedAt": "2022-02-02T11:39:45.900Z",
},
"messageContent": { "src": "https://res.cloudinary.com/samsonajulor/image/upload/v1643801985/whatsapp-clone-uploads/tmp-1-1643801980768_tq30an.pdf" }}
Bodyform-data
messageContent
This is a text or file.

# Get private messages 
GET

http://localhost:5000/messages/p-message/
As a registered user I have access to all messages I have sent to and received from other registered users through this route.
Usage
Make a GET request to '/messages/p-message/:messageId'.
Expected Output
{
"0": {
"_id": "61f962cb9d7ff1c09cafadbf",
"senderId": "61f93ddaf9c36b80077c783b", "isRead": false,
"toFriend": false,
"toGroup": true, "isDeleted": false,
"message": [ null ],
"createdAt": "2022-02-01T16:41:47.881Z", "updatedAt": "2022-02-01T16:41:47.881Z", },
"1": {
"_id": "61f962d19d7ff1c09cafadc2",
"senderId": "61f93ddaf9c36b80077c783b", "isRead": false,
"toFriend": false,
"toGroup": true,
"isDeleted": false,
"message": [ null ],
"createdAt": "2022-02-01T16:41:53.035Z", "updatedAt": "2022-02-01T16:41:53.035Z",
"__v": 0 }}

# Get Group Messages
GET
http://localhost:5000/messages/g-message/61f5db7c446e04a292bee987
As a registered user I have access to all messages I have sent to and received from other groups registered users through this route.
Usage
Make a GET request to '/messages/g-message/:groupId'.
Sample Output
{ "messages": [
{ "_id": "61f962cb9d7ff1c09cafadbf", "senderId": "61f93ddaf9c36b80077c783b", "isRead": false,
"toFriend": false,
"toGroup": true,
"isDeleted": false,
"message": [ null ],
"createdAt": "2022-02-01T16:41:47.881Z", "updatedAt": "2022-02-01T16:41:47.881Z", "__v": 0 },
{ "_id": "61f962d19d7ff1c09cafadc2", "senderId": "61f93ddaf9c36b80077c783b", "isRead": false,
"toFriend": false,
"toGroup": true,
"isDeleted": false,
"message": [ null ],
"createdAt": "2022-02-01T16:41:53.035Z", "updatedAt": "2022-02-01T16:41:53.035Z",
} ]}

# Delete Private Messages
PUT
http://localhost:5000/messages/p-message
Make things easier for your teammates with a complete request description.
Bodyform-data
messageId
61f90ed09729bf22f8170b1f
PUT
Delete Group Messages
localhost:5000/messages/g-message/61f946bb2080b86bc3491a78
Make things easier for your teammates with a complete request description.
Add & Get All Friends
Make things easier for your teammates with a complete folder description.


# Get All Friends
GET
http://localhost:5000/users/friends
As a registered user I can login into my account and get all my friends
Usage
Make a GET Request to '/users/friends'
Sample Output
{
"status": "SUCCESS",
"friendList": [
{
"email": "susan@gmail.com",
"isFavourite": false,
"fullName": "susan susan",
"_id": "61fbebfd437ee160f5dbf050"
},
{
"email": "dupe@gmail.com",
"isFavourite": false,
"fullName": "Seun Taiwo",
"_id": "61fbed92437ee160f5dbf075"
},
{
"email": "adeola@gmail.com",
"isFavourite": false,
"fullName": "Matthew abiola",
"_id": "61fbedc9437ee160f5dbf08e"
}
]}
Request Headers
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1a2FzaW4xQGdtYWlsLmNvbSIsImlhdCI6MTY0MzMwNDcxMywiZXhwIjoxNjQzMzkxMTEzfQ.PJKfEOgcl31f9hn1ZTqNj-XiJyqRhR2z0etUW3Nm6Xg


# Add Friends
PUT
http://localhost:5000/addfriend/61f2d6d9b1276d33416ea16a
As a registered user I can login into my account and search for users and add them as friends using their unique email address.
Usage
Make a PUT Request to '/users/addfriend' and pass the friend to be email to the request body.
Sample Output
{
"message": "You have successfully added to friend list the user with the email address",
"newFriend": {}
}
Request Headers
Authorization
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1a2FzaW4xQGdtYWlsLmNvbSIsImlhdCI6MTY0MzMwNDcxMywiZXhwIjoxNjQzMzkxMTEzfQ.PJKfEOgcl31f9hn1ZTqNj-XiJyqRhR2z0etUW3Nm6Xg
Bodyraw (json)
json
{
  "email": "foluso.kayode.ng@gmail.com"
}


# Create Chat Group
POST
create new group
As a registered user with a verified email address I can login into my account and create a new group using group name
Usage
Make a POST Request to '/group/create_group' and pass the group name to be the request body.
Sample Output
{
"status": "SUCCESS",
"message": "Nodejs Family three group successfully created",
"info": {
"group_name": "Nodejs Family three", "group_members": [ "foluso2004@yahoo.com" ], "group_link": "http://localhost:5000/group/join?room=852b4aac373083f7d90076ecc085e4ef", "author": {
"name": "Oluwaseun Kayode",
"email": "foluso2004@yahoo.com"
},
"_id": "61fbe38668e0920e6680b99a",
"createdAt": "2022-02-03T14:15:34.920Z", "updatedAt": "2022-02-03T14:15:34.920Z",
"__v": 0
}}


# join group by link
GET 
As a registered with or without a verified email address I can click on a group link and join the group
Usage
Make a GET Request to '/group/join?room=uniqueValue' and user joins the group
Sample Output
{
"status": "SUCCESS",
"message": "You have been successfully added to the group"
}


# get all my groups
GET
As a registered with or without a verified email address I can click on a group link and join the group
Usage
Make a POST Request to '/group/all' and user joins the group
Sample Output
[ {
"author": {
"name": "Matthew abiola",
"email": "adeola@gmail.com"
},
"_id": "61f959b33e546ab03008d895", "group_name": "Nodejs Team D Family", "group_members": [
"adeola@gmail.com", "fyuooluso.kayode.ng@gmail.com", "olfoluso.kayode.ng@gmail.com", "foluso.kayode.ng@gmail.com", "foluso2004ng@yahoo.com"
],
"group_link": "http://localhost:5000/group/join?room=acc78af20c14908451fb2945707ba1e3"
},
{
"author": {
"name": "Oluwaseun Kayode",
"email": "foluso2004@yahoo.com"
},
"_id": "61fab81861a9b8ca93e4cda0", "group_name": "Nodejs Family",
"group_members": [
"foluso2004@yahoo.com", "foluso2004ng@yahoo.com"
],
"group_link": "http://localhost:5000/group/join?room=3590c49f2b2a7129d5f6c81b387ee9ac"
}]

# add to my group
POST
http://localhost:5000/group/
As a registered user with a verified email address I can add a user to the group I created using the user email address and the group link in the request body
Usage
Make a POST Request to '/group/add_member' and user joins the group
Sample Output
{
"message": "user successfully added to group"
}

## User Authentication
# User Registration
localhost:5000/users/signup
User registration route: User is expected to register/signup with First Name, Last Name, Valid Email, Valid Phone Number and a Password not less than 6 characters length.
An email verification link will be sent to the email address provided after a successful registration.
Usage:
Make a POST request to /users/signup
Expected Output:
{ "message": "Verification email has been sent to your email account", "emailToken": "Token goes here..."}
Bodyraw (json)
json
{
  "firstName": "Zack",
  "lastName": "Bello",
  "email": "obomheire@yahoo.com",
  "phoneNumber": "08030875576",
  "password": "Secret@123"
}

# User Login
POST

localhost:5000/users/login
User Login route: Only registered user is given the access to login. User is expected to login with their registered Email and a Password.
Unverified user will have a limited access after a successful login. However a refresh email verification will be sent to the user for restricted access point.
Usage:
Make a POST request to /users/login
Expected Success Output:
{ "Message": "User successfully login", "accessToken": "Access Token goes here..."}
Request Headers
Bodyraw (json)
json
{
  "email": "obomheire@yahoo.com",
  "password": "Secret@123"
}

# Get Group Info 
GET
Get basic information about a group: Only registered user is given access to get informations about a group. User will receive a refresh verification email to access this end point.
Usage:
Make a GET request to /users/groupinfo/group_id
Expected output:
{ "groupName": "group_name", "groupImage": "group_image.jpg", "groupDescription": "Group_description", "groupMembers": [ "member_email" ], "groupLink": "group_link"}


# GET USER PROFILE
Get basic information about other users: Only registered user is given access to get informations about other users. User will receive a refresh verification email to access this end point.
Usage:
Make a GET request to /users/userprofile/
Expected output:
{ "_id": "61f945c5daa23198d9c2c2ad", "firstName": "Taribo", "lastName": "Opotu", "email": "fistotech@gmail.com", "phoneNumber": "08098987957", "isVerified": true, "profilePic": "https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png", "emailToken": null, "cloudinary_id": "", "password": "$2b$10$d3TTvSlwSbPYu7cUwx35v.PzmO5spXP1YunDLhq/uc/YLPJEtDHUW", "provider": "local", "about": "", "date": "2022-02-01T14:37:29.961Z", "friends": [ { "email": "xnotime247@gmail.com", "isFavourite": true, "fullName": "Taribo Opotu", "_id": "61f999a69dd1c16d76d884af" }, { "email": "taribo.tamex@gmail.com", "isFavourite": true, "fullName": "Taribo Opotu", "_id": "61f999c39dd1c16d76d884b8" }, { "email": "jamesoputibeya@gmail.com", "isFavourite": true, "fullName": "Taribo Opotu", "_id": "61f999dd9dd1c16d76d884c3" }, { "email": "xnotime247@yah00.com", "isFavourite": false, "fullName": "Taribo Opotu", "_id": "61f99ba09dd1c16d76d88507" } ], "__v": 1, "groupId": []}

# UPDATE USER PROFILE
GET
GET ALL FAVORITE FRIENDS
As a User I want to be able to see the list of my favuorites friends so I can chat with them.
Usage:
User should make a post request :user/getallfavoritefriends
Output: this will display the list of all friends added to favouritefriends.
Expected output:
{
"Status" : "Success",
"Favourite" : [
"Taribo Opotu"
"Taribo Opotu",
"Taribo Opotu"
]
}

# ADD FAVORITE FRIEND
GET
As a User I want to be able to see the list of my favourites friends so I can chat with them.
Usage:
User should be able to make a get request : users/addfavoritefriend
The User should be able to add an existing friend to his list of favourites friends using the friend's email
Expected Output:
{
"status" : "user added successfully"
}


# Search Friend
GET
As a login User i should able to search for particular friends amidst all my friends
Usage:
Make a GET request to this end-point to search for your friend which are not your favourite. input the part/full character of the friend name in the input field to search.
Sample Output:
{ "result": [ { "email": "hademath1@gmail.com", "isFavourite": false, "fullName": "Adeleke Matthew", "_id": "61fa8f3e92e6961a8eacd1aa" }, { "email": "ololade@gmail.com", "isFavourite": false, "fullName": "ololade Davivid", "_id": "61fb10e9dea03bacd0987dee" } ]}

# Search Groups
GET
As a login User i should able to search for the group i belong using
Usage:
Make a GET request to this end-point to search for the groups you belong. input the part/full character of the group name in the input field to search.
Sample Output:
JSON
{
  "result": [
    {
      "GroupName": "Testing Group",
      "GroupMembers": [
        "hademath1@gmail.com",
        "anslem@gmail.com"
      ],
      "GroupAuthor": {
        "name": "Adeleke Matthew",
        "email": "hademath1@gmail.com"
      }
    }
  ]
}

# Search Favourite

GET
As a login User i should able to search for a particular friends amidst all my friends which are my favourite
Usage:
Make a GET request to this end-point to search for your friend which are your favourite. input the part/full character of the friend name in the input field to search.
Sample Output:
JSON
{
  "result": [
    {
      "email": "Adebayo@gmail.com",
      "isFavourite": true,
      "fullName": "Adebayo Turayo",
      "_id": "61fa8f3e92e6961a8eacd1aa"
    },
    {
      "email": "ololade@gmail.com",
      "isFavourite": true,
      "fullName": "ololade Davivid",
      "_id": "61fb10e9dea03bacd0987dee"
    }
  ]
}


# Forgot Password
POST
http://localhost:5000/forgot_password
As a registered user, i should be able to request for reset password if i forgot using my registered email.
Usage
Make a POST request to this end-point to request for the reset password link via the registered email provided in the body. The end is meant to send the link to the email provided.
Sample Output
Bodyraw (json)
json
{
  "email": "segunsd55@gmail.com"
}

# Reset Password
POST
As a registered user, i should be able to reset my password if i forgot it but still have my email.
Usage
Make POST request to this end-point by providing the new password you are to use for your account and confirm the password in the second field.
Sample input:
JSON
{
  "password": "129000",
  "passConfirm": "129000"
}
Sample Output

# Change Password
GET
http://localhost:5000/change_password/61e5e80ef2b08063cb0e4fb2
As a logged in user i should be able to request to change my password anytime i feel like.
Usage:
Make a GET request to this end-point to change your password by providing the current password and intended new password
Sample Input:
JSON
{
  "oldPasswrd": "123456",
  "password": "123456abc",
  "passConfirm": "123456abc"
}
Sample Output
JSON
"message": "password reset succesfully"
Bodyraw (json)
json
{
  "password": "124544"
}