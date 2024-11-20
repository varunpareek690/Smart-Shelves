# Smart Shelves

Smart Shelves is an IoT-based solution designed to revolutionize inventory management in grocery stores and retail environments. By integrating smart sensors, machine learning, and blockchain, the project helps store owners, shopkeepers, and customers make smarter decisions while saving time and effort. With real-time stock updates, predictive analytics, and enhanced transparency, Smart Shelves bridges the gap between manual stock tracking and cutting-edge automation.

# 🔧 How It Works
1. Sensors Monitor Shelves:

    * Load cells measure the weight of products.
    * Ultrasonic sensors track the available space.
    * IR sensors detect product removal events.
2. Data Transmission:

    * The sensors send real-time data to the backend via NodeMCU.
3. Data Processing:

    * The backend processes sensor data to update stock levels and identify trends.
    * Machine Learning algorithms analyze data to classify products and forecast demand.
3. Customer Interaction:

    * Customers check stock availability through a user-friendly app.

# 🎯 Getting Started
## Hardware Setup:
  * Connect the load cells, ultrasonic sensors, and IR sensors to the NodeMCU module.
  * Power the module using a 5V power supply.
## Backend Setup:
  * Clone the repository.
  ```bash
  git clone https://github.com/varunpareek690/Smart-Shelves.git
  ```
Set up the database (MongoDB)
  * Go to `back-end` folder
  ```bash
  cd back-end
  ```

  * Run the server
  ```bash
  npx nodemon index.js
  ```
## Frontend Setup:
  * Install the required dependencies for the web/mobile app.
  ```bash
  cd front-end
  npm install
  ```
  * Run the application
  ```bash
  npm run start
  ```

Collaborated By:
* Varun Pareek
* Nitin Kumar Singh (aka Coder)
* Shreyansh Goyal
