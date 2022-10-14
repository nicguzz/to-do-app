# final-boiler-plate

This template should help get you started developing the final project running on Vue 3 with the composition API, Pinia as a state management tool, vue router, vite and lastly Supabase running on the backend.

This is meant as an advanced starter ready to plug in your supabase variables and run directly on a local server already connected to your Supabase instance.

You are given some functions to see how the supabase ecosystem works with Vue and more specifically, pinia as a state management tool.

You can add any CSS framework of your liking like tailwindCSS, Bootstrap, MaterialUI or many of the cool libaries that exist in the web.

## Important

This app is not setUp to be deployed to a production environment like vercel or netlify.

## Project Setup

```sh
npm install
```

## Set Up your Environment Variables from Supabase located at the root folder of the project

```sh
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

#### Once you have added your environment variables, head to your .gitIgnore file located at the root folder and uncomment the .env file naming to avoid sharing any private access keys to your database

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### To Do App

## **Oct 4**

_Done:_

- Sign in and Sign up section box implemented.
- Background image too.
- EyeIcon implemented but might need some improvements(shorter code)

## **Oct 5**

_Done:_

- Add task
- Edit task
- Complete task
- Logout button working

## **Oct 6**

_Done:_

- Added function to revert a completed task to incomplete
- Navbar done
- Footer Done
- Some fixes to be made

## **Oct 7**

_Done:_

- Footer fixed
- Minor fixes in Task Complete/Edit/Delete Icons
- When clicking to complete task, it doesnt change to completed task automatically, this is an important issue.

## **Oct 10**

_Done:_

- Responsive design is done
- Some fixes in margin, padding
- Time format
- Clean code with sonarcloud.io
- style.css ordered

## **Oct 12**

_Done:_

- Tried to implement Google Auth signin, but could not make it work.
- Tried to implement Sweetalert2, but could not make it work either.
- I spent the last 2 days trying to make these 2 features work, but something was failing, I decided to drop these for the moment.

## **Oct 13**

_Done:_

- Prepared Slides for this presentation
