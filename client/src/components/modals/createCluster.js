import React, { useState} from 'react';
import Modal from "./modal";
import {Box, Form, FormField, RadioButtonGroup, Select, Text, TextArea, TextInput} from "grommet";
import {createCluster} from "../../actions";

const show_vpc = ["No", "Yes"];
const targetcloud_options = ["AWS","Azure","GCP"];
const options = [1,10];
const zones = ["us-east-2", "us-east-1", "us-west-1", "us-west-2"];


function CreateCluster({setModal, customerid, setAccesPoints}) {
    const [isLoading, setIsLoading] = useState(false);
    const [isShowVpc, setVPC] = useState(show_vpc[0]);
    const [formData, setFormData] = useState({
        accesskey: "",
        secretkey: "",
        clustersize: 1,
        vpcid: "",
        subnetid: "",
        zone: "", targetcloud: "",
    })
    const onClose=()=>setModal(null)
    const onSubmit = ()=>{
        setIsLoading(true);
        const clusterData = {...formData, customerid, endpoints: "gdrgd"};
        console.log(clusterData)
        createCluster(clusterData)
            .then(resp=>{
            if (resp?.status === "OK") {
                setAccesPoints(resp);
                setIsLoading(false);
                onClose();
            }
        }).finally(()=>{
            onClose();
        })
    }
    return (
        <Modal
            // full
            onClose={onClose}
            title={"Create Cluster"}
            secondaryLabel={"Cancel"}
            primaryLabel={'Submit'}
            onPrimaryClick={onSubmit}
            onSecondaryClick={onClose}
            displaySecondaryButton
            displayPrimaryButton
            isPrimaryBtnDisabled={isLoading}
        >
            <Form
                value={formData}
                onChange={nextValue => setFormData(nextValue)}
                onSubmit={onSubmit}

            >
                <Box direction={"row"}>
                <FormField
                    htmlFor="text-input-id-clustername"
                    label={"Cluster Name"}
                    name="clustername"
                    className={"margin-r-5 width-50"}
                >
                    <TextInput
                        id="text-input-id-clustername"
                        name="clustername"
                    />
                </FormField>
                <FormField label="Cluster Size" htmlFor="select-size" name={"clustersize"} className={"width-50"}>
                    <Select
                        id="select-size"
                        placeholder="Select Size"
                        options={options}
                        labelKey={(val)=>val + "TB"}
                        onChange={({ option }) => setFormData({
                            ...formData,
                            clustersize: option
                        })}
                    />
                </FormField>
                </Box>
                <Box direction={"row"} >
                <FormField label="Target Cloud" htmlFor="select-targetcloud" name={"targetcloud"}
                           className={"margin-r-5 width-50"}
                >
                    <Select
                        id="select-targetcloud"
                        placeholder="Select Cloud"
                        options={targetcloud_options}
                        onChange={({ option }) => setFormData({
                            ...formData,
                            targetcloud: option
                        })}
                    />
                </FormField>
                <FormField label="Zone" htmlFor="select-zone" name={"zone"} className={"width-50"}>
                    <Select
                        id="select-zone"
                        placeholder="Select Zone"
                        options={zones}
                        onChange={({ option }) => setFormData({
                            ...formData,
                            zone: option
                        })}
                    />
                </FormField>
                </Box>
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
                <Text>Do you have an existing VPC ID?</Text>
                <RadioButtonGroup
                    direction={'row'}
                    name="bbbc"
                    options={show_vpc}
                    value={isShowVpc}
                    onChange={(event) => setVPC(event.target.value)}
                />
                {isShowVpc === show_vpc[1] && <Box direction={"row"}>
                    <FormField
                        htmlFor="text-input-id-vpcid"
                        label={"VPC ID"}
                        name="vpcid"
                        className={"width-50 margin-r-5"}
                    >
                        <TextInput
                            id="text-input-id-vpcid"
                            name="vpcid"
                        />
                    </FormField>
                    <FormField
                        htmlFor="text-input-id-subnetid"
                        label={"Subnet ID"}
                        name="subnetid"
                        className={"width-50"}
                    >
                        <TextInput
                            id="text-input-id-subnetid"
                            name="subnetid"
                        />
                    </FormField>
                </Box>}
            </Form>
        </Modal>
    );
}

export default CreateCluster;