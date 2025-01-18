# Civil-Registry-Client
This project serves as the front-end application for managing civil registry records, built using React and TypeScript. The project utilizes Vite as the build tool, making the development and build process faster and more efficient.

# Table of Contents
<ul>
  <li><a href="#introduction">Introduction</a></li>
  <li><a href="#gettingStarted">Getting Started</a></li>
  <li><a href="#prerequisites">Prerequisites</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#runCLient">Run Client</a></li>
  <li><a href="#">Environment Variables</a></li>
</ul>

<h1 id="introduction">Introduction</h1>
The Civil-Registry-Client is a user-friendly web application for interacting with the backend server. It provides a seamless UI to manage certificate records, registration forms, and other civil registry processes.

<h1 id="gettingStarted">Getting Started</h1>
Follow the steps below to set up and run the front-end of this project on your local machine.

<h1 id="prerequisites">Prerequisites</h1>
Make sure you have the following installed:
<ul>
  <li>Node.js (v14 or higher) - <a href="https://nodejs.org/en">Download Node.js</a></li>
  <li>npm or Yarn (latest version) – npm comes bundled with Node.js, or you can install Yarn separately. </li>
  <li>Git (latest version) - <a href="https://git-scm.com/downloads">Download Git</a></li>
</ul>

<h1 id="installation">Installation</h1>

1. Clone the repository:
   ```bash
   git clone https://github.com/zizaaa/Civil-Registry-IS-Client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Civil-Registry-IS-Client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

<h1 id="runCLient">Running the Client</h1>

1. Start the client:
   ```bash
   npm run dev
   ```
<h1 id="env">Environment Variables</h1>

Create a `.env` file at the root of the project to configure your environment variables. Below is an example `.env` file:
  ```env
   VITE_REACT_SERVER_URL=http://localhost:8000
   VITE_REACT_CLIENT_URL=http://localhost:5173
   VITE_REACT_SITEKEY = "key"
  ```
