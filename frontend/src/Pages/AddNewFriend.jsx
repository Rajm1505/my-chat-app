import '../css/addnewfriend.css';
import React from 'react';
import Navbar1 from '../Navbar1';

export default function AddNewFriend(){
    return(
        <>
            <Navbar1 />

            <div className="container">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-md-8">
                        <div className="people-nearby text-white">
                            <div className="nearby-user">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-2 col-sm-2">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" className="profile-photo-lg" />
                                    </div>
                                    <div className="col-md-7 col-sm-7">
                                        <h5>Sophia Page</h5>
                                    </div>
                                    <div className="col-md-3 col-sm-3">
                                        <button className="btn btn-outline-primary pull-right">Add Friend</button>
                                    </div>
                                </div>
                            </div>
                            <div className="nearby-user">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-2 col-sm-2">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="user" className="profile-photo-lg" />
                                    </div>
                                    <div className="col-md-7 col-sm-7">
                                        <h5>Emma Johnson</h5>
                                    </div>
                                    <div className="col-md-3 col-sm-3">
                                        <button className="btn btn-outline-primary pull-right">Add Friend</button>
                                    </div>
                                </div>
                            </div>
                            <div className="nearby-user">
                                <div className="row d-flex align-items-center">
                                    <div className="col-md-2 col-sm-2">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="user" className="profile-photo-lg" />
                                    </div>
                                    <div className="col-md-7 col-sm-7">
                                        <h5>Nora Wilson</h5>
                                    </div>
                                    <div className="col-md-3 col-sm-3">
                                        <button className="btn btn-outline-primary pull-right">Add Friend</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}