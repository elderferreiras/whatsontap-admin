import React from 'react';

const footer = () => {
    return (
        <footer className="sticky-footer">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright © What's on tap? {1900 + (new Date().getYear())}</span>
                </div>
            </div>
        </footer>
    );
};

export default footer;