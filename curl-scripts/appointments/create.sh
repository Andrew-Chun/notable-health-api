API="http://localhost:4741"
URL_PATH="/physicians"

curl "${API}${URL_PATH}/${ID}/appointments" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "appointment": {
      "name": "'"${NAME}"'",
      "time": "'"${TIME}"'",
      "kind": "'"${KIND}"'",
      "physician": "'"${PHYSICIAN_ID}"'"
    }
  }'

echo
