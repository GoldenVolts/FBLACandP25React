// Database handler using localStorage
class Database {
    constructor() {
      this.transactionsKey = 'financeTransactions';
      this.recurringKey = 'financeRecurring';
    }

    // Transations saved to local storage using through JSON conversion
    // Converts given transaction object to a JSON string and stores it on user's localStorage
    saveTransactions(transactions) {
      localStorage.setItem(this.transactionsKey, JSON.stringify(transactions));
    }
    // Retrieves transactions from localStorage through JSON conversion by parsing. 
    // Returns the parsed tranaction object to be displayed
    // If no transactions found, returns an empty array
    getTransactions() {
      return JSON.parse(localStorage.getItem(this.transactionsKey)) || [];
    }
  
    // Recurring Transactions
    saveRecurringTransactions(transactions) {
      localStorage.setItem(this.recurringKey, JSON.stringify(transactions));
    }
  
    getRecurringTransactions() {
      return JSON.parse(localStorage.getItem(this.recurringKey)) || [];
    }
  
    // CRUD Operations
    addTransaction(transaction) {
      const transactions = this.getTransactions();
      transactions.push(transaction);
      this.saveTransactions(transactions);
    }
  
    deleteTransaction(id) {
      const transactions = this.getTransactions().filter(t => t.id !== id);
      this.saveTransactions(transactions);
    }
  
    updateTransaction(updatedTransaction) {
      const transactions = this.getTransactions().map(t => 
        t.id === updatedTransaction.id ? updatedTransaction : t
      );
      this.saveTransactions(transactions);
    }
  }
  
  // Transaction Class
  class Transaction {
    constructor(type, amount, category, date, recurring = null) {
      this.id = Date.now();
      this.type = type;
      this.amount = parseFloat(amount);
      this.category = category;
      this.date = date || new Date().toISOString().split('T')[0];
      this.recurring = recurring;
    }
  }
  
  // Initialize and expose
  const financeDB = new Database();