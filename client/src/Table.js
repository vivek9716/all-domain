
import React from 'react';

class Table extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
                <div>
                    {
                        this.pagination()
                    }
                <table>
                    <tbody>
                    {
                        this.coloums()
                    }
                    {
                        this.rows()
                    }
                    </tbody>
                </table>
                </div>
        )
    }

    rows = () => {
        let rows = [];
        const { data, columns } = this.props;
        for (var i = 0; i < data.length; i++){
          let rowID = `row${i}`;
          let cell = []
          for (var idx = 0; idx < columns.length; idx++){
            let cellID = `cell${i}-${idx}`;
            cell.push(<td key={cellID} id={cellID}>{data[i][columns[idx].accessor]}</td>)
          }
          rows.push(<tr key={i} id={rowID}>{cell}</tr>)
        }
        
        return rows;
    }

    coloums = () => {
        let coloums = [];
        const { columns } = this.props;
        let cell = [];
        for (var idx = 0; idx < columns.length; idx++){
            let cellID = `header-cell-${idx}`;
            cell.push(<td key={cellID} id={cellID}>{columns[idx].Header}</td>)
        }
        coloums.push(<tr key="head">{cell}</tr>)
        return coloums;
    }

    pagination = () => {
        const { page, hideNext } = this.props;
        return (<div className="p10">
            {
                page > 0 ? <button onClick = {() => {this.props.pageUpdate(page-1)}} className="previous">Previous</button> : null
            }
            {
                hideNext ? null : 
            <button className="next" onClick = {() => {this.props.pageUpdate(page+1)}}>Next</button>
    }
        </div>)
        
    }


}
  
export default Table;