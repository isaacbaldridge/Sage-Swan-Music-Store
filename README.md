--- E-commerce Capstone Project ---


--- Description ---

We have created an e-commerce website named Sage Swan that sells a variety of musical instruments. This site has register/login features, a user profile page with conditional rendering based on the user's admin status, a functional cart page with quantity adjustment, delete item/clear cart functions, and a checkout button that renders a confirmation page. A homepage features data rendered from database created for this project, with the option for single item views and 'add to cart' functionality. The user's profile page has admin capability when admin boolean is 'true', which allows user to see a list of users and a list of items in database, with options to add/delete/modify items in database.


--- Instructions ---

1. **Don't fork or clone this repo!** Instead, create a new, empty directory on your machine and `git init` (or create an _empty_ repo on GitHub and clone it to your local machine)

2. Add this template as a remote and merge it into your own repository
```bash
git remote add boilermaker git@github.com:DevDynasty2/stonecap.git
git fetch boilermaker
git merge boilermaker/main
```

3. Install packages
```bash
npm i
```

4. Add a `.env` file with your secret value for auth
```
JWT_SECRET='somesecretvalue'
```

5. Create the database
```bash
createdb your-database-name
```

6. Update `src/server/db/client.js` to reflect the name of your database
```js
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/your-database-name';
```

7. Seed the database
```bash
npm run seed
```

8. Start the server
```bash
npm run dev
```

9. Open your browser at `http://localhost:3000`

10. Build something cool! 😎

--- Dependencies ---

    "bcrypt": "^5.1.1",

    "body-parser": "^1.20.2",

    "bootstrap": "^5.3.1",

    "dotenv": "^16.3.1",

    "express": "^4.18.2",
    
    "jsonwebtoken": "^9.0.1",
    "pg": "^8.11.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.8.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "vite-express": "^0.9.2",
    "volleyball": "^1.5.1"

--- Contributors ---
Name: Beccah Lenhart
GitHub: https://github.com/beccahlen
LinkedIn: https://www.linkedin.com/in/beccah-lenhart/

Name: Isaac Baldridge
GitHub: https://github.com/isaacbaldridge
LinkedIn: https://www.linkedin.com/in/isaac-baldridge/

Name: Bryce Lowry
GitHub: https://github.com/blowry1463
LinkedIn: https://www.linkedin.com/in/bryce-lowry/

Name: Divineshia Sharon
GitHub: https://github.com/Divineshia 
LinkedIn: https://www.linkedin.com/in/divineshia-sharon

Name: Jasmine Elliot
GitHub: https://github.com/jellio26
LinkedIn: https://www.linkedin.com/in/jasmine-elliott-8a7052280/