API="http://localhost:4741"
URL_PATH="/shoppingCart"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "shoppingCart": {
      "item": "'"${ITEM}"'"
    }'

echo
