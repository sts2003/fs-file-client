import React from "react";
import axios from "axios";

class App extends React.Component {
  componentDidMount = async () => {
    const data1 = "하이";
    const data2 = "바이";

    const inputData = {
      data1: data1,
      data2: data2,
    };

    await axios.post(
      "/api/test",
      {
        params: { inputData },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
  render() {
    return (
      <div>
        <div>Hello React</div>
      </div>
    );
  }
}

export default App;
