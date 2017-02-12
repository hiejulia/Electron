var React = require('react');

var MeetingList = React.createClass({

    //handleDelete
    handleDelete: function(){

        this.props.onDelete(this.props.whichItem);
    },
    render: function(){
        //return

        return (

             <li className="meeting-item media">
                <div className="media-left">
                      <button className="meeting-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
                      <span className="glyphicon glyphicon-remove"></span></button>
                </div>
            <div className="meeting-info media-body">
                  <div className="meeting-head">
                    <span className="meeting">{this.props.singleItem.meeting}</span>
                    <span className="date pull-right">{this.props.singleItem.date}</span>
                  </div>
              <div className="customer"><span className="label-item">Customer:</span>
                      {this.props.singleItem.customer}</div>
              <div className="meeting-note">{this.props.singleItem.meeting-note}</div>
            </div>
              </li>





        )





    }




});

module.exports = MeetingList;
