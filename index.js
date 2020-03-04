var AWS = require('aws-sdk');
var ssm;


var baselineName, patchingOS, severity, classification, approveAfterDays, baselineDesc, patchGroup;

var maintenanceWindowName, mWSchedule, mWDuration, mWCutoff, targetOwnerInformation, task, serviceRoleARN, region;

var maintenanceWindowId, windowTargetId, serviceRoleARN;

var PatchTag;




exports.handler = async(event) => {
    // TODO implement


    //Patching Process Initiation


    ssm = new AWS.SSM();

    PatchTag = await event["queryStringParameters"]['PatchTag'];
    console.log(PatchTag);

    //Getting Patch Baseline Name from the Parameter store 
    var params_baseline_name = {
        Name: '/patch/baseline/name',
        WithDecryption: false
    };

    params_baseline_name.Name = '/patch/' + PatchTag + '/baseline/name';

    let j1 = await ssm.getParameter(params_baseline_name).promise();
    console.log("j1-----", j1);
    baselineName = j1.Parameter.Value;
    baselineName = JSON.stringify(baselineName);
    baselineName = baselineName.replace(/"/g, "");
    console.log("\n" + baselineName + "\n");



    //Getting Patch Operating System Name from the Parameter store 
    var params_os = {
        Name: '/patch/baseline/OS',
        WithDecryption: false
    };

    params_os.Name = '/patch/' + PatchTag + '/baseline/OS';


    let j2 = await ssm.getParameter(params_os).promise();

    patchingOS = j2.Parameter.Value;
    patchingOS = JSON.stringify(patchingOS);
    patchingOS = patchingOS.replace(/"/g, "");
    console.log("\n" + patchingOS + "\n");


    //Getting Patch Severity from the Parameter store 
    var params_severity = {
        Name: '/patch/baseline/severity',
        WithDecryption: false
    };

    params_severity.Name = '/patch/' + PatchTag + '/baseline/severity';


    let j3 = await ssm.getParameter(params_severity).promise();

    severity = j3.Parameter.Value;
    severity = JSON.stringify(severity);
    severity = severity.replace(/"/g, "");
    console.log("\n" + severity + "\n");

    //Getting Classification from the Parameter store 

    var params_classification = {
        Name: '/patch/baseline/classification',
        WithDecryption: false
    };

    params_classification.Name = '/patch/' + PatchTag + '/baseline/classification';


    let j4 = await ssm.getParameter(params_classification).promise();

    classification = j4.Parameter.Value;
    classification = JSON.stringify(classification);
    classification = classification.replace(/"/g, "");
    console.log("\n" + classification + "\n");

    //Getting Approve After days Value from the Parameter store 

    var params_approve_after_days = {
        Name: '/patch/baseline/approve_after_days',
        WithDecryption: false
    };

    params_approve_after_days.Name = '/patch/' + PatchTag + '/baseline/approve_after_days';


    let j5 = await ssm.getParameter(params_approve_after_days).promise();

    approveAfterDays = j5.Parameter.Value;
    approveAfterDays = JSON.stringify(approveAfterDays);
    approveAfterDays = approveAfterDays.replace(/"/g, "");
    console.log("\n" + approveAfterDays + "\n");

    //Getting Baseline Description from the Parameter store 

    var params_baseline_description = {
        Name: '/patch/baseline/desc',
        WithDecryption: false
    };

    params_baseline_description.Name = '/patch/' + PatchTag + '/baseline/desc';


    let j6 = await ssm.getParameter(params_baseline_description).promise();

    baselineDesc = j6.Parameter.Value;
    baselineDesc = JSON.stringify(baselineDesc);
    baselineDesc = baselineDesc.replace(/"/g, "");
    console.log("\n" + baselineDesc + "\n");

    //Getting Patch Group from the Parameter store 


    var params_patch_group = {
        Name: '/patch/patchgroup/name',
        WithDecryption: false
    };

    params_patch_group.Name = '/patch/' + PatchTag + '/patchgroup/name';


    let j7 = await ssm.getParameter(params_patch_group).promise();
    patchGroup = j7.Parameter.Value;
    patchGroup = JSON.stringify(patchGroup);
    patchGroup = patchGroup.replace(/"/g, "");
    console.log("\n" + patchGroup + "\n");


    //Getting maintenance Window Name from the Parameter store 

    var params_mw_name = {
        Name: '/patch/maintenancewindow/name',
        WithDecryption: false
    };

    params_mw_name.Name = '/patch/' + PatchTag + '/maintenancewindow/name';


    let j8 = await ssm.getParameter(params_mw_name).promise();

    maintenanceWindowName = j8.Parameter.Value;
    maintenanceWindowName = JSON.stringify(maintenanceWindowName);
    maintenanceWindowName = maintenanceWindowName.replace(/"/g, "");
    console.log("\n" + maintenanceWindowName + "\n");

    //Getting maintenance Window Schedule from the Parameter store 
    var params_mw_schedule = {
        Name: '/patch/maintenancewindow/schedule',
        WithDecryption: false
    };

    params_mw_schedule.Name = '/patch/' + PatchTag + '/maintenancewindow/schedule';


    let j9 = await ssm.getParameter(params_mw_schedule).promise();

    mWSchedule = j9.Parameter.Value;
    mWSchedule = JSON.stringify(mWSchedule);
    mWSchedule = mWSchedule.replace(/"/g, "");
    console.log("\n" + mWSchedule + "\n");

    //Getting maintenance Window Duration from the Parameter store 

    var params_mw_duration = {
        Name: '/patch/maintenancewindow/duration',
        WithDecryption: false
    };

    params_mw_duration.Name = '/patch/' + PatchTag + '/maintenancewindow/duration';


    let j10 = await ssm.getParameter(params_mw_duration).promise();
    mWDuration = j10.Parameter.Value;
    mWDuration = JSON.stringify(mWDuration);
    mWDuration = mWDuration.replace(/"/g, "");
    console.log("\n" + mWDuration + "\n");


    //Getting maintenance Window Cutoff from the Parameter store 

    var params_mw_cutoff = {
        Name: '/patch/maintenancewindow/cutoff',
        WithDecryption: false
    };

    params_mw_cutoff.Name = '/patch/' + PatchTag + '/maintenancewindow/cutoff';


    let j11 = await ssm.getParameter(params_mw_cutoff).promise();

    mWCutoff = j11.Parameter.Value;
    mWCutoff = JSON.stringify(mWCutoff);
    mWCutoff = mWCutoff.replace(/"/g, "");
    console.log("\n" + mWCutoff + "\n");

    //Getting maintenance Window Target Owner Information from the Parameter store 

    var params_mw_owner_info = {
        Name: '/patch/maintenancewindow/targetownerinfo',
        WithDecryption: false
    };

    params_mw_owner_info.Name = '/patch/' + PatchTag + '/maintenancewindow/targetownerinfo';


    let j12 = await ssm.getParameter(params_mw_owner_info).promise();

    targetOwnerInformation = j12.Parameter.Value;
    targetOwnerInformation = JSON.stringify(targetOwnerInformation);
    targetOwnerInformation = targetOwnerInformation.replace(/"/g, "");
    console.log("\n" + targetOwnerInformation + "\n");

    //Getting maintenance Window Task Information from the Parameter store 

    var params_mw_task = {
        Name: '/patch/maintenancewindow/task',
        WithDecryption: false
    };

    params_mw_task.Name = '/patch/' + PatchTag + '/maintenancewindow/task';


    let j13 = await ssm.getParameter(params_mw_task).promise();

    task = j13.Parameter.Value;
    task = JSON.stringify(task);
    task = task.replace(/"/g, "");
    console.log("\n" + task + "\n");

    //Getting maintenance Window Service Role ARN from the Parameter store 

    var params_mw_service_role_arn = {
        Name: '/patch/maintenancewindow/servicerolearn',
        WithDecryption: false
    };

    params_mw_service_role_arn.Name = '/patch/' + PatchTag + '/maintenancewindow/servicerolearn';


    let j14 = await ssm.getParameter(params_mw_service_role_arn).promise();

    serviceRoleARN = j14.Parameter.Value;
    serviceRoleARN = JSON.stringify(serviceRoleARN);
    serviceRoleARN = serviceRoleARN.replace(/"/g, "");
    console.log("\n" + serviceRoleARN + "\n");


    //Getting Region from the Parameter store 

    var params_region = {
        Name: '/patch/region',
        WithDecryption: false
    };

    params_region.Name = '/patch/' + PatchTag + '/region';


    let j15 = await ssm.getParameter(params_region).promise();

    region = j15.Parameter.Value;
    region = JSON.stringify(region);
    region = region.replace(/"/g, "");
    console.log("\n" + region + "\n");


    // AWS Configure Region

    var params = {
        region: 'abc'
    };
    region = "" + region;
    params.region = region;

    let j16 = await AWS.config.update(params);
    //.promise();

    // Creating patch baseline

    let params_create_baseline = {
        Name: 'null',
        /* required */
        ApprovalRules: {
            PatchRules: [ /* required */ {
                    ApproveAfterDays: 7,
                    /* required */
                    PatchFilterGroup: { /* required */
                        PatchFilters: [ /* required */ {
                                Key: 'SEVERITY',
                                /* required */
                                Values: [ /* required */
                                    'Critical',
                                    /* more items */
                                ]
                            },
                            {
                                Key: 'CLASSIFICATION',
                                /* required */
                                Values: [ /* required */
                                    'Security',
                                    /* more items */
                                ]
                            }
                            /* more items */
                        ]
                    },
                    EnableNonSecurity: false
                },
                /* more items */
            ]
        },
        GlobalFilters: {
            PatchFilters: [ /* required */ {
                    Key: 'SEVERITY',
                    /* required */
                    Values: [ /* required */
                        'Critical',
                        /* more items */
                    ]
                },
                {
                    Key: 'CLASSIFICATION',
                    /* required */
                    Values: [ /* required */
                        'Security',
                        /* more items */
                    ]
                }
            ]
        },
        OperatingSystem: 'AMAZON_LINUX',
        Tags: [{
                Key: 'Name',
                /* required */
                Value: 'parameter' /* required */
            },
            /* more items */
        ]
    };

    params_create_baseline.Name = "" + baselineName;
    params_create_baseline.ApprovalRules.PatchRules[0].ApproveAfterDays = Number(approveAfterDays);
    params_create_baseline.ApprovalRules.PatchRules[0].PatchFilterGroup.PatchFilters[0].Values[0] = "" + severity;
    params_create_baseline.ApprovalRules.PatchRules[0].PatchFilterGroup.PatchFilters[1].Values[0] = "" + classification;
    params_create_baseline.GlobalFilters.PatchFilters[0].Values[0] = "" + severity;
    params_create_baseline.GlobalFilters.PatchFilters[1].Values[0] = "" + classification;
    params_create_baseline.OperatingSystem = "" + patchingOS;





    let j17 = await ssm.createPatchBaseline(params_create_baseline).promise();

    let baselineId = j17.BaselineId;
    console.log("\n" + j17);

    // Registering Patch Group with Baseline

    let params_register_patch_group = {
        BaselineId: 'null',
        PatchGroup: 'P'
    };
    params_register_patch_group.BaselineId = "" + baselineId;
    params_register_patch_group.PatchGroup = "" + patchGroup;
    let j18 = await ssm.registerPatchBaselineForPatchGroup(params_register_patch_group).promise();
    console.log("\n" + j18);


    //Create Maintenance Window

    let params_create_mw = {
        AllowUnassociatedTargets: true,
        /* required */
        Cutoff: 'NUMBER_VALUE',
        /* required */
        Duration: 'NUMBER_VALUE',
        /* required */
        Name: 'STRING_VALUE',
        /* required */
        Schedule: 'STRING_VALUE',
        /* required */
        Description: 'STRING_VALUE',
        Tags: [{
                Key: 'STRING_VALUE',
                /* required */
                Value: 'STRING_VALUE' /* required */
            },
            /* more items */
        ]
    };

    params_create_mw.Cutoff = Number(mWCutoff);
    params_create_mw.Duration = Number(mWDuration);
    params_create_mw.Name = "" + maintenanceWindowName;
    params_create_mw.Schedule = "" + mWSchedule;
    //params.ScheduleTimezone = "UTC";
    let j19 = await ssm.createMaintenanceWindow(params_create_mw).promise();


    console.log("\n" + j19);
    maintenanceWindowId = j19.WindowId;
    maintenanceWindowId = JSON.stringify(maintenanceWindowId);
    maintenanceWindowId = maintenanceWindowId.replace(/"/g, "");


    // Register Targets with maintenance window

    var params_register_targets = {
        ResourceType: 'INSTANCE',
        /* required */
        Targets: [ /* required */ {
                Key: 'tag:Patch Group',
                Values: [
                    'STRING_VALUE',
                    /* more items */
                ]
            },
            /* more items */
        ],
        WindowId: 'STRING_VALUE',
        /* required */
        Description: 'STRING_VALUE',
        Name: 'STRING_VALUE',
        OwnerInformation: 'STRING_VALUE'
    };
    params_register_targets.Targets[0].Values[0] = "" + patchGroup;
    params_register_targets.WindowId = "" + maintenanceWindowId;
    params_register_targets.OwnerInformation = "" + targetOwnerInformation;
    let j20 = await ssm.registerTargetWithMaintenanceWindow(params_register_targets).promise();

    console.log("\n" + j20);
    windowTargetId = j20.WindowTargetId;
    windowTargetId = JSON.stringify(windowTargetId);
    windowTargetId = windowTargetId.replace(/'/g, "");





    // Register Tasks With Maintenance Window

    var params_register_task = {
        MaxConcurrency: '2',
        /* required */
        MaxErrors: '1',
        /* required */
        Targets: [ /* required */ {
                Key: 'WindowTargetIds',
                Values: [
                    'STRING_VALUE'
                    /* more items */
                ]
            },
            /* more items */
        ],
        TaskArn: 'AWS-RunPatchBaseline',
        /* required */
        TaskType: 'RUN_COMMAND',
        /* required */
        WindowId: 'STRING_VALUE',
        /* required */
        Name: 'RunPatchBaseLine',
        Priority: '1',
        ServiceRoleArn: null,

        TaskInvocationParameters: {
            RunCommand: {
                Parameters: {
                    Operation: [
                        'INSTALL',

                    ],
                    RebootOption: [
                        'RebootIfNeeded',
                    ],
                },
                TimeoutSeconds: 600

            }
        }
    };
    /* '<MaintenanceWindowTaskParameterName>': ... */
    //}*/


    params_register_task.Targets[0].Values[0] = "" + windowTargetId;
    params_register_task.WindowId = "" + maintenanceWindowId;
    //params.TaskParameters.Values[0] = "" + task;
    params_register_task.TaskInvocationParameters.RunCommand.Parameters.Operation[0] = "" + task;

    let j21 = await ssm.registerTaskWithMaintenanceWindow(params_register_task).promise();
    console.log("Successful--", j21);


    // Deleting all the parameters from the parameter store

    /* var params_delete_parameter = {
    Names: '0',
};

params_delete_parameter.Name = '/patch/' + PatchTag + '/baseline/name';;


let j22 = await ssm.deleteParameters(params_delete_parameter).promise();
console.log("----j22", j22);

params_delete_parameter.Name = '/patch/' + PatchTag + '/baseline/OS';;


let j23 = await ssm.deleteParameters(params_delete_parameter).promise();
console.log("----j22", j23);

params_delete_parameter.Name = '/patch/' + PatchTag + '/baseline/severity';

let j24 = await ssm.deleteParameters(params_delete_parameter).promise();
console.log("----j22", j24);*/



    //Patching Process Initiation end
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body: '<html><h1 style="text-align: center"><b>Thanks for the confirmation</b></h1><br><h2 style="text-align: center"><b>The patching process has been initiated</b></h2><br><h5 style="text-align: center"><i>Do not click the link twice or reload the page, the effect will remain same, no changes will take place <br> (you may see this same message but internally the changes will not take place twice)</i></h5></html>'
        //JSON.stringify('Thanks for the confirmation!'),
    };
    return response;
};
