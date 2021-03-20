import Container from '@material-ui/core/Container';
import React, { Component } from "react";
import  Branch from "./branch";
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';
import Button from '@material-ui/core/Button';

class Addbranch extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showBranch2: false,
      showBranch3: false,
      showBranch4: false,
      showBranch5: false
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {
      case "showBranch2":
        this.setState({ showBranch2: !this.state.showBranch2 });
        break;
      case "showBranch3":
        this.setState({ showBranch3: !this.state.showBranch3 });
        break;
      case "showBranch4":
        this.setState({ showBranch4: !this.state.showBranch4 });
        break;
        case "showBranch5":
        this.setState({ showBranch5: !this.state.showBranch5});
        break;
      default:
        null;
    }
  }

  render() {
    const { showBranch2, showBranch3, showBranch4, showBranch5 } = this.state;
    return (
     <React.Fragment> <Container maxWidth="sm">
      <div>
        <h2>Branches</h2>
        <h3>Main-Branch</h3>

          <Branch />
          <AddCircleOutlineSharpIcon onClick={() => this.hideComponent("showBranch2")}></AddCircleOutlineSharpIcon>
        {showBranch2 && <><h3>Sub-Branch1</h3> <Branch /> <AddCircleOutlineSharpIcon onClick={() => this.hideComponent("showBranch3")}></AddCircleOutlineSharpIcon></>}
        {showBranch3 && <><h3>Sub-Branch2</h3> <Branch /> <AddCircleOutlineSharpIcon onClick={() => this.hideComponent("showBranch4")}></AddCircleOutlineSharpIcon></>}
        {showBranch4 && <><h3>Sub-Branch3</h3> <Branch /> <AddCircleOutlineSharpIcon onClick={() => this.hideComponent("showBranch5")}></AddCircleOutlineSharpIcon></>}
        {showBranch5 && <><h3>Sub-Branch4</h3> <Branch /></>}
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>

        <div>        
        </div>
      </div>
      </Container>
      </React.Fragment>
    );
  }
}

export default Addbranch;
