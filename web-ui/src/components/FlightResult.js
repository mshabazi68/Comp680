import React, {Component} from 'react';
import moment from 'moment';


class FlightResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            flightRes: props.result ? props.result : []
        }
        let time = this.convertTimeStamp(1557310200);

        console.log("time",time);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(JSON.stringify(this.props.result) !== JSON.stringify(nextProps.result)){
            this.setState({
                flightRes: nextProps.result
            })
        }
    }

    convertTimeStamp = (timestamp)=>{
        let date = new Date(timestamp*1000);
        let date_res = moment(date).format('MM/DD/YYYY , h:mm:ss');

        return date_res;
    }

    render() {
        const {flightRes} = this.state;

        return (
            <>
            { flightRes.length>0 ?(
                <>
                   {flightRes.length>0 && flightRes.map((x,index)=>(
                    <div className="flex mt-5 p-12" style={{display: "flex"}} key={index}>
                        <div className="col-3 flex flex-column">
                            <div className="flex">
                                <p className="flex"><strong>{x.cityFrom}</strong></p>
                                <p className="flex">{this.convertTimeStamp(x.dTime)}</p>
                            </div>
                        </div>
                        <div className="col-3 flex flex-column">
                            <strong>-------------></strong>
                        </div>
                        <div className="col-3 flex flex-column">
                            <div className="flex">
                                <p className="flex"><strong>{x.cityTo}</strong></p>
                                <p className="flex">{this.convertTimeStamp(x.aTime)}</p>
                            </div>
                        </div>
                        <div className="col-3 flex flex-column">
                            <h4 className="text-center">${x.price}</h4>
                        </div>
                    </div>
                   ))}
                </>
                ):(
                <div>No Result</div>
            )}
            </>
        );
    }
}

export default FlightResult