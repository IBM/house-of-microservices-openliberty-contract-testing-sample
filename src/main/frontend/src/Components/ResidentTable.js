import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import BodyPart from './BodyPart';

class ResidentTable extends Component {
  state = {
    posts: [],
    isLoading: true,
    error: null,
  };

  getResidentInfo() {
    this.axiosCancelSource = axios.CancelToken.source();

    axios('http://localhost:9080/resident', {
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        const resident = response.data;

        const posts = Object.entries(resident)
          .map((b) => {
            return { name: b[0], state: JSON.stringify(b[1]) };
          })
          .flat();

        this.setState({
          posts,
          isLoading: false,
        });
      })
      .catch((error) => {
        // Don't complain if the request has been cancelled
        if (this.axiosCancelSource) {
          console.warn(error);
        }
      });
  }

  componentDidMount() {
    this.getResidentInfo();
  }

  componentWillUnmount() {
    this.axiosCancelSource.cancel();
    this.axiosCancelSource = null;
  }

  render() {
    const { isLoading, posts } = this.state;
    const columns = [
      {
        Header: 'Body Part Info',
        columns: [
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
            accessor: 'state',
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
        {!isLoading ? (
          <div class="body">
            {posts.map((part) => (
              <BodyPart key={part.name} name={part.name} />
            ))}
          </div>
        ) : (
          <div />
        )}

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
