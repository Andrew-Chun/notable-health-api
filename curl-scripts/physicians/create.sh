#!/bin/bash

API="http://localhost:4741"
URL_PATH="/physicians"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "physician": {
      "name": "'"${NAME}"'",
      "email": "'"${EMAIL}"'"
    }
  }'

echo
