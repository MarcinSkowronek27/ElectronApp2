import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 1200,
    timer: null,
  };


  render() {

    const { status, time } = this.state;

    const formatTime = (time) => {
      let minutes = Math.floor(time / (60));
      let seconds = (time % 60);
      // console.log('minutes:', minutes, 'seconds:', seconds);
      return (((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds));
    };

    // formatTime(time);
    const step = () => {
      let newTime = this.state.time - 1;
      this.setState({
        time: newTime,
      });
      if (newTime === 0 && this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        });
      }
      else if (newTime === 0 && this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: 1200,
        });
      }
    };

    const startTimer = () => {
      this.setState({
        status: 'work',
        timer: setInterval(step, 1000),
      })
    };

    const stopTimer = () => {
      this.setState({
        status: 'off',
        time: 1200,
      }),
        clearInterval(this.state.timer);
    };

    const closeApp = () => {
      window.close();
    };

    // if (this.state.status === 'off') {
    // };

    return (

      <div>
        <h1>Protect your eyes</h1>
        {
          (status === 'off') && <div className="paragrafs">
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{formatTime(time)}</div>}
        {
          (status === 'off') && <button className="btn" onClick={event => {
            event.preventDefault();
            return startTimer();
          }}>Start</button>
        }
        {(status !== 'off') && <button className="btn" onClick={event => {
          event.preventDefault();
          return stopTimer();
        }}>Stop</button>}
        <button className="btn btn-close" onClick={event => {
          event.preventDefault();
          return closeApp();
        }}>X</button>
      </div >
    )
  }
};

render(<App />, document.querySelector('#app'));
