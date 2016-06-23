# This script can be used to zip and upload code to AWS.
# You will need to install and configure AWS CLI first.
# Refer to https://aws.amazon.com/cli

# Create archive if it doesn't already exist
# Generally not need, and just a refresh is performed
if [ ! -f ./Archive.zip ];
then
  echo "Initial Archive.zip file needs to be created"
  # TODO
fi

# Update and upload new archive
if [ -f ./Archive.zip ];
then
  echo "Updating archive"
  zip -f Archive.zip index.js
  echo "Uploading Archive.zip to AWS Lambda";
  aws lambda update-function-code --function-name helloWorld --zip-file fileb://Archive.zip
else
  echo "Archive.zip not found. This script only updates it.";
fi
