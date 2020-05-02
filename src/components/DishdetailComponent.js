import React,{Component} from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

// import Commentform from './commentform';

function RenderComments({ comments, postComment,dishId}) {
        if (comments != null) 
        return (
            <div className=''>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comments.map((comment) => {
                   return (
                    <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
              )})
           }
           </ul>
                <Commentform dishId={dishId} postComment={postComment} />
           </div>
     )
    }
    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className=''>
                    <Card >
                        <CardImg top src={baseUrl + dish.image} alt={dish.name} />                        <CardBody>
                            <CardTitle><em>{dish.name}</em></CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
class Commentform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false

        }
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };
    handleSubmit(values) {
        alert("Current State is: " + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
        return (
            <>
                <button onClick={this.toggleModal} className="btn btn-primary"> <i className="fa fa-pencil"></i> Submit Comment</button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <div className="container">
                                <Col sm={12}>
                                    <Label className="label">Rating</Label>
                                </Col>
                                <Col sm={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </Control.select>
                                </Col>
                                <Col className="mt-2">
                                    <label>Your name</label>
                                </Col>
                                <Col sm={12} className="mt-1">
                                    <Control.text model=".author" id="name" className="form-control"
                                        placeholder="Name" validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".Name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                                <Col sm={12} className="mt-2">
                                    <label>Comments</label>
                                </Col>
                                <Col sm={12} className="mt-1">
                                    <Control.textarea model=".comment" className="form-control" rows="5" >
                                    </Control.textarea>
                                </Col>
                                <Col sm={12} className="mt-5">
                                    <button className="btn btn-primary"> Submit</button>
                                </Col>
                            </div>
                        </Row>
                    </LocalForm>
                </Modal>

            </>
        )
    }
}
    const Dishdetail=(props)=>{
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null)
       
          return (
              <div className="container">
                  <div className="row">
                      <Breadcrumb>
                          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                      </Breadcrumb>
                      <div className="col-12">
                          <h3>{props.dish.name}</h3>
                          <hr />
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12 col-md-5 m-1">
                          <RenderDish dish={props.dish} />
                      </div>
                      <div className="col-12 col-md-5 m-1">
                          <RenderComments comments={props.comments}
                              dishId={props.dish.id} 
                              postComment={props.postComment}
                              />
                      </div>
                  </div>
               
              </div>
          );
        else
        return(
            <div></div>
        );
    }

export default Dishdetail