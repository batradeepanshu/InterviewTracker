import React, { Component, Fragment } from "react";
import '../stylesheets/deletePopup.css';

export default class DeletePopup extends Component {
  constructor() {
    super();
    this.state = {};
  }
  deleteEntry() {
    this.props.deleteEntry(this.refs.comment.value,this.refs.adminKey.value);
  }
  setComment(e) {
    this.setState({ comment: e.target.value });
  }
  render() {
    return (
      <Fragment>
        <div className='delete-label'>Why do you want to delete this entry ??</div>
        <textarea
          type="text"
          value={this.state.comment}
          onChange={this.setComment.bind(this)}
          placeholder="Why do you want to delete this entry ??"
          ref="comment"
          row="3"
        />
      <input type='password' placeholder='Admin Key' ref='adminKey'/>
      {this.state.comment && <div className="btn btn-danger delete-entry" onClick={this.deleteEntry.bind(this)}>
          Delete Entry
        </div>}
      </Fragment>
    );
  }
}
