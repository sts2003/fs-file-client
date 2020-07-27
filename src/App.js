import React from "react";
import axios from "axios";
import Memo from "./components/Memo";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memoData: null,
      isDialogOpen: false,

      inputTitle: "",
      inputDesc: "",
    };
  }

  componentDidMount = async () => {
    const data1 = "하이";
    const data2 = "바이";

    const inputData = {
      data1: data1,
      data2: data2,
    };

    await axios
      .post(
        "/api/test",
        {
          params: { inputData },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) =>
        this.setState({
          memoData: response.data,
        })
      );
  };
  render() {
    const { memoData, isDialogOpen, inputTitle, inputDesc } = this.state;
    return (
      <div>
        <NoteAddIcon onClick={this._isDialogOpenToggle} />
        {memoData === null
          ? "Loading..."
          : memoData.map((memo) => {
              return <Memo key={memo.refKey} {...memo} />;
            })}
        {/*Dialog Area*/}
        <Dialog
          onClose={this._isDialogOpenToggle}
          aria-labelledby="customized-dialog-title"
          open={isDialogOpen}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={this._isDialogOpenToggle}
          >
            Register Memo
          </DialogTitle>
          <DialogContent>
            <div>
              <div>제목</div>
              <input
                type="text"
                name="inputTitle"
                value={inputTitle}
                onChange={this._valueChangeHandler}
              />
            </div>

            <div>
              <div>내용</div>
              <input
                type="text"
                name="inputDesc"
                value={inputDesc}
                onChange={this._valueChangeHandler}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this._memoUploadHandler} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  _memoUploadHandler = async () => {
    const { inputTitle, inputDesc } = this.state;

    //전처리
    const inputData = {
      inputTitle,
      inputDesc,
    };
    //로직
    await axios
      .post("/api/memoUploadHandler", { params: { inputData } })
      .then((response) => {
        if (response.data === 1) {
          this._isDialogOpenToggle();
          this.componentDidMount();
        } else {
          alert("야 너 실패함 ㅋ");
        }
      });
    //후처리
  };

  _valueChangeHandler = (event) => {
    let nextState = {};

    nextState[event.target.name] = event.target.value;

    this.setState(nextState);
  };

  _isDialogOpenToggle = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
    });
  };
}

export default App;
