import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class ArtistTable extends Component {
  state = {
    posts: [],
    isLoading: true,
    error: null,
  };

  getArtistsInfo() {
    axios('http://localhost:9080/artists')
      .then((response) => {
        const artists = response.data;

        const posts = [];
        for (const artist of artists) {
          const { albums, ...rest } = artist;
          for (const album of albums) {
            posts.push({ ...rest, ...album });
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
    this.getArtistsInfo();
  }

  render() {
    const { isLoading, posts } = this.state;
    const columns = [
      {
        Header: 'Artist Info',
        columns: [
          {
            Header: 'Artist ID',
            accessor: 'id',
          },
          {
            Header: 'Artist Name',
            accessor: 'name',
          },
          {
            Header: 'Genres',
            accessor: 'genres',
          },
        ],
      },
      {
        Header: 'Albums',
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Number of Tracks',
            accessor: 'ntracks',
          },
        ],
      },
    ];
    return (
      <div>
        <h2>Artist Web Service</h2>
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

export default ArtistTable;
