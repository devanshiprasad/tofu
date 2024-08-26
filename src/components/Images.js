
export const getImageUrl = (imageName) => {
    const bucketName = 'tofu-imagesa8f07-dev'; // No spaces in the bucket name
    return `https://${bucketName}.s3.amazonaws.com/${imageName}`;
  };
