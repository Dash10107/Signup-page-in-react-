Stocks Watchlist Application: https://watchlist-frontend-taupe.vercel.app/
Video Walkthrough of The APP : [screen-capture.webm](https://github.com/Dash10107/Watchlist-Frontend/assets/97282628/4b552892-8433-4326-ac83-27dce97118bd)

this first lets you sign or log into the application 

Then it takes you to the dashboard where you can add, delete, and manage your watchlist 

As soon as you select any stock on the list, it will show you the intraday prices for the stock by using the API - www.alphavantage.co

You can see stock prices for the last 5,15,30 or 60 mins in intraday. 

This is built in React and MUI. It uses react-router-dom for Navigation 

It uses tokens to differentiate users.

The API for signup, login, and managing the watchlist is a separate Nodejs API along with the MongoDB database. 

The API Code is in this repository => https://github.com/Dash10107/Watchlist-Backend/

It also fulfils these requirements as well 

The platform should allow users to create and manage their watchlists of stock symbols
(e.g., MSFT, GOOG).
• The platform should display a dashboard with the latest stock values of the symbols on the
user’s watchlist.
• The platform should be able to handle multiple users concurrently, each having different
watchlists.
• The platform should use a DB of your choice (e.g., MySQL/PostgreSQL/MongoDB) to store the
user and watchlist data.
• The platform should use a secure and simple authentication mechanism for the users.
• The platform should use https://www.alphavantage.co as an API to pull stock information. The
dashboard should show the latest stock price as returned by the TIME_SERIES_INTRADAY
endpoint





