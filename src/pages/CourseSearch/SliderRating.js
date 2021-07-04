import React, { Component } from "react";

export default class SliderRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: ["#D1D5DB", "#D1D5DB", "#D1D5DB", "#D1D5DB", "#D1D5DB"],
      rating: 0,
    };

    this.updateRating = this.updateRating.bind(this);
  }

  updateRating(idx) {
    let colors = ["#F87171", "#D97706", "#FBBF24", "#059669", "#34D399"];
    if (this.props.reverse) colors = colors.reverse();

    let selected_color = colors[idx];
    let prev_colors = [...this.state.colors];

    for (let i = 0; i < prev_colors.length; i++) {
      if (i <= idx) prev_colors[i] = selected_color;
      else prev_colors[i] = "#D1D5DB";
    }

    this.setState({
      rating: idx + 1,
      colors: prev_colors,
    });

    this.props.updateRating(this.props.number, idx + 1);
  }

  render() {
    return (
      <div className="flex items-center justify-end my-4">
        <div className="flex items-center justify-start w-1/2">
          <span className="text-gray-600 mr-1 font-bold">
            {this.props.number})
          </span>
          <span className="capitalize">{this.props.text}</span>
        </div>
        {/* SLIDER */}
        <div className="w-1/2 flex items-center">
          <span className="font-bold text-xl mr-3">{this.state.rating}</span>
          <div
            style={{ backgroundColor: this.state.colors[0] }}
            className="h-6 w-16 border-r border-white rounded-l-full"
            onMouseEnter={() => this.updateRating(0)}
          ></div>
          <div
            style={{ backgroundColor: this.state.colors[1] }}
            className="h-6 w-16 border-r border-white"
            onMouseEnter={() => this.updateRating(1)}
          ></div>
          <div
            style={{ backgroundColor: this.state.colors[2] }}
            className="h-6 w-16 border-r border-white"
            onMouseEnter={() => this.updateRating(2)}
          ></div>
          <div
            style={{ backgroundColor: this.state.colors[3] }}
            className="h-6 w-16 border-r border-white"
            onMouseEnter={() => this.updateRating(3)}
          ></div>
          <div
            style={{ backgroundColor: this.state.colors[4] }}
            className="h-6 w-16 rounded-r-full"
            onMouseEnter={() => this.updateRating(4)}
          ></div>
        </div>
      </div>
    );
  }
}
