import React,{Component} from 'react'
import {Modal, ModalHeader,Row,Label,Col} from 'reactstrap'
import {Control,LocalForm,Errors} from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Commentform extends Component{
    constructor(props){
        super(props)
        this.state={
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
        alert(JSON.stringify(values));
    }
    render()
    {
        return(
           <>
            <button onClick={this.toggleModal} className="btn btn-primary"> <i className="fa fa-pencil"></i> Submit Comment</button>
           
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <LocalForm onSubmit={this.handleSubmit}>
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
                    <Col  className="mt-2">
                    <label>Your name</label>
                    </Col>
                   

                                <Col sm={12} className="mt-1">
                                    <Control.text model=".Name" id="name" className="form-control"
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
                                <Control.textarea model=".comments" className="form-control" rows="5" >

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

export default Commentform;