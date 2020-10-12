// tag::react-library[]
import React, { Component } from 'react';
// end::react-library[]
// tag::axios-library[]
import axios from 'axios';
// end::axios-library[]
// tag::react-table[]
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
// end::react-table[]

// tag::class[]
class ArtistTable extends Component {
// end::class[]
  // tag::state-object[]
  state = {
    posts: [],
    isLoading: true,
    error: null,
  };
  // end::state-object[]

  // tag::get-posts[]
  getArtistsInfo() {
    // tag::axios[]
    axios('http://localhost:9080/artists')
    // end::axios[]
      // tag::then-method[]
      .then(response => {
        // tag::response-data[]
        const artists = response.data;
        // end::response-data[]
        // tag::convert-data[]
        const posts = [];
        for (const artist of artists) {
          // tag::spread-one[]
          const { albums, ...rest } = artist;
          // end::spread-one[]
          for (const album of albums) {
            // tag::spread-two[]
            posts.push({ ...rest, ...album });
            // end::spread-two[]
          }
        };
        // end::convert-data[]
        // tag::set-state[]
        this.setState({
          // tag::data[]
          posts,
          // end::data[]
          isLoading: false
        });
        // end::set-state[]
      // end::then-method[]
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
  // end::get-posts[]

  // tag::mount-posts[]
  componentDidMount() {
    this.getArtistsInfo();
  }
  // end::mount-posts[]
  // tag::render-posts[]
  render() {
    const { isLoading, posts } = this.state;
    // tag::table-info[]
    const columns = [{
      Header: 'Artist Info',
      columns: [
        {
          Header: 'Artist ID',
          accessor: 'id'
        },
        {
          Header: 'Artist Name',
          accessor: 'name'
        },
        {
          Header: 'Genres',
          accessor: 'genres',
        }
      ]
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
        }
      ]
    }
  ]
  // end::table-info[]

  // tag::return-table[]
  return (
    <div>
      <h2>Artist Web Service</h2>
      {!isLoading ? (
        // tag::table[]
        <ReactTable
          // tag::prop-posts[]
          data={posts}
          // end::prop-posts[]
          // tag::prop-columns[]
          columns={columns}
          // end::prop-columns[]
          defaultPageSize={4}
          pageSizeOptions={[4, 5, 6]}
        />) : (
        // end::table[]
          <p>Loading .....</p>
        )}
    </div>
    );
    // end::return-table[]
  }
  // end::render-posts[]
}
// end::element[]

// tag::export-artisttable[]
export default ArtistTable;
// end::export-artisttable[]