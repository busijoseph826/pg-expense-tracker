
# PG Hostel Expense Tracker

## Overview
The **PG Hostel Expense Tracker** is a web application designed to help individuals living in a paying guest (PG) hostel manage their daily expenses. The application allows users to track their expenditures, categorize them, and compare their spending against a set budget. Users can also visualize their expenses using a pie chart and export their data as a CSV file.

## Features
- **Add Expense:** Users can add new expenses by specifying the date, category, amount, and description.
- **Edit/Delete Expense:** Existing expenses can be edited or deleted.
- **Expense Summary:** The application calculates the total expenses and compares them against the user's budget, indicating whether they are over or under budget.
- **Expense Visualization:** A pie chart displays a breakdown of expenses by category.
- **Export Data:** Users can export their expenses to a CSV file.
- **Responsive Design:** The layout is optimized for both desktop and mobile devices.

## Technologies Used
- **React:** Frontend framework for building the user interface.
- **Chart.js:** Library for creating the pie chart.
- **React Icons:** Provides icons used in the application.
- **Tailwind CSS:** Utility-first CSS framework for styling the application.

## Installation and Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/busijoseph826/pg-expense-tracker.git
   cd pg-hostel-expense-tracker
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```
   The application will start on `http://localhost:3000`.

## Usage
1. **Set Your Budget:** Start by setting a budget that you want to stick to.
2. **Add Expenses:** Enter your expenses by selecting the date, category, amount, and adding a description if necessary.
3. **View and Manage Expenses:** You can view all your expenses in a list, edit or delete them if needed.
4. **View Summary:** See the total expenses and how they compare to your budget. The application will indicate if you are over or under budget.
5. **Visualize Data:** The pie chart provides a visual breakdown of your spending by category.
6. **Export Data:** Export your expenses to a CSV file for external analysis or record-keeping.

## Project Structure
```plaintext
├── public
│   └── index.html
├── src
│   ├── components
│   │   └── ExpenseTracker.js   # Main component of the application
│   ├── App.js                # Entry point of the React app
│   └── App.css                 # Custom styles
├── README.md                   # Project documentation
└── package.json                # Project dependencies and scripts
```

## Future Enhancements
- **Expense Filtering:** Add functionality to filter expenses by date range or category.
- **Income Tracking:** Include features to track income and provide a net balance view.
- **Notifications:** Notify users when they are close to exceeding their budget.
- **Data Persistence:** Store user data using local storage or integrate with a backend for persistent storage.

## Contributing
Contributions are welcome! If you have any suggestions or improvements, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- **React Icons:** For the icons used in the application.
- **Chart.js:** For the easy-to-use charting library.

---