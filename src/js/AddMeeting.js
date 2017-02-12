var React = require('react');
var defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 14);


//format date
function formatDate(date, divider) {
    var someday = new Date(date);
    var month = someday.getUTCMonth() + 1;
    var day = someday.getUTCDate();
    var year = someday.getUTCFullYear();

    if (month <= 9) {
        month = '0' + month;
    }
    if (day <= 9) {
        day = '0' + day;
    }

    return ('' + year + divider + month + divider + day);
}


var AddMeeting = React.createClass({
//toggleMeetingDisplay
    toggleMeetingDisplay: function(){

        this.props.handleToggle();

    },
    //handleAdd
    handleAdd: function(event){
        event.preventDefault();

        var tempMeeting= {

            meeting:this.inputMeeting.value,
            customer:this.inputCustomer.value,
            date:this.inputDate.value + ' '+this.inputDate.value,
            meetingNote:this.inputMeetingNote.value
        }


        this.props.addMeeting(tempMeeting);
        this.inputMeeting.value = '';
        this.inputCustomer.value = '';
        this.inputDate.value = formatDate(defaultDate, '-');
        this.inputTime.value = '09:00';
        this.inputMeetingNote.value = '';
    },

    //render
    render: function(){
        //return
        return (


        <div className="modal fade" id="addMeeting" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.toggleMeetingDisplay} aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Add a Meeting</h4>
            </div>

            <form className="modal-body add-meeting form-horizontal" onSubmit={this.handleAdd}>
              <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="meeting">Meeting</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control"
                    id="meeting" ref={(ref) => this.inputMeeting = ref } placeholder="Meeting" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="customer">Customer</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control"
                    id="customer"  ref={(ref) => this.inputCustomer = ref } placeholder="Customer" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="date">Date</label>
                <div className="col-sm-9">
                  <input type="date" className="form-control"
                    id="date"  ref={(ref) => this.inputDate = ref }
                    defaultValue={formatDate(defaultDate, '-')} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="time">Time</label>
                <div className="col-sm-9">
                  <input type="time" className="form-control"
                    id="time"  ref={(ref) => this.inputTime = ref } defaultValue={'09:00'} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="meetingNote">Meeting Notes</label>
                <div className="col-sm-9">
                  <textarea className="form-control" rows="4" cols="50"
                    id="meetingNote"  ref={(ref) => this.inputMeetingNote = ref } placeholder="Meeting Notes"></textarea>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-9">
                  <div className="pull-right">
                    <button type="button" className="btn btn-default"  onClick={this.toggleMeetingDisplay}>Cancel</button>&nbsp;
                    <button type="submit" className="btn btn-primary">Add Meeting</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>



        )




    }


});



module.exports = AddMeeting;
