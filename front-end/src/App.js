import React from "react";
import MyMap from "./components/MyMap";
import Menu from "./components/Menu";

class App extends React.Component {
  render() {
 
    return (
      <div>
      <Menu />
     <MyMap />
     </div>
    );
  }
}

export default App