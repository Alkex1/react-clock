import React, {Component} from 'react';
import Clock from "./Clock";

class App extends Component {
    state = { latitude: null, errorMessage: null, value: 1 };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({ latitude: position.coords.latitude });
            },
            (error) => {
                this.setState({ errorMessage: "There was an error" })
            }
        );

        setInterval(() => {
            this.setState((state, props) => {
                return {value: state.value + 1};
            });
        }, 1000);
    }

    componentDidUpdate() {
        console.log("updated");
    }

    isItWarm() {
        // if month = 10,11,12,1,2 && southern hemisphere, return true
        // if month = 3,4,5,6,7,8,9 && northern hemisphere, return true

        const {latitude} = this.state;
        const month = new Date().getMonth() + 1;

        // if (
        //     (latitude < 0 && (month < 3 || month > 9)) 
        //     || 
        //     (latitude > 0 && (month >= 3 || month <= 9)) 
        //     || 
        //     (latitude === 0)
        //     ) {
        //         return false;
        //     }

        if (latitude < 0 ) {
            if (month < 3 || month > 9) {
                return true;
            } else {
                return false;
            }
        } else {
            if (month < 3 || month > 9) {
                return false;
            } else {
                return true;
            }
        }
        
    }

    // write a getClockIcon method that uses isItWarmMethod
    // if true return sun.svg
    // if false return snowflake.svg

    getClockIcon() {
        if (this.isItWarm() === true) {
            return "sun.svg";
        } else if (this.isItWarm() === false) {
            return "snowflake.svg";
        } else {
            return null;
        }
    }
    
    render() {
        const {latitude, errorMessage} = this.state;

        // console.log(this.isItWarm());
        
        if (errorMessage) {
            return <div>
                {errorMessage}
            </div>
        }
        return (
            <div>
                {errorMessage || 
                <Clock 
                    icon={ latitude !== null ? this.getClockIcon() : null }
                    timezone={"Sydney/Australia"} 
                    date={new Date()} 
                />}
            </div>
        );
    }
}

export default App;
