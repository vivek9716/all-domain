
import axios from 'axios';
import React from 'react';
import ReactTable from './Table';
import { Link } from 'react-router-dom';

class Comments extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        comments: [],
        page: 0,
        columns: [
          {
            Header: '#ID',  
            accessor: 'id'  
          },
          {
            Header: 'Name',  
            accessor: 'name'  
          },
          {
            Header: 'Email',  
            accessor: 'email'  
          },
          {
            Header: 'Comment',  
            accessor: 'body'  
          }
        ],
        isDataloaded: false,
        hideNext: false
      };
    }

    componentDidMount() {
      this.getComments();
    }

    getComments = () => {
      const { page } = this.state;
      let url = `http://127.0.0.1:5000/comments`;
      if (page > 0) {
        url += `?page=${page}`;
      }
      axios.get(url).then(res => {
        const { data: { comments = [], status = 'error' } = {}} = res;
        if (status === 'success' && comments.length > 0) {
          this.setState({comments, isDataloaded: true, hideNext: false});
        } else {
          this.setState({ hideNext: true, isDataloaded: true, page: page - 1});
        }
      }).catch(e => {
        console.log("some error occured.")
      });
    }

    pageUpdate = (page) => {
      if (page >= 0) {
        this.setState({page}, () => {
          this.getComments();
        });
      }
    }

    render() {
      const { comments, columns, isDataloaded, page, hideNext } = this.state;
      return <div>
        <Link to="/" className="link">Home</Link>
        <button className="refresh" onClick = {() => {this.pageUpdate(0)}}>Refersh</button>
        {isDataloaded ? <ReactTable
          data={comments}
          columns={columns}
          page={page}
          pageUpdate= {this.pageUpdate}
          hideNext={hideNext}
        /> : 'loading data...'}
      </div>;
    }
}
  
export default Comments;