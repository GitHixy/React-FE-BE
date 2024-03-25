import React, {useState, useRef} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { getAllPosts } from '../../redux/BlogPosts/blogPostsSlice';

const BlogPostForm = ({ onSubmit }) => {
    const formRef = useRef(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    console.log(file);
    console.log(formData);


    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    };
    
    const resetForm = () => { 
        setFormData({
            category: '',
            title: '',
            content: '',
            author: { name: '' },
            readTime: { value: '', unit: '' },
        });
        setFile(null);
        if (formRef.current) {
            
            formRef.current.reset();
        }
    };

    const uploadFile = async () => {
        const fileData = new FormData();
        fileData.append('uploadImg', file)

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts/cloudUploadImg`,
            fileData)
            return response.data
        } catch (e) {
            console.log(e.message)
        }
    }

    const submitBlogPost = async (e) => {
        e.preventDefault();

        if (file) {
            try {
                const uploadedFile = await uploadFile(file)
                const bodyToSend = {
                    ...formData,
                    cover: uploadedFile.source
                }
                const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/blogPosts`, bodyToSend, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    });
                    alert('Post submitted correctly!');
                    resetForm();
                    dispatch(getAllPosts());

            } catch (e) {
                console.log(e.message)
            }
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Form ref={formRef} onSubmit={submitBlogPost} encType='multipart/form-data'>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                
                                type="text"
                                name="category"
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                            
                                type="text"
                                name="title"                                
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cover Image</Form.Label>
                            <Form.Control
                                
                                type="file"
                                name="uploadImg"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Read Time Value</Form.Label>
                            <Form.Control
                            
                                type="number"
                                name="readTime.value"
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Read Time Unit</Form.Label>
                            <Form.Control
                            
                                type="text"
                                name="readTime.unit"
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control
                            
                                type="text"
                                name="author"
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                            
                                as="textarea"
                                rows={3}
                                name="content"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogPostForm;
