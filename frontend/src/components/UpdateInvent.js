import React from "react";

const API_URL = process.env.REACT_APP_API_URL;

class UpdateInvent extends React.Component {
  constructor(props) {
    super(props);
    const { item } = props;
    this.state = {
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: item.quantity,
      ordertime: item.ordertime,
      locations: item.locations,
      stock: item.stock,
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
    fetch(`${API_URL}/shop-exam/${this.props.item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(this.props.refresh)
      .then(this.props.close)
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
      <form className="update" onSubmit={this.handleSubmit}>
        {/* title */}
        <input
          name= "name" 
          type="text"
          placeholder="Item Name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        {/* Item price */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={this.state.price}
          onChange={this.handleChange}
        />
        {/* Item description */}

        <input
          name="description"
          type="text"
          placeholder="Item description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        {/* Item Quantity */}
        <div>

          <input
            name="quantity"
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
            name="order"
            type="date"
            value={this.state.order}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label> Arrive By</label>
          <br></br>
          <input
            name="arrive"
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
        <button> Update Item </button>
      </form>
    );
  }
}

export default UpdateInvent;
