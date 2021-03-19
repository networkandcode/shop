import React, { Component } from "react";
import  Branch from "./branch";
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

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
      <div>
          <Branch />
          <AddCircleOutlineSharpIcon onClick={() => this.hideComponent("showBranch2")}></AddCircleOutlineSharpIcon>
        {showBranch2 && <Branch />}
        <AddCircleOutlineSharpIcon onClick={() => this.hideComponent("showBranch3")}></AddCircleOutlineSharpIcon>
        {showBranch3 && <Branch />}
        
        <AddCircleOutlineSharpIcon onClick={() => this.hideComponent("showBranch4")}></AddCircleOutlineSharpIcon>
        {showBranch4 && <Branch />}
        <AddCircleOutlineSharpIcon onClick={() => this.hideComponent("showBranch5")}></AddCircleOutlineSharpIcon>
        
        {showBranch5 && <Branch />}
        <div>        
        </div>
      </div>
    );
  }
}

export default Addbranch;
