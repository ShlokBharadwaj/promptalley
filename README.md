# promptalley

Promptalley is a platform for users to find and share prompts. Ever wondered seeing an AI-generated image and thought, ***"I wonder what prompt they used to get that result?"*** Worry no more. With Promptalley, users can share both text or image-based prompts.

## Live Demo

You can view the live demo of PromptAlley [here](https://promptalley.vercel.app/).

## Screenshot

![screenshot](/public/assets/images/promptalley-screenshot.png)

## Technologies Used

This project is built with the following technologies:

- **Next.js**: A React framework used for building full-stack applications.
- **MongoDB Atlas**: Used for storing user details and user prompts.
- **NextAuth.js**: Provides authentication support, enabling users to log in with Google and GitHub.
- **Firebase**: Used for storing user-uploaded images corresponding to a prompt.
- **Vercel**: Used for deploying the application.
- **Tailwind CSS**: A utility-first CSS framework used for styling the application.

## Installing promptalley

To install promptalley, follow these steps:

1. Clone the repository:
   ```
   git clone git@github.com:ShlokBharadwaj/promptalley.git
   ```
2. Navigate to the project directory:
   ```
   cd promptalley
   ```
3. Install dependencies:
   ```
    npm i
    ```
4. Start the application:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Using promptalley

To use promptalley, follow these steps:

<!-- Create a .env files with keys, take .env.sample for reference-->

1. Go to the root of the project and create a `.env` file.

```
touch .env
```

2. Navigate to `.env.example` and copy the contents to `.env`.

```
cp .env.example .env
```

3. Replace the values of the keys with your own values.

*Hint*: _Follow the directions in the `.env.example` to know what values to change and where to find those values._

## Contributing to promptalley

To contribute to promptalley, follow these steps:

1. **Fork this repository.**
    - Click the 'Fork' button on the top right corner of this repository and wait for the process to complete. This will create a copy of this repository in your account.

2. **Clone the forked repository to your local machine.**
    - Go to your GitHub account, open the forked repository, click on the 'Code' button and then click the 'copy to clipboard' icon to get the clone command.
    - Open a terminal and run the following git command:
      ```
      git clone "url you just copied"
      ```

3. **Create a new branch where you'll make your changes.**
    - Navigate to the cloned directory.
    - Create a new branch using the `git checkout` command:
      ```
      git checkout -b <branch_name>
      ```
    - For example:
      ```
        git checkout -b feature
        ```


4. **Make your changes and commit them.**
    - Make the changes in the code.
    - Use the `git add` command to add the files you've changed:
      ```
      git add .
      ```
    - Use the `git commit` command to save your changes locally:
      ```
      git commit -m '<commit_message>'
      ```

5. **Push your changes to your forked repository.**
    - Use the `git push` command to upload your changes to your forked repository on GitHub:
      ```
      git push origin <branch_name>
      ```

6. **Create a pull request.**
    - Go to your GitHub account, open the forked repository, click on the 'Pull request' button, and create a new pull request.

Please ensure your pull request adheres to our coding conventions and is consistent with the project's style. If you're unsure about anything, feel free to ask!

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [LICENSE](./LICENSE) file for details.