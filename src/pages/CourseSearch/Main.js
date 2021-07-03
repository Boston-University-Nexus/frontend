import React, { Component } from "react";
import SearchBar from "./SearchBar";
import { checkTypedType } from "./Utils";
import axios from "axios";

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.makeRequest = this.makeRequest.bind(this);
    this.searchAction = this.searchAction.bind(this);

    this.state = {
      data_type: "",
      data: [],
      finished_loading: true,
    };
  }

  //   Makes a request to the server at url "url"
  async makeRequest(url) {
    let res = await axios.get(url);
    let data = res.data;

    if (data.length === 0) return false;
    else return data;
  }

  async searchAction(e) {
    // So we dont render info we dont have
    this.setState({ finished_loading: false });

    let result = checkTypedType(e.target.value);
    let query_terms = result[1];
    let search_for = result[0];

    let url = "http://localhost:8000/api/";

    // For every query option we have
    for (const search_item of search_for) {
      let search_url = url + search_item + "?";

      // Create the search url
      if (search_item != "professors")
        for (const query in query_terms) {
          if (query != "professor")
            search_url += query + "=" + query_terms[query] + "&";
        }
      else search_url += "professor__icontains=" + query_terms["professor"];

      console.log(search_url);

      // Make request and check if there are any results
      var valid = await this.makeRequest(search_url);
      if (valid) {
        this.setState({ data_type: search_item });
        break;
      }
    }

    if (valid && valid.length > 0) {
      this.setState({ data: valid.slice(0, 10) });
    }

    this.setState({ finished_loading: true });
  }

  render() {
    return (
      <div
        className="w-full md:w-3/4 xl:w-2/3 2xl:w-1/2 bg-white h-full shadow-2xl px-7"
        style={{ paddingTop: 72 }}
      >
        <h1 className="font-bold text-xl mt-3">
          Welcome to our Reviews & Info section
        </h1>
        <h2 className="text-gray-700 mt-3 mb-8">
          Here you can easily search for all the information relevant to Boston
          University students about classes, professors, sections, etc. Start by
          searching something in the search bar below!
        </h2>
        <SearchBar searchAction={this.searchAction} />
        {this.state.finished_loading &&
          this.state.data.map((element) => {
            let data_type = this.state.data_type;

            if (data_type === "courses") return <p>{element.title}</p>;
            else if (data_type === "sections")
              return (
                <p>
                  {element.course.title}- {element.section}
                </p>
              );
            else if (data_type === "professors") return <p>{element.name}</p>;
          })}
      </div>
    );
  }
}
