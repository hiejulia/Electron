var React = require('react');
var $ = jQuery = require('jquery');
var _ = require('lodash');
var bootstrap = require('boostrap');
var fs = eRequire('fs');

var loadMeetings = JSON.parse(fs.readFileSync(dataLocation));
var electron = eRequire('electron');
var ipc = electron.ipcRender;
var ReactDOM = require('react-dom');
var MeetingList = require('./MeetingList');
var Asidebar = require('./Asidebar');
var HeaderNav = require('./HeaderNav');
var AddMeeting = require('./AddMeeting');


var App = React.createClass({
//getInitialState
    getInitialState:function(){
        return {
            meetingBodyVisible: false,
              orderBy: 'meeting',
              orderDir: 'asc',
              queryText: '',
              myMeeting: loadMeetings

        }

    },

//toggleMeetingDislay
    toggleMeetingDislay: function(){
        var tempVisibility = !this.state.meetingBodyVisible;
        this.setState({
            meetingBodyVisible:tempVisibility


        });


    },
    //showAbout

    showAbout: function(){
        ipc.sendSync('openInfoWindow');


    },
    //addItem
    addItem: function(tempItem){
        var tempMeetings = this.state.myMeeting;
        tempMeetings.push(tempItem);
        this.setState({
            myMeetings:tempMeetings,
            meetingBodyVisible:false
        })



    },

    //deleteMessage
    deleteMessage: function(item){
        var allMeetings = this.state.myMeetings;
        //lodash to delete
        var newMeetings = _.without(allMeetings, item);
        this.setState({

            myMeetings:newMeetings
        });

    },
    //search meeting
    searchMeetings: function(query){
        this.setState({
            queryText:query
        });

    },

    //reOrder
    reOrder: function(orderBy, orderDir){
        this.setState({
            orderBy:orderBy,
            orderDir:orderDir
        })



    },

    //render
    render:function(){
        //return

            var filteredMeetings = [];
            var queryText = this.state.queryText;
            var orderBy = this.state.orderBy;
            var orderDir = this.state.orderDir;
            var myMeetings = this.state.myMeetings;

        //check meetingBodyVisible
            if(this.state.meetingBodyVisible){
            $('#addMeeting').modal('show');
        }
        else{
            $('#addMeeting').modal('hide');

        }

        for(var i=0;i<myMeetings.length;i++){
            if( (myMeetings[i].meeting.toLowerCase().indexOf(queryText)!=-1) ||
        (myMeetings[i].customer.toLowerCase().indexOf(queryText)!=-1) ||
        (myMeetings[i].date.toLowerCase().indexOf(queryText)!=-1) ||
        (myMeetings[i].meetingNote.toLowerCase().indexOf(queryText)!=-1)){
                filteredMeetings.push(myMeetings[i]);
            }
        }

        filteredMeetings = _.orderBy(filteredMeetings,function(item){
            return item[orderBy].toLowerCase();
        },orderDir);//order array

        filteredMeetings = filteredMeetings.map(function(item, index){
            return
                <MeetingList
                key={index}
                singleItem={item}
                whichItem={item}
                onDelete={this.deleteMessage}

                />



        }.bind(this));//bind

        return (
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
             </div>
           </div>
          </div>
        </div>
      </div>

    );
  } //render
});//MainInterface

ReactDOM.render(
  <App />,
  document.getElementById('root')
); //render
