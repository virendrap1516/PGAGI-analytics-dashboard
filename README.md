# PGAGI Comprehensive Analytics Dashboard 👨🏻‍💻

## Project Overview 📑

📜 This repository contains the "Comprehensive Analytics Dashboard," developed as part of the PGAGI Front-End Developer Internship assignment. The dashboard offers an interactive, user-friendly interface, displaying data fetched from multiple APIs. It features advanced animations, responsive design, and a focus on performance optimization and state management.👨‍💻


## Features🛠️
- **Weather Section**: Displays current weather and 7-day forecasts using the OpenWeatherMap API.🌦️
- **News Section**: Fetches and categorizes the latest news using the NewsAPI.📣
- **Stocks Section**: Provides real-time stock market data with detailed analysis using the Alpha Vantage API.📈
- **TMDB Section**: Displays trending movies, ratings, and user reviews using the TMDB API.🍿🎥✮⋆˙
- **GitHub Section**: Fetches and displays repository statistics, commit history, and contributor details using the GitHub API.👾
- **Spotify Section**: Presents user listening statistics, top tracks, and playlists using the Spotify API.🟢ᯤ
- **Advanced Animations**: Smooth transitions and engaging visuals with Framer Motion and CSS.🎞️
- **Dark Mode**: Easily toggle between light and dark themes.🌑☀︎
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop screens.📱🖥️
- **Drag and Drop** : Ability to drag and drop between widgets.⚙️

## Technologies Used ⚙️

- **Framework**: Next.js  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **State Management**: Redux Toolkit  
- **Data Visualization**: Recharts 
- **Animations**: Lottie, CSS transitions, Framer Motion 

## Project Structure

```bash

Organize the project with a scalable folder structure:
components/ – Reusable UI components.
App/ – Next.js pages with dynamic routing.
styles/ – Global styles and Tailwind configurations.
store/ – State management setup (e.g., Redux slices).
utils/ – Utility functions and helpers.
Images/ – Github documentation.
public/ – Static assets.
 ```


## Installation Instructions

1. Navigate to the project directory:
   ```bash
   cd PGAGI_Software_Intern
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project

- **Development Server**:
  ```bash
  npm run dev
  ```
  Access the application at `http://localhost:3000`.

- **Production Build**:
  ```bash
  npm run build
  npm start
  ```

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
NEXT_PUBLIC_NEWSAPI_API_KEY=
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=
NEXT_PUBLIC_FINNHUB_API_KEY=
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=
NEXT_PUBLIC_POLYGON_API_KEY=
NEXT_PUBLIC_YAHOO_API_KEY=
NEXT_PUBLIC_TMDB_API_KEY=
```


## Deployment

This project is deployed on [Vercel](https://vercel.com). 

Deployment link - https://pgagi-analytics-dashboard-iota.vercel.app/.

## Additional 

- **Widget Customization**: Drag-and-drop widgets for personalized layouts.
- **Real-Time Updates**: Live stock prices, breaking news, and weather updates via WebSockets.

## Screenshots
![Home Section](https://github.com/virendrap1516/PGAGI-analytics-dashboard/blob/master/images/Home.png)

### News Section  
![News Section](https://github.com/virendrap1516/PGAGI-analytics-dashboard/blob/master/images/News.png)  

### GitHub Section  
![GitHub Section](https://github.com/virendrap1516/PGAGI-analytics-dashboard/blob/master/images/Github.png)  

### TMDB Section  
![TMDB Section](https://github.com/virendrap1516/PGAGI-analytics-dashboard/blob/master/images/Movies.png)  

### Stocks Section  
![Stocks Section](https://github.com/virendrap1516/PGAGI-analytics-dashboard/blob/master/images/Stocks.png)  

### Weather Section
![Weather Section](https://github.com/virendrap1516/PGAGI-analytics-dashboard/blob/master/images/Weather.png)  

### Spotify Section  
![Spotify Section](https://github.com/virendrap1516/PGAGI-analytics-dashboard/blob/master/images/Spotify.png)  

---
