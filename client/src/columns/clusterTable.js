import {Anchor, Box} from "grommet";
import {Link} from "grommet-icons";

export const clusters_columns = [
    {
        property: "clusterid",
        header: "SNo.",
        render: (rowData)=>rowData.clusterid,
    },
    {
        property: "clustername",
        header: "Cluster Name",
        render: (rowData)=>rowData.clustername  || "-",
    },
    {
        property: "accesspoints",
        header: "Access Points",
        render: (rowData)=>rowData.accesspoints || true
            ? <Box>
                <Box>
                    {/*UI - https://abc.cde.com/glc*/}
                    {/*NFS - abc.cde.com:/dfaas/*/}
                    {/*S3    - abc.cde.com*/}
                  UI - <Anchor href={rowData.accesspoints?.ui} label={rowData.accesspoints?.ui || "https://abc.cde.com/glc*"} />
                </Box>
                <Box>
                    NFS - <Anchor href={rowData.accesspoints?.nfs} label={rowData.accesspoints?.nfs} />
                </Box>
                <Box>
                    S3 -  <Anchor href={rowData.accesspoints?.s3} label={rowData.accesspoints?.s3} />
                </Box>
            </Box>
            : "-",
    },
    // {
    //     property: "endpoints",
    //     header: "Access Points",
    //     render: (rowData)=>rowData.endpoints  || "-",
    // },
    {
        property: "clustersize",
        header: "Cluster Size",
        render: (rowData)=>rowData.clustersize ? rowData.clustersize + "TB" : 0,
    },
    {
        property: "zone",
        header: "Zone",
        render: (rowData)=>rowData.zone  || "-",
    },
    {
        property: "targetcloud",
        header: "Target Cloud",
        render: (rowData)=>rowData.targetcloud || "-",
    },
];
// customerid int, clustername varchar(20), endpoints varchar(50), clustersize int,
//     vpcid varchar(20), subnetid varchar(20), accesskey varchar(128), secretkey varchar(256)