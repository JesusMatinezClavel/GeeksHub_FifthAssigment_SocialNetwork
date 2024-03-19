# Tattoo's Studio📢

![Tattoo_Studio](./img/Tattoo_Studio.png)

<details>
  <summary>Content 📝</summary>
  <ol>
    <li><a href="#objective">Objective</a></li>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#stack">Technologies used</a></li>
    <li><a href="#diagram-bd">Diagram</a></li>
    <li><a href="#Local-installation">Installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Objective 🎯
This project has the objetive of building the necessary API for managing a Social Network using Express and mongoose technology.

## About the project📑

This GeeksHub's assignment has the primary objective of learning to work with Express + Mongoose technology to build the structure needed for the database of a social website, and deploy it into fl0.

In this project I've created different seeders (to test the funcionality) and the controllers needed for the assignment. 
In this social network you can register (using your email and a nickname) and you can create new posts, aside from looking other people's posts and give or take a like from it.

Other funcionalities included for the superadmin are deleting users, updgrading roles and selecting users by email.



## Technologies used 💻
<div align="center">
<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
</a>
<a href="https://nextjs.org/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://www.docker.com/">
    <img src= "https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</a>
<a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/mysql-3E6E93?style=for-the-badge&logo=mysql&logoColor=white"/>
</a>
<a href="https://git-scm.com/">
    <img src= "https://img.shields.io/badge/git-F54D27?style=for-the-badge&logo=git&logoColor=white"/>
</a>
<a href="https://www.github.com/">
    <img src= "https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white"/>
</a>
<a href="https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-grey?style=for-the-badge&logo=JSON%20web%20tokens"/>
</a>
 </div>

## DB Diagram📉
![Diagram for the first tables created](./img/Diagram_Tables.png)

## Local installation🔨
1. Clone the repository:

	[SocialNetworks repository](https://github.com/JesusMatinezClavel/GeeksHub_FifthAssignment_SocialNetwork.git)

2. Install the dependencies

    ` $ npm install `

3. Create the file `.env` from `.env.sample` and change the values to your needs:

    Port where the server will be:

        PORT_URI=

    Token's secret:

        JWT_SECRET=

4. Conect our repository with the database

    `$ npm run dev`

5. Execute the seeders

    ` $ npm run seed`

7. Import the ThunderClient collection from: 

    `./src/database/HTTP`

## Endpoints🚩
<details>
<summary>Endpoints</summary>

- AUTH
    - REGISTER

            POST localhost:4000/api/auth/register
        body:
        ``` js
                {
                  "firstName": "Jesús",
                  "lastName": "Martínez-CLavel Vallés",
                  "nickName": "xuss",
                  "profileImg": "./img/default-ProfileImg.png",
                  "bio": "Xuso, un apasionado estudiante de programación en constante búsqueda de desafíos y aprendizaje",
                  "birthDate": "1992-06-04",
                  "email": "xuso@email.com",
                  "passwordBody": "aA123456"
                }
        ```

    - LOGIN

            POST localhost:4000/api/auth/login 
        body:
        ``` js
                {
                  "email": "user@user.com",
                  "password": "Pwd12345"
                }
        ```

    - LOGOUT

            POST localhost:4000/api/auth/logout


- SUPERADMIN

    - Get All Users

            GET localhost:4000/api/users?limit&page

    - Get User by Email

            POST localhost:4000/api/users?email=ejemplo@ejemplo.com

    - Update User

            Put localhost:4000/api/users/:id

    - Delete User

            DELETE localhost:4000/api/users/:id

- USERS
    - Get Own Profile

            GET localhost:4000/api/users/profile

    - Update Own Profile

            PUT localhost:4000/api/users/profile
        body:
        ``` js
            {
              "firstName": "user",
              "lastName": "test",
              "email": "user@user.com",
              "password": "password"
            }
        ```

- APPOINTMENTS
    - New Appointment

            POST localhost:4000/api/appointments
        body:
        ``` js
            {
              "date": "2022-02-03",
              "service": "3"
            }
        ```

    - Update Appointment

            PUT localhost:4000/api/appointments
        body:
        ``` js
            {
              "appointmentID": 16,
              "date": "2029-11-04",
              "service": "4"
            }
        ```

    - Get Appointments

            GET localhost:4000/api/appointments
        body:
        ``` js
            {
              "appointmentID": 16,
              "date": "2029-11-04",
              "service": "4"
            }
        ```

    - Get Appointments by ID

            GET localhost:4000/api/appointments/:id
        body:
        ``` js
            {
              "appointmentID": 16,
              "date": "2029-11-04",
              "service": "4"
            }
        ```

- SERVICES
    - Get All Services

            GET localhost:4000/api/appointments

    - Create New Service

            POST localhost:4000/api/services
        body:
        ``` js
            {
            "serviceName": "toigo",
            "description": "Ofrecemos servicios profesionales para la colocación de piercings y dilatadores. Nuestro equipo garantiza procedimientos seguros y estilos variados para satisfacer las preferencias individuales de nuestros clientes."
            }
        ```

    - Update Service

            PUT localhost:4000/api/services/:id
        body:
        ``` js
            {
              "serviceName": "3",
              "description": "huio"
            }
        ```

    - Delete Service

            DELETE localhost:4000/api/services/:id

</details>

## Contributions🤘
Sugestions are always welcomed!

You can do it both ways:

1. Create an issue
2. Create a fork of the repository
    - Create new branch
        ```
        $ git checkout -b feature/nombreUsuario-mejora
        ```
    - Commit the changes
        ```
        $ git commit -m 'feat: mejora X cosa'
        ```
    - Push the branch
        ```
        $ git push origin feature/nombreUsuario-mejora
        ```
    - Open a Pull Request

## Contact📧
<a href = "mailto:jmcvalles@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/jes%C3%BAs-mart%C3%ADnez-clavel-vall%C3%A9s-913294108?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BtQmk%2FVrTShiKcofYcK6uYg%3D%3D" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>

