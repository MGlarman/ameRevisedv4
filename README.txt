Strange Encounters Magazine

A horror-themed digital magazine featuring short stories, book reviews, author interviews, and interactive content. Built with React, Tailwind CSS, and a JSON API for content delivery.

About

Strange Encounters Magazine is a creative project that acts as a blog and a magazine outlet. The goal of this project is to showcase my skills in web development, content creation, and technical writing. It demonstrates how to build a responsive digital magazine, implement a JSON API for articles, and document technical processes for developers.

Features

Responsive website design for desktop and mobile

Magazine with:

Feature short stories

Book reviews and articles

Website features:

JSON API for fetching articles and stories

Developer guide for using the API

Tips for aspiring writers and interactive content sections

Technologies

React

Tailwind CSS

JSON API

PowerPoint (for initial magazine layout/design mockups)

Installation / Usage

Running Locally:

Clone the repository:
git clone https://github.com/yourusername/strange-encounters-magazine.git

Install dependencies:
npm install

Run the project:
npm start

Open your browser at http://localhost:5173

Note: If you only want to view the magazine, you can visit the live demo here: [YOUR_LIVE_LINK]

JSON API

The project includes a simple JSON API to provide content dynamically. You can fetch articles, stories, and quotes programmatically.

Example:
fetch('https://yourdomain.com/api/articles.json')
.then(response => response.json())
.then(data => console.log(data))

Sample JSON structure:
{
    "reviews": 
    [
        {
        "id": 1,
        "title": "11/22/63",
        "author": "Stephen King",
        "review": "A gripping time-travel novel..."
        }
    ]
}

Screenshots / Demo

Frontpage of Strange Encounters Magazine: [link-to-screenshot.png]
Visit the live demo: [YOUR_LIVE_LINK]

License / Credits

All content and code are created by M. Glarman.
Images taken by M. Glarman