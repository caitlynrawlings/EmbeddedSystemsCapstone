# Embedded Systems Project Website Source Code

## To Run Website Locally
Run `npm install` then `npm start`.  
A window should open to developer view of the website. You can also navigate to this view by navigating to url http://localhost:3000/EmbeddedSystemsCapstone.  

For additional information view [Create React App Docs.](https://create-react-app.dev/)

## To Deploy Website
The website automatically deploy on new pushes to the main branch of this repo. It may take a few minutes after pushing to update. You can check the progress of the workflow that updates the website at https://github.com/caitlynrawlings/EmbeddedSystemsCapstone/actions.  

You can view the deployed website at https://caitlynrawlings.github.io/EmbeddedSystemsCapstone/.

## Directory Structure
```
├── src  
│   ├── components  
│   │   ├── NavBar : the navigation menu  
│   │   └── PageLayout : basic layout for each page with heading and center body  
│   ├── constants  
│   │   ├── assignments : names and descriptions of assignments  
│   │   ├── productRequirementsDoc : the text of the PRD  
│   │   ├── sections : the names of the sections on the navigation bar  
│   │   └── weeklyNotebooks : array of entries for weekly notebook. also contains the type of an entry  
│   └── pages : contains files for each page on website  
│       └── assignments : contains files for each assignment page. can navigate to these pages on the website from the "Assignments" page  
├── public  
│   └── media : folder containing images and videos that display on the website  
├── package.json : Has website dependencies  
└── README.md : You are here
```
