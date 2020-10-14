import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class ResidentTable extends Component {
  state = {
    posts: [],
    isLoading: true,
    error: null,
  };

  getResidentInfo() {
    axios('http://localhost:9080/resident', {
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        const resident = response.data;

        const posts = [];
        for (const bodypart of resident) {
          const { state, ...rest } = bodypart;
          for (const s of state) {
            posts.push({ ...rest, ...s });
          }
        }
        this.setState({
          posts,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getResidentInfo();
  }

  render() {
    const { isLoading, posts } = this.state;
    const columns = [
      {
        Header: 'Body Part Info',
        columns: [
          {
            Header: 'Body Part ID',
            accessor: 'id',
          },
          {
            Header: 'Body Part Name',
            accessor: 'name',
          },
        ],
      },
      {
        Header: 'State',
        columns: [
          {
            Header: 'State',
            accessor: 'title',
          },
          {
            Header: 'Number of Instances',
            accessor: 'ninstances',
          },
        ],
      },
    ];

    return (
      <div>
        <h2>House Web Service</h2>
        {!isLoading ? (
          <ReactTable
            data={posts}
            columns={columns}
            defaultPageSize={4}
            pageSizeOptions={[4, 5, 6]}
          />
        ) : (
          <p>Loading .....</p>
        )}
      </div>
    );
  }
}

export default ResidentTable;
