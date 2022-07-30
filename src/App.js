import React from "react";
import "./App.css";
import $ from "jquery";
const Quotes = require("./Quotes.json");
const Colors = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];
const convertHexToRGBA = (hexCode, opacity = 1) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "thank you for trying My first react App!",
      author: "Xlector",
      color: "#000",
    };
    this.GenerateQuote = this.GenerateQuote.bind(this);
    this.updatecolors = this.updatecolors.bind(this);
    this.updatecolors();
  }
  updatecolors() {
    $("#root").css("background-color", this.state.color);
    $(".btn").css({
      "background-color": this.state.color,
      "border-color": this.state.color,
      "box-shadow": "0 0 0 0.25rem " + convertHexToRGBA(this.state.color, 0.5),
    });
    $(".social, .bi-quote").css({
      color: this.state.color,
      "border-color": this.state.color,
    });
  }
  GenerateQuote() {
    const quote = Quotes[Math.floor(Math.random() * Quotes.length)];
    this.setState({
      quote: quote.quote,
      author: quote.author,
      color: Colors[Math.floor(Math.random() * Colors.length)],
    });
    this.updatecolors();
  }
  render() {
    return (
      <div className=" wrapper card text-center " id="quote-box">
        <div className="card-body">
          <div className="row ">
            <p className="card-text h1 " id="text">
              <i class="bi bi-quote"></i>
              {this.state.quote}
            </p>
          </div>
          <div className="row float-end d-block p-3">
            <i className="h4" id="author">
              <sup>-&nbsp;{this.state.author}</sup>
            </i>
          </div>
        </div>
        <div className="rower p-2">
          <a
            target="_blank"
            id="tweet-quote"
            className="d-inline"
            href={
              "http://twitter.com/intent/tweet?text=" +
              this.state.quote +
              "&hashtags=" +
              this.state.author.split(" ").join("")
            }
          >
            <div className="social py-1 rounded">
              <i className="bi bi-twitter"></i>
            </div>
          </a>

          <button
            onClick={this.GenerateQuote}
            className="btn btn-primary "
            id="new-quote"
          >
            New Quote
          </button>
        </div>
      </div>
    );
  }
}
