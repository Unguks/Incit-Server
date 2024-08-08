# smart-city-hub-server

The Incit-Server API serves as the backend for a web application for logging in and signup either using password/facebook/google. It also serve as assignment project from INCIT 

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js installed
- SQL-based relational database installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Unguks/Incit-Server.git
   ```

2. Switch repositories:

   ```bash
   cd Incit-Server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a .env file in the root directory with the following variables:

```bash
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
```

### Usage

Start the server:

```bash
node app.js
```

it should show this if work correctly

```bash
Database connected and models synced
Server is Running On:3000
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/)
