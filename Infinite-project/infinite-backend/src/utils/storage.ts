import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./logger";

export const uploadFileS3 = async (
  buffer: any,
  contentType: string,
  folder: string
) => {
  // Generate a UUID for the file name
  const fileName = uuidv4();

  // Extract the file extension from the content type
  const fileExtension = contentType.split("/")[1];

  // Initialize AWS S3 SDK
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const bucketName: string = "guilder";
  const key = folder
    ? `${folder}/${fileName}.${fileExtension}`
    : `${fileName}.${fileExtension}`; // Include folder path if provided

  const s3Upload = await s3
    .upload({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: "public-read",
    })
    .promise();

  return s3Upload.Location;
};

export const removeFileFromS3 = async (key: string) => {
  // Initialize AWS S3 SDK
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const bucketName: string = "guilder";

  // Specify the parameters for deleting the object
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  // Delete the object from S3
  await s3.deleteObject(params).promise();

  logger.info(`File ${key} deleted successfully from bucket ${bucketName}`);
};
