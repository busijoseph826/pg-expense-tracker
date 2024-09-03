import { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaEdit, FaTrash, FaFileExport, FaChartPie } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ date: '', category: '', amount: '', description: '' });
  const [totalExpense, setTotalExpense] = useState(0);
  const [budget, setBudget] = useState(0);
  const [timeFrame, setTimeFrame] = useState('weekly');
  const [chartData, setChartData] = useState(null);

  const categories = ['Food', 'Transportation', 'Rent', 'Utilities', 'Entertainment', 'Other'];

  useEffect(() => {
    calculateTotalExpense();
    generateChartData();
  }, [expenses, timeFrame]);

  const calculateTotalExpense = () => {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setTotalExpense(total);
  };

  const generateChartData = () => {
    const categoryTotals = categories.reduce((totals, category) => {
      totals[category] = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      return totals;
    }, {});

    setChartData({
      labels: categories,
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = () => {
    if (newExpense.date && newExpense.category && newExpense.amount) {
      setExpenses(prev => [...prev, { ...newExpense, id: Date.now() }]);
      setNewExpense({ date: '', category: '', amount: '', description: '' });
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const handleEditExpense = (id) => {
    const expenseToEdit = expenses.find(expense => expense.id === id);
    setNewExpense(expenseToEdit);
    handleDeleteExpense(id);
  };

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Date,Category,Amount,Description\n' +
      expenses.map(e => `${e.date},${e.category},${e.amount},${e.description}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">PG Hostel Expense Tracker</h1>
      
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Set Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="Enter your budget"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block mb-2 font-semibold">Date:</label>
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Category:</label>
          <select
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Amount:</label>
          <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Description:</label>
          <input
            type="text"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Enter description"
          />
        </div>
      </div>

      <button
        onClick={handleAddExpense}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 mb-6"
      >
        <FaPlus className="inline mr-2" /> Add Expense
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Expense List</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Description</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id} className="border-b">
                  <td className="p-2">{expense.date}</td>
                  <td className="p-2">{expense.category}</td>
                  <td className="p-2">${expense.amount}</td>
                  <td className="p-2">{expense.description}</td>
                  <td className="p-2">
                    <button onClick={() => handleEditExpense(expense.id)} className="text-blue-500 mr-2">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteExpense(expense.id)} className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Total Expenses: ${totalExpense.toFixed(2)}</p>
            <p className="font-semibold">Budget: ${budget.toFixed(2)}</p>
            <p className={`font-semibold ${totalExpense > budget ? 'text-red-500' : 'text-green-500'}`}>
              {totalExpense > budget ? 'Over budget' : 'Under budget'} by ${Math.abs(budget - totalExpense).toFixed(2)}
            </p>
          </div>
          <div>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button onClick={handleExport} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">
              <FaFileExport className="inline mr-2" /> Export to CSV
            </button>
          </div>
        </div>
      </div>

      {chartData && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Expense Breakdown</h2>
          <div className="w-full h-64">
            <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;