curl 'http://localhost:4741/appointments' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "appointment": {
      "name": "'"${NAME}"'",
      "time": "'"${TIME}"'",
      "kind": "'"${KIND}"'",
      "physicianId": "'"${ID}"'"
    }
  }'
