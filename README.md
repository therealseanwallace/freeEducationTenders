# [Free Education Tenders](https://justeducationtenders.co.uk)
Live link ☝️

## Description

This app displays UK Education tenders sourced from official sources and updated in near-real time.

This full stack app comprises three main components:

- An API crawler built in Node.JS and running 24/7 on an AWS Lightsail VM (hooray for three-month free trials!)
The crawler filters out education tenders and processes them into an object containing only the info we need for the front end. It then saves the tenders
to MongoDB using Mongoose.

- A Node.JS/Express app which presents a RESTful API with a single GET route which the client can use to get tenders.

- A React app hosted on GitHub pages ( with a custom URL) which displays tenders to users and allows getting tenders by category.

## Motivation

I built this app for a few reasons:

- I saw problems with several of the other places people go to find tenders in my industry, such as complex interfaces, signups required, and sometimes even payment.

- I was ready to flex my muscles building a full-stack app with some more complex functionality

- I'm a strong believer in the principles of free and open tendering AND the free software movement so this combination presented a golden opportunity to develop my skills in full-stack development.

## Key Learning

- Develop further my skills in Node JS and Express and how to apply the same skills to solving real-world problems

- Gained proficiency in the full workflow of deploying and releasing an app in the wild including:
    * Domain registration
    * DNS config and configuring GitHub pages to use custom domain
    * Deployment to Heroku
    * Creation and config via SSH of a AWS Lightsail VM to run my API crawler service

## Roadmap

- Add sorting of tenders (on the frontend) by date, category, status, etc.
- Add filtering (on the backend) of tenders by status

## Acknowledgements

- Contains public sector information licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/").

- Loading gif by Nevit Dilmen at [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Lightness_rotate_36f_cw.gif), licensed under [GNU Free Documentation License, version 1.2]()

## License

This is free software available under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).
