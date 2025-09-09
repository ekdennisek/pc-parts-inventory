import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53Targets from "aws-cdk-lib/aws-route53-targets";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import * as path from "node:path";

type Props = cdk.StackProps & {
  domainName: string;
};

export class PcPartsInventoryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const subdomain = `ppi.${props.domainName}`;

    const frontendBucket = new s3.Bucket(this, "PPIBucket", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS_ONLY,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    new s3Deploy.BucketDeployment(this, "PPIBucketDeployment", {
      sources: [
        s3Deploy.Source.asset(
          path.join(__dirname, "..", "..", "frontend", "dist")
        ),
      ],
      destinationBucket: frontendBucket,
    });

    const hostedZone = route53.HostedZone.fromLookup(this, "PPIHostedZone", {
      domainName: props.domainName,
    });

    // Deprecated, but used so that region can be set to us-east-1
    const certificate = new acm.DnsValidatedCertificate(
      this,
      "PPICertificate",
      {
        domainName: props.domainName,
        subjectAlternativeNames: [`*.${props.domainName}`],
        hostedZone,
        region: "us-east-1",
      }
    );
    certificate.applyRemovalPolicy(cdk.RemovalPolicy.DESTROY);

    const distribution = new cloudfront.Distribution(this, "PPIDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin:
          cloudfrontOrigins.S3BucketOrigin.withOriginAccessControl(
            frontendBucket
          ),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
      },
      certificate,
      domainNames: [subdomain],
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    new route53.ARecord(this, "PPIAliasRecord", {
      zone: hostedZone,
      recordName: subdomain,
      target: route53.RecordTarget.fromAlias(
        new route53Targets.CloudFrontTarget(distribution)
      ),
    });
  }
}
