var $ = jQuery = require('jquery');
var _ = require('lodash');
var bootstrap = require('bootstrap');
var fs = eRequire('fs');
var loadMeetings = JSON.parse(fs.readFileSync(dataLocation));

var electron = eRequire('electron');
var ipc = electron.ipcRenderer;

var React = require('react');
var ReactDOM = require('react-dom');
var MeetingList = require('./MeetingList');
var Asidebar = require('./Asidebar');
var HeaderNav = require('./HeaderNav');
var AddMeeting = require('./AddMeeting');

var App = React.createClass({
  getInitialState: function() {
    return {
      meetingBodyVisible: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      myMeetings: loadMeetings
    }//return
  }, //getInitialState

  componentDidMount: function() {
    ipc.on('addMeeting', function(event,message) {
      this.toggleMeetingDisplay();
    }.bind(this));
  }, //componentDidMount

  componentWillUnmount: function() {
    ipc.removeListener('addMeeting', function(event,message) {
      this.toggleMeetingDisplay();
    }.bind(this));
  }, //componentDidMount

  componentDidUpdate: function() {
    fs.writeFile(dataLocation, JSON.stringify(this.state.myMeetings), 'utf8', function(err) {
      if (err) {
        console.log(err);
      }
    });//writeFile
  }, //componentDidUpdate

  toggleMeetingDisplay: function() {
    var tempVisibility = !this.state.meetingBodyVisible;
    this.setState({
      meetingBodyVisible: tempVisibility
    }); //setState
  }, //toggleAptDisplay

  showAbout:function() {
    ipc.sendSync('openInfoWindow');
  }, //showAbout

  addItem: function(tempItem) {
    var tempMeetings = this.state.myMeetings;
    tempMeetings.push(tempItem);
    this.setState({
      myMeetins: tempMeetings,
      meetingBodyVisible: false
    }) //setState
  }, //addItem

  deleteMessage: function(item) {
    var allMeetings = this.state.myMeetings;
    var newMeetings= _.without(allMeetings, item);
    this.setState({
      myMeetings: newMeetings
    }); //setState
  }, //deleteMessage

  reOrder: function(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    }) //setState
  }, //reOrder

  searchApts: function(query) {
    this.setState({
      queryText: query
    }); //setState
  }, //searchApts

  render: function() {
    var filteredMeetings = [];
    var queryText = this.state.queryText;
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    var myMeetings = this.state.myMeetings;

    if(this.state.meetingBodyVisible === true) {
      $('#addMeeting').modal('show');
    } else {
      $('#addMeeting').modal('hide');
    }

    for (var i = 0; i < myMeetings.length; i++) {
      if (
        (myMeetings[i].meeting.toLowerCase().indexOf(queryText)!=-1) ||
        (myMeetings[i].customer.toLowerCase().indexOf(queryText)!=-1) ||
        (myMeetings[i].date.toLowerCase().indexOf(queryText)!=-1) ||
        (myMeetings[i].meetingNote.toLowerCase().indexOf(queryText)!=-1)
      ) {
        filteredMeetings.push(myMeetings[i]);
      }
    }

    filteredMeetings = _.orderBy(filteredMeetings, function(item) {
      return item[orderBy].toLowerCase();
    }, orderDir); // order array

    filteredMeetings=filteredMeetings.map(function(item, index) {
      return(
        <MeetingList key = {index}
          singleItem = {item}
          whichItem =  {item}
          onDelete = {this.deleteMessage}
        />
      ) // return
    }.bind(this)); //Appointments.map

    return(
      <div className="application">
        <HeaderNav
          orderBy = {this.state.orderBy}
          orderDir =  {this.state.orderDir}
          onReOrder = {this.reOrder}
          onSearch= {this.searchMeetings}
        />
        <div className="interface">
          <AsideBar
            handleToggle = {this.toggleMeetingDisplay}
            handleAbout = {this.showAbout}
          />
          <AddMeeting
            handleToggle = {this.toggleMeetingDisplay}
            addMeeting = {this.addItem}
          />
          <div className="container">
           <div className="row">
             <div className="meetings col-sm-12">
               <h2 className="meetings-headline">Current Meetings</h2>
               <ul className="item-list media-list">{filteredMeetings}</ul>
             </div>{/* col-sm-12 */}
           </div>{/* row */}
          </div>{/* container */}
        </div>{/* interface */}
      </div>
    );
  } //render
});//MainInterface

ReactDOM.render(
  <App />,
  document.getElementById('root')
); //render
