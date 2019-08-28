import React, { Component, Fragment } from 'react';
import {Link} from "react-router-dom";
import ReactFileReader from "react-file-reader";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "../../../graphql/mutations";
import uuidv4 from "uuid/v4";

class establishmentImport extends Component {
    handleFiles = files => {
        let reader = new FileReader();
        reader.onload = function(e) {
            const csvToArray = (text) =>{
                let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
                for (l of text) {
                    if ('"' === l) {
                        if (s && l === p) row[i] += l;
                        s = !s;
                    } else if (',' === l && s) l = row[++i] = '';
                    else if ('\n' === l && s) {
                        if ('\r' === p) row[i] = row[i].slice(0, -1);
                        row = ret[++r] = [l = '']; i = 0;
                    } else row[i] += l;
                    p = l;
                }
                return ret;
            };

            let lines = reader.result.split("\n");
            let breweries = [];
            for(let i = 1; i < lines.length; i++) {
                let line = csvToArray(lines[i]);

                if(line.hasOwnProperty(0)) {
                    line = line[0];
                }
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

            breweries = breweries.slice(0, 1000); //7173
            for(let j in breweries) {
               if(breweries.hasOwnProperty(j)) {
                   const brewery = breweries[j];
                   brewery['id'] = uuidv4();
                    API.graphql(graphqlOperation(mutations.createEstablishment, {input: brewery})).then(res => {
                        console.log('created: ' + res.data.createEstablishment.uid);
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