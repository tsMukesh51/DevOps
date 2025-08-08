import { AutoScalingClient, SetDesiredCapacityCommand, DescribeAutoScalingInstancesCommand, TerminateInstanceInAutoScalingGroupCommand } from "@aws-sdk/client-auto-scaling";
import { DescribeInstancesCommand, EC2Client } from "@aws-sdk/client-ec2";
import express from "express";
// const { EC2Client, DescribeInstancesCommand } = require("@aws-sdk/client-ec2");

interface Machine {
  ip: string;
  project: string | null;
}

const autoScaleClient = new AutoScalingClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_AUTOSCALER_KEY!,
    secretAccessKey: process.env.AWS_AUTOSCALER_SECRET!
  }
});
const ec2Client = new EC2Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_ACCESS_SECRET!,
  }
});

const app = express();

async function setDesiredInstance(instanceNum: number) {
  const command = new SetDesiredCapacityCommand({
    AutoScalingGroupName: "coder-server-autoscaling",
    DesiredCapacity: instanceNum
  });
  const data = await autoScaleClient.send(command);
  if (data.$metadata.httpStatusCode == 200)
    return true;
  return false;
}

async function refershInstances() {
  const command = new DescribeAutoScalingInstancesCommand();
  const data = await autoScaleClient.send(command);

  if (data.AutoScalingInstances?.length) {
    const ec2InstanceCommand = new DescribeInstancesCommand({
      InstanceIds: data.AutoScalingInstances?.map(x => x.InstanceId)
    });

    const ec2Response = await ec2Client.send(ec2InstanceCommand);
    // console.log(JSON.stringify(ec2Response.Reservations[0].Instances[0].PublicDnsName))
  }
  // TODO: Enrich the ALL_MACHINES array with the new instances, and remove the instances that have died
}

refershInstances();

setInterval(() => {
  refershInstances();
}, 10 * 1000);

const ALL_MACHINES: Machine[] = [];

app.get("/:projectId", (req, res) => {
  const idleMachine = ALL_MACHINES.find(x => x.project === null);
  if (!idleMachine) {
    // scale up the infrasturcture
    res.status(404).send("No idle machine found");
    return;
  }

  idleMachine.project = req.params.projectId;
  // scale up the infrasturcture

  const requiredInstance = ALL_MACHINES.length + (5 - ALL_MACHINES.filter(x => x.project === null).length);
  setDesiredInstance(requiredInstance);

  res.send({
    ip: idleMachine.ip
  });
})

app.post("/destroy", (req, res) => {
  const machineId: string = req.body.machineId;

  const command = new TerminateInstanceInAutoScalingGroupCommand({
    InstanceId: machineId,
    ShouldDecrementDesiredCapacity: true
  })

  autoScaleClient.send(command);
})

app.listen(3000);
