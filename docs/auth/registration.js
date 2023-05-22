module.exports = {
    post: {
        tags: ["Authentication"], // operation's tag
        description: "Register User", // short desc
        operationId: "register", // unique operation id
        parameters: [], // expected params
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/reg", // todo input data model
              },
            },
          },
        },
        "responses": {
          "200": {
            "description": "Registration Successful",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                }
              }
            }
          },
          "400": {
            "description": "Registration Failed",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                }
              }
            }
          }
        }
      },
}