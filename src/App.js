import Past24Data from "./Data/Past24Data";
import Last7DaysData from "./Data/Last7DaysData";
import LastMonthData from "./Data/LastMonth";
import TestData from "./Data/test";
import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="child-container-1">
        <TestData />
      </div>
      <div className="child-container-2">
        <Past24Data />
      </div>
      <div className="child-container-3">
        <Last7DaysData />
      </div>
      <div className="child-container-4">
        <LastMonthData />
      </div>
    </div>
  );
}

export default App;
