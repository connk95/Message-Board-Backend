# Message Board Project (Backend)

Welcome to my message board! This project aims to create a simple message board/SNS on which users can create an account, make posts, and interact with one another's posts. The backend of this project was created using Typescript, Mongoose, Node (Nestjs), and uses a MongoDB database.

## Table of Contents

- [Features](https://github.com/connk95/Message-Board-Backend/blob/main/README.md#features)
- [Installation](https://github.com/connk95/Message-Board-Backend/blob/main/README.md#installation)
- [Code Description](https://github.com/connk95/Message-Board-Backend/blob/main/README.md#code-description)
- [Contributing](https://github.com/connk95/Message-Board-Backend/blob/main/README.md#contributing)
- [License](https://github.com/connk95/Message-Board-Backend/blob/main/README.md#license)
- [Acknowledgements](https://github.com/connk95/Message-Board-Backend/blob/main/README.md#acknowledgements)

## Features

- Handles requests from the frontend to create or retrieve user, post, and message data.
- Implements Passport strategies for authentication.
- Connects the Message Board app to MongoDB.

## Installation

1. Clone this repository using the following command:
   ```
   git clone https://github.com/connk95/Message-Board-Backend.git
   ```

2. Navigate to the project directory:
   ```
   cd Message-Board-Backend
   ```

3. Run the app and view in your browser (You must run the frontend to make use of this app!):
   ```
   npm run start
   ```

## Code Description

[Auth](https://github.com/connk95/Message-Board-Backend/tree/main/src/auth) - Contains the [Auth Controller](https://github.com/connk95/Message-Board-Backend/blob/main/src/auth/auth.controller.ts) which handles post and ged requests from the frontend for logging in, logging out, and retrieving profile data. [Auth Service](https://github.com/connk95/Message-Board-Backend/blob/main/src/auth/auth.service.ts) contains logic for validating user credentials, and retrieving data from the database.

[Comments](https://github.com/connk95/Message-Board-Backend/tree/main/src/comments) - Contains the [Comments Controller](https://github.com/connk95/Message-Board-Backend/blob/main/src/comments/comments.controller.ts) which handles post and get requests from the frontend for creating and retrieving comments. [Comments Service](https://github.com/connk95/Message-Board-Backend/blob/main/src/comments/comments.service.ts) contains logic for attributing a comment to its respective parent post, and its user, as well as retrieving comment data from the database.

[Posts](https://github.com/connk95/Message-Board-Backend/tree/main/src/posts) - Contains the [Posts Controller](https://github.com/connk95/Message-Board-Backend/blob/main/src/posts/posts.controller.ts) which handles post and get requests from the frontend for creating and retrieving posts. [Posts Service](https://github.com/connk95/Message-Board-Backend/blob/main/src/posts/posts.service.ts) contains logic for creating posts and attributing it to the user, retrieving single or multiple posts, and attributing comments to the parent post.

[Users](https://github.com/connk95/Message-Board-Backend/tree/main/src/users) - Contains the [Users Controller](https://github.com/connk95/Message-Board-Backend/blob/main/src/users/users.controller.ts) which handles post and get requests from the frontend for creating and retrieving users. [Users Service](https://github.com/connk95/Message-Board-Backend/blob/main/src/users/users.service.ts) contains logic for creating users, retrieving single or multiple users, and attributing posts or comments to the user.

## Contributing

Contributions to this project are welcome! If you find any bugs or have ideas for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- This project was created by Connor Ketcheson.
- Special thanks to [Edward Peng](https://github.com/edwardnz2017) for their guidance and support.

Enjoy your message board experience! If you have any questions or feedback, please don't hesitate to contact us.

---
