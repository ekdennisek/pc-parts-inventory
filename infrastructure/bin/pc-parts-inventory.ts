#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PcPartsInventoryStack } from "../lib/pc-parts-inventory-stack";

const app = new cdk.App();
new PcPartsInventoryStack(app, "PcPartsInventoryStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  domainName: process.env.DOMAIN_NAME as string,
});
