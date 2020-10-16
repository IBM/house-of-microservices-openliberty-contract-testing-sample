import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Cookies from 'universal-cookie';
import faker from 'faker';
import BodyPart from './BodyPart';
import House from './House';

const cookies = new Cookies();
class ResidentTable extends Component {
  state = {
    posts: [],
    isLoading: true,
    error: null,
    residentName: faker.name.findName(),
  };

  getResidentInfo() {
    this.counter++;
    this.axiosCancelSource = axios.CancelToken.source();

    const opts = {
      headers: { Accept: 'application/json' },
      withCredentials: true,
    };

    // We rely on axios.defaults.baseURL for the base url
    axios
      .get('/resident', opts)
      .then((response) => {
        this.existingResident = true;
        const resident = response.data;
        const room = resident.room;

        // Hackily, filter out the room so it doesn't mess up the body display
        delete resident.room;

        const posts = Object.entries(resident)
          .map((b) => {
            return {
              name: b[0],
              state: b[1].state,
              innards: JSON.stringify(b[1]),
            };
          })
          .flat();
        // Poll our data; SSE or websockets would be cleaner, but also more complicated!
        // To avoid being super-hungry, only poll for 10s after load
        if (this.counter < 10) {
          this.timer = setTimeout(() => this.getResidentInfo(), 1000);
        }

        this.setState({
          room,
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
    this.counter = 0;

    cookies.set('resident-name', this.state.residentName);

    this.getResidentInfo();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
    if (this.axiosCancelSource) {
      this.axiosCancelSource.cancel();
      this.axiosCancelSource = null;
    }
  }

  render() {
    const { isLoading, posts, room, residentName } = this.state;
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
            Header: 'Innards',
            accessor: 'innards',
          },
        ],
      },
    ];

    return (
      <div className="page">
        <div className="graphics">
          <House room={room} />

          <div className="resident">
            {!isLoading ? (
              <div className="body">
                {posts.map((part) => (
                  <BodyPart
                    key={part.name}
                    name={part.name}
                    state={part.state}
                  />
                ))}
              </div>
            ) : (
              <div />
            )}
            <div className="residentLabel">{residentName}</div>
          </div>
          {!isLoading ? (
            <ReactTable
              data={posts}
              columns={columns}
              defaultPageSize={6}
              pageSizeOptions={[4, 6, 8, 12]}
            />
          ) : (
            <p>Loading .....</p>
          )}
        </div>
      </div>
    );
  }
}

export default ResidentTable;
