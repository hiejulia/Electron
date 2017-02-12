var React = require('react');

var AsideBar = React.createClass({
    //create new meeting node
    createMeetings: function(){
        this.props.handleToggle();

    },

    toggleAbout: function(){
        this.props.handleAbout();
    },


    render: function(){

        return(
            <div className="asidebar">
                <div className="asidebar-item"

                onClick={this.createMeetings}>
                    <span className="toolbar-item-button glyphicon glyphicon-plus-sign"></span>
                      <span className="toolbar-item-text">Add Meeting</span>

            </div>

            <div className="asidebar-item" onClick={this.toggleAbout}>
                      <span className="toolbar-item-button glyphicon glyphicon-question-sign"></span>
                      <span className="toolbar-item-text">About this app</span>
            </div>





            </div>



        )





    }


});


module.exports = AsideBar;
