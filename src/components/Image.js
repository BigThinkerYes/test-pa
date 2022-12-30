import React, { useEffect, useState, useContext } from 'react';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import { FavoritesContext } from './FavoritesProvider';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Images(props, {url, name,userList, userFilteredList, setUserFilteredList}){
    //added
    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
    const [user, setUser] = useState(null);
    //
    const {data} = props;

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(7);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 12;
    //added
    // const fetchUser = async () => {
    //     // render the first page of 50 characters (array of id, name, image, url)
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     setUser(data);
    //     console.log(user)
    //   };
      //
    useEffect(()=>{
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset,endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
        // fetchUser();
    }, [itemOffset, itemsPerPage, data, userFilteredList]);

    const handlePageClick = (event) =>{
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    return(
        <>
        
            <div className="images">
                {/* <Container>
                    <Row md={4}>
                    {currentItems.map((image, idx) =>(
                        <Col key={idx} className="mt-4" md="4">
                             <UserCard
                                userFilteredList={userFilteredList}
                                key={idx}
                                name={user.name}
                                url={user.url}
                                id={user._id}
                            />
                        </Col>
                    ))}
                    </Row>
                    <Image data={userList} />
                </Container> */}
                <Row md={4}>

                
                 {/* {currentItems.map((image, idx) =>{
                    return(
                        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4 " key={idx}>
                            <div className='card p-0 overflow-hidden h-100 shadow'>
                                <img src={`${image.imageUrl}`} className='card-img-top'/>
                                <div className='card-body'>
                                    <h5 className='card-title'>{image.name}</h5>
                                    <p className='card-text'>{image.url}</p>
                                </div>

                            </div>
                        </div>
                    )
                 })} */}

{currentItems.map((image, idx) =>{
                    return(
                        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4 " key={idx}>
                            <div className='card p-0 overflow-hidden h-100 shadow'>
                                <img src={`${image.imageUrl}`} className='card-img-top'/>
                                <div className='card-body'>
                                    <h5 className='card-title'>{image.name}</h5>
                                    <p className='card-text'>{image.url}</p>
                                </div>

                            </div>
                        </div>
                    )
                 })}
                 </Row>
                {/* ----------------------------------------- */}
               
                
                {/* ---------------------------------------------- */}
      
            <ReactPaginate
            breakLabel="..."
            nextLabel="next>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
            />
            </div>
        </>
    )
}
