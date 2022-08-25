import React, {useState} from 'react';
import Modal from "./modal";
import {Box, FormField, Text, TextArea, Form} from "grommet";
import {deleteCluster} from "../../actions";

function DeleteCluster({setModal, row, customerid}) {
    const [formData, setFormData] = useState({
        accesskey: "",
        secretkey: "",
    })
    const clusterid = row.clusterid;
    const onClose = ()=>setModal(null);
    const  onSubmit =()=>{
        if (Number.isInteger(customerid) && Number.isInteger(clusterid)) {
            deleteCluster({customerid, clusterid}).then(res=>{
                console.log("res from deleting", res);
            }).finally(()=>{
                onClose()
            })
        }
    };
    return (
        <Modal
            onClose={onClose}
            title={"Delete Cluster"}
            secondaryLabel={"Cancel"}
            primaryLabel={'Submit'}
            onPrimaryClick={onSubmit}
            onSecondaryClick={onClose}
            displaySecondaryButton
            displayPrimaryButton
        >
            <Text>Are you sure you want to delete cluster <Text weight={"bold"}>{row.clustername}</Text>
                <Form
                    value={formData}
                    onChange={nextValue => setFormData(nextValue)}
                    onSubmit={onSubmit}
                >
                <Box direction={"row"} >
                    <FormField
                        htmlFor="text-input-id-accesskey"
                        label={"Access Key"}
                        name="accesskey"
                        className={"margin-r-5 width-50"}
                    >
                        <TextArea
                            id="text-input-id-accesskey"
                            name="accesskey"
                        />
                    </FormField>
                    <FormField
                        htmlFor="text-input-id-secretkey"
                        label={"Secret Key"}
                        name="secretkey"
                        height={"auto"}
                        className={"width-50"}
                    >
                        <TextArea
                            id="text-input-id-secretkey"
                            name="secretkey"
                        />
                    </FormField>
                </Box>
                </Form>
            </Text>
        </Modal>

    );
}

export default DeleteCluster;