import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom";
import ReactFileReader from "react-file-reader";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "../../../graphql/mutations";

class establishmentImport extends Component {
    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = function(e) {
            let lines = reader.result.split("\n");
            let breweries = [];
            for(let i = 1; i < lines.length; i++) {
                let line = lines[i].split(",");
                let brewery = {};

                //name
                if(line.hasOwnProperty(0) && line[0].length) {
                    brewery['name'] = line[0].trim();
                }

                //street address
                if(line.hasOwnProperty(1) && line[1].length) {
                    brewery['streetAddress'] = line[1].trim();
                }

                //city
                if(line.hasOwnProperty(2) && line[2].length) {
                    brewery['city'] = line[2].trim();
                }

                //state
                if(line.hasOwnProperty(3) && line[3].length) {
                    brewery['state'] = line[3].trim();
                }

                //zipcode
                if(line.hasOwnProperty(4) && line[4].length) {
                    brewery['zipcode'] = line[4].trim();
                }

                //phone
                if(line.hasOwnProperty(5) && line[5].length) {
                    brewery['phone'] = line[5].trim();
                }

                //website
                if(line.hasOwnProperty(6) && line[6].length) {
                    brewery['website'] = line[6].trim();
                }

                //uid
                if(line.hasOwnProperty(7) && line[7].length) {
                    if(line[7].trim().toLocaleLowerCase() !== 'false') {
                        brewery['uid'] = line[7].trim();
                    }
                }

                if(brewery.uid) {
                    const res = breweries.find(b => {
                        return b.uid.trim() === brewery.uid.trim();
                    });

                    if ( res === undefined) {
                        breweries.push(brewery);
                    }
                }
            }

            console.log(breweries.length);
            breweries = breweries.slice(7100, 7164);
            for(let j in breweries) {
               if(breweries.hasOwnProperty(j)) {
                   const brewery = breweries[j];

                    API.graphql(graphqlOperation(mutations.createEstablishment, {input: brewery})).then(res => {
                        console.log('created: ' + res.data.createEstablishment.id);
                    });
                }
            }
        };
        
        reader.readAsText(files[0]);
    };

    render() {
        return (
            <Fragment>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/establishments">Establishments</Link>
                    </li>
                    <li className="breadcrumb-item active">Import Establishment</li>
                </ol>
                <h1>Import Establishment</h1>

                <hr/>
                <ReactFileReader fileTypes={[".csv"]} handleFiles={this.handleFiles}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>
            </Fragment>
        );
    }
}

export default establishmentImport;