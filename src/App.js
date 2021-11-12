import Transaction from "../src/container/Transaction/Transaction";
import TransactionDetail from "../src/container/Transaction/TransactionDetail/TransactionDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Transaction} />
      <Route path="/detail/:trxId" exact component={TransactionDetail} />
    </Router>
  );
}
