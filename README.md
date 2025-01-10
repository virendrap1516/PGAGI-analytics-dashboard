# PGAGI Comprehensive Analytics Dashboard

## Project Overview

This repository contains the "Comprehensive Analytics Dashboard," developed as part of the PGAGI Front-End Developer Internship assignment. The dashboard offers an interactive, user-friendly interface, displaying data fetched from multiple APIs. It features advanced animations, responsive design, and a focus on performance optimization and state management.


## Features
- **Weather Section**: Displays current weather and 7-day forecasts using the OpenWeatherMap API.
- **News Section**: Fetches and categorizes the latest news using the NewsAPI.
- **Stocks Section**: Provides real-time stock market data with detailed analysis using the Alpha Vantage API.
- **TMDB Section**: Displays trending movies, ratings, and user reviews using the TMDB API.
- **GitHub Section**: Fetches and displays repository statistics, commit history, and contributor details using the GitHub API.
- **Spotify Section**: Presents user listening statistics, top tracks, and playlists using the Spotify API.
- **Advanced Animations**: Smooth transitions and engaging visuals with Framer Motion and CSS.
- **Dark Mode**: Easily toggle between light and dark themes.
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop screens.
- **Drag and Drop** : Ability to drag and drop between widgets

## Technologies Used

- **Framework**: Next.js  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **State Management**: Redux Toolkit  
- **Data Visualization**: Recharts 
- **Animations**: Lottie, CSS transitions, Framer Motion 

## Project Structure

```bash
src/
├── components/   
├── app/           
├── styles/        
├── store/        
├── utils/       
├── images/        
├── public/        
```

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/MohamedAklamaash/PGAGI_Software_Intern.git
   ```
2. Navigate to the project directory:
   ```bash
   cd PGAGI_Software_Intern
   ```
3. Install dependencies:
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
NEXT_PUBLIC_OPENCAGE_API_KEY=
NEXT_PUBLIC_NEWSAPI_API_KEY=
NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY=
NEXT_PUBLIC_TWELVE_DATA_API_KEY=
NEXT_PUBLIC_FINNHUB_API_KEY=
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=
NEXT_PUBLIC_POLYGON_API_KEY=
NEXT_PUBLIC_YAHOO_API_KEY=
NEXT_PUBLIC_TMDB_API_KEY=
```


## Deployment

This project is deployed on [Vercel](https://vercel.com). Access the live demo here: [Live Demo Link](https://pgagi-software-intern.vercel.app/).

## Additional Features

- **Widget Customization**: Drag-and-drop widgets for personalized layouts.
- **Localization**: Multi-language support using react-i18next.
- **Real-Time Updates**: Live stock prices, breaking news, and weather updates via WebSockets.

## Screenshots
![Home Section](https://github.com/MohamedAklamaash/PGAGI_Software_Intern/blob/main/images/Home.png)

### Weather Section  
![Weather Section](https://github.com/MohamedAklamaash/PGAGI_Software_Intern/blob/main/images/Weather.png)  

### News Section  
![News Section](https://github.com/MohamedAklamaash/PGAGI_Software_Intern/blob/main/images/News.png)  

### Stocks Section  
![Stocks Section](https://github.com/MohamedAklamaash/PGAGI_Software_Intern/blob/main/images/Stocks.png)  

### TMDB Section  
![TMDB Section](https://github.com/MohamedAklamaash/PGAGI_Software_Intern/blob/main/images/Movies.png)  

### GitHub Section  
![GitHub Section](https://github.com/MohamedAklamaash/PGAGI_Software_Intern/blob/main/images/Github.png)  

### Spotify Section  
![Spotify Section](https://github.com/MohamedAklamaash/PGAGI_Software_Intern/blob/main/images/Spotify.png)  

---
