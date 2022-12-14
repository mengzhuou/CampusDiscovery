import "./Dashboard.css";
import { withFuncProps } from "../withFuncProps";
import React from 'react';
import { getinfo, getevent, logout} from '../../helpers/connector';
import DashboardBox from './DashboardBox';
import Pagination from './Pagination';
import Checkbox from "./Checkbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class Dashboard extends React.Component<any,any>{

    constructor(props:any){
        super(props);
        this.state = {isFilterBeforeChecked:false, isFilterAfterChecked:false,
             beforeDate: new Date(), afterDate: new Date(), hostEmailFilter: "",
             distance: "", currentPage: 1, lastpage: 6, arr: [], 
             xpos:window.scrollX, ypos:window.scrollY, updateForced:false, 
             ForceUpdateNow:false, username:"", location: [33.77777410980573, -84.39852918539553]};
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.forceup = this.forceup.bind(this);
        this.pagelogout = this.pagelogout.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.passEventId = this.passEventId.bind(this);
        this.checkBeforeDateState = this.checkBeforeDateState.bind(this);
        this.checkAfterDateState = this.checkAfterDateState.bind(this);
        this.dateBeforeChange = this.dateBeforeChange.bind(this);
        this.dateAfterChange = this.dateAfterChange.bind(this);
        this.setDistance = this.setDistance.bind(this);
        this.getHostFromFilter = this.getHostFromFilter.bind(this);

    }

    pagelogout = ()=>{
        logout().then(()=>{
            this.props.navigate("/")
        }).catch(()=>(alert("logout error")));
    }

    createEvent = ()=>{
        this.props.navigate("/EventCreationPage")
    }

    yourEvenrPage = ()=>{
        this.props.navigate("/yourEvent")
    }

    mapPage = () => {
        this.props.navigate("/InitMap")
    }

    forceup(){
        this.setState({ForceUpdateNow:true});
        
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
        if(this.state.ForceUpdateNow){
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lng}})=>{
                  const pos = [lat, lng]
                  this.setState({ location: pos})
                })
              }
            let after = JSON.stringify(this.state.afterDate).substring(1,11)+"T00:00:00";
            after = this.state.isFilterAfterChecked ? after: "none";
            let before = JSON.stringify(this.state.beforeDate).substring(1,11)+"T00:00:00";
            before = this.state.isFilterBeforeChecked ? before: "none";
            getevent(this.state.currentPage,after,before,
                this.state.location[0].toString(),this.state.location[1].toString(),
                this.state.distance,this.state.hostEmailFilter).then((content)=>{
                
                let key;
                let array = [];
                for(key in content.data){
                    array.push([content.data[key].title, content.data[key].email, content.data[key].time, 
                        content.data[key].location, content.data[key].description, content.data[key].id,
                        content.data[key].latitude, content.data[key].longitude]);
                }
                this.setState({arr:array});
                this.props.setarr(array);
            })
            getinfo().then((content)=>{
                this.setState({username:content.data.username});
            });
            this.setState({ForceUpdateNow:false});
        }
    }
    
    setCurrentPage(page:number){
        this.setState({currentPage:page, ForceUpdateNow:true});
    }
    
    componentDidMount(): void {
        this.forceup();
    }
    passEventId(eventId: number): void{
        this.props.setEventID(eventId);
        this.props.navigate("/EventDescriptionPage");
    }

    dateBeforeChange(date: Date){
        this.setState({
            beforeDate: date
        });
    }

    dateAfterChange(date: Date){
        this.setState({
            afterDate: date
        });
    }

    setDistance(e: React.FormEvent<HTMLInputElement>){
        this.setState({
            distance: e.currentTarget.value
        })
    }

    getHostFromFilter(e: React.FormEvent<HTMLInputElement>){
        this.setState({
            hostEmailFilter: e.currentTarget.value
        })
    }

    checkBeforeDateState = (e: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({isFilterBeforeChecked: e.target.checked});
    }

    checkAfterDateState = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({isFilterAfterChecked: e.target.checked});
    }

    render(){
        let dasharr: any[] = [];

        for(let i = 0; i < this.state.arr.length; i++){
            dasharr.push(<DashboardBox 
                title={this.state.arr[i][0]}
                host={this.state.arr[i][1]}
                date={this.state.arr[i][2]}
                location={this.state.arr[i][3]}
                description={this.state.arr[i][4]}
                id ={this.state.arr[i][5]}
                key ={this.state.arr[i][5]}
                update={this.forceup}
                setEventID={this.passEventId}
                username={this.state.username}
                />);
        }

        return (
            <div className="html">
                <div className="topnav">
                    <button className="topnavButton" onClick={this.pagelogout}>Logout</button>
                    <button className="topnavButton" onClick={this.createEvent}>Create A Event</button>
                    <button className="ManageButton" onClick={this.yourEvenrPage}>Your Events</button>
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCqcmw27n2Z66yVih4M47FZGLj2vKcJnkA&callback=initMap&v=weekly"
                        defer>
                    </script>
                    <button className="topnavButton" onClick={this.mapPage}>Map</button>
                </div>
                <div className="AppDashboard"> 
                    <header>
                        <p className="header">Dashboard</p>

                    </header>
                    <div className="sidenav">
                        <h1 >Filters</h1> 
                        <div>
                            <Checkbox
                                isChecked= {this.state.isFilterBeforeChecked}
                                handleChange={this.checkBeforeDateState}
                                label={"Before Date : "}

                            />
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.beforeDate} 
                                onChange={this.dateBeforeChange}
                            />
                            <Checkbox
                                isChecked= {this.state.isFilterAfterChecked}
                                handleChange={this.checkAfterDateState}
                                label={"After Date : "}

                            />
                            <DatePicker
                                dateFormat="yyyy-MM-dd"
                                selected={this.state.afterDate} 
                                onChange={this.dateAfterChange}
                            />
                        </div>
                        <div>
                            <label>Distance : </label>
                            <input
                                onChange={this.setDistance}
                                value={this.state.distance}
                                className="mileInputStyle"
                            />
                            <label>miles from your current location</label>
                        </div>

                        <div className="hostInputStyle">
                            <label>Host : </label>
                            <input
                                onChange={this.getHostFromFilter}
                                placeholder="Email"
                                value={this.state.hostEmailFilter}
                            />
                        </div>

                        <button className="filterButton" onClick={this.forceup}>Confirm Filter</button>
                    </div>
                    <div className='body'>
                        {dasharr}
                    </div>
                    <div className="pagination">
                        <Pagination
                            currentPage={this.state.currentPage}
                            lastPage={this.state.lastPage}
                            maxLength={10}
                            setCurrentPage={this.setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default withFuncProps(Dashboard);