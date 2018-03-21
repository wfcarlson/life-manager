import React, { Component } from 'react';
import Pagination from './Pagination.js';


export default class DateNavigation extends Component {

    constructor(props) {
      super(props);
      this.state = {
      
      }
    }

    renderMonths(){
      var months = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
      ]

      return months.map((month) => {
        return (
          <span style={{display:"inline-block", width:"40px", height:"30px", border:"1px solid #000"}}>
            {month}
          </span>
        );
      });
    }

    render() {
      var url = "http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google"
      return (
        <div>
        <div style={{width:"504px", height:"30px", border:"1px solid rgb(0, 188, 212)"}}>
          {this.renderMonths()}
        </div>
        <Pagination />
        </div>
      );
    }
}