import React from "react";

const API_URL = process.env.REACT_APP_API_URL;

class CreateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      description: "",
      quantity: "",
      ordertime: "",
      arrive: "",
      locations: [""],
      Active: false,
    };
  }
  addLocation = () => {
    const newLocations = this.state.locations.map((x) => x);
    newLocations.push("");
    this.setState({ locations: newLocations });
  };
  removeLocation = (index) => {
    const newLocations = this.state.locations.map(x => x);
    newLocations.splice(index, 1);
    this.setState({ locations: newLocations });
  };
  handleLocationChange = (value, index) => {
    const newLocations = this.state.locations.map((x) => x);
    newLocations[index] = value;
    this.setState({ locations: newLocations });
  };
  handleChange = ({ target }) => {
    let value = target.type === "checkbox" ? target.checked : target.value;
    value = target.type === "number" ? parseInt(value) : value;
    this.setState({ [target.name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_URL}/shop-exam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(this.props.refresh)
      .then(() =>
        this.setState({
      name: "",
      price: "",
      description: "",
      quantity: "",
      ordertime: "",
      arrive: "",
      locations: [""],
      In_stock: false,
        })
      );
  };
  render() {
    const displayLocations = this.state.locations.map((location, index) => {
      return (
        <div key={index}>
          <select
            value={this.state.locations[index]}
            onChange={({target}) =>
              this.handleLocationChange(target.value, index)
            }
          >
            <option value="">Store's in stock</option>
            <option value="calgary">Calgary</option>
            <option value="victoria">Victoria</option>
            <option value="ontario">Ontario</option>
            <option value="quebec">Quebec</option>
            <option value="richmond">Richmond</option>
            <option value="vancouver">Vancouver</option>
          </select>
          <input
            className="del-btn"
            type="button"
            value="X"
            onClick={() => this.removeLocation(index)}
          />
        </div>
      );
    });
    return (
      <form id="create" onSubmit={this.handleSubmit}>
      {/* title */}
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Item Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br></br>
        {/* Item price */}
        <input
          name="price"
          id="name"
          type="decimal"
          placeholder="Price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        {/* Item description */}
        <br></br>

        <input
          name="description"
          id="name"
          type="text"
          placeholder="Item Description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        {/* Item quantity */}
        <div>

          <input
            name="quantity"
            id="name"
            type="number"
            placeholder="Quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
        </div>
        {/* Date ordered */}
        <div>
          <label htmlFor="order">Order Date</label>
          <br></br>
          <input
          id="name"
            type="date"
            placeholder="Order Date"
            value={this.state.order}
            onChange={this.handleChange}
          />
        </div>

        {/* ETA date */}
        <div>
          <label> Arrive By </label>
          <br></br>
          <input
            name="arrive"
            id="name"
            type="date"
            value={this.state.arrive}
            onChange={this.handleChange}
          />
        </div>

        {displayLocations}
        <input type="button" value="Add Location" onClick={this.addLocation} />
        <div>
          <label htmlFor="stock">Out of stock</label>
          <input
            name="name"
            type="checkbox"
            checked={this.state.stock}
            onChange={this.handleChange}
          />
        </div>
        <button> Add Product </button>
      </form>
    );
  }
}
// don't touch this page

export default CreateItem;
