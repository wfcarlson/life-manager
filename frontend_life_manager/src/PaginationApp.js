import React from 'react';
import Pagination from './Pagination';
 
class PaginationApp extends React.Component {
    constructor() {
        super();
 
        // an example array of items to be paged
        var exampleItems = this.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });
 
        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };
 
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }
 
    range = (start, end) => {
        var ans = [];
        for (let i = start; i <= end; i++) {
            ans.push(i);
        }
        return ans;
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
 
    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>React - Pagination Example with logic like Google</h1>
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                        <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                    </div>
                </div>
                <hr />
                <div className="credits text-center">
                    <p>
                        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                    </p>
                </div>
            </div>
        );
    }
}
 
export default PaginationApp;