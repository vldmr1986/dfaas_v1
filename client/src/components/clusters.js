import React, {useEffect, useMemo, useState} from 'react';
import {Box, Button, DataTable, Heading} from "grommet";
import {getClusters} from "../actions";
import CreateCluster from "./modals/createCluster";
import DeleteCluster from "./modals/deleteCluster";
import {clusters_columns} from "../columns/clusterTable";

const MODAL_TYPE = {
    create: "create",
    delete: "delete"
}

function Clusters({ customerid, customername}) {
    const [clusters, setClusters] = useState([]);
    const [isLoaded, setIsLoaded] = useState(true);
    const [modal, setModal] = useState(null);
    const [accessPoints, setAccesPoints] = useState({s3:"", nfs: "", ui: ""});

let clusterColumns = useMemo(()=>{
    return [...clusters_columns,
        {
            property: 'actions',
            header: "Actions",
            size: '70px',
            render: (rowData) => {
                return <Button
                    onClick={()=>setModal({type: MODAL_TYPE.delete, row:rowData})}
                    label={"Delete"}
                    primary
                />
            }
        }
    ]
}, [clusters_columns]);

    // let clusterColumns = useMemo(()=>{
    //     return clusterColumns.map((item)=>{
    //         if (item.accesspoints) return {
    //             ...item,
    //             accesspoints: accessPoints,
    //         }
    //     })
    // }, [accessPoints]);





    // accessPoints

    const loadClusters = ()=> {
    if (modal === null) {
        if (isLoaded === false) setIsLoaded(true);

        getClusters(customerid)
            .then((resp)=>{
                setClusters(resp);
            })
            .finally(()=>{
                // setIsLoading(false);
            })
    }
    }

    useEffect(loadClusters,[modal]);
    return (
        <Box overflow={'auto'}>
            <Box justify={'center'} width={'100%'} align={'center'}>
            <Heading level={3}>Ezmeral Data Fabric as a Service,
                <Box align={"center"} justify={"center"}>Welcome {customername} !</Box>
            </Heading>
            </Box>
            <Box align="center" pad="large">
                <Box align={"end"} justify={"end"}
                     // fill={'horizontal'}
                    width={"large"}
                     // border={"2px solid red"}
                >
                <Button  margin={'small'} primary onClick={()=>{setModal({type: MODAL_TYPE.create})}} label={"Add Cluster"}/>
                </Box>
                <DataTable
                    step={10}
                    // placeholder={isLoaded? "Loading..." : ""}
                    columns={clusterColumns}
                    data={clusters}
                />
            </Box>
            {
                modal?.type === MODAL_TYPE.create && <CreateCluster customerid={customerid} setModal={setModal} />
            }
            {
                modal?.type === MODAL_TYPE.delete && <DeleteCluster customerid={customerid} row={modal?.row} setModal={setModal} />
            }
        </Box>
    );
}

export default Clusters;