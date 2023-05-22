module.exports = {
    post: {
        tags: ["Authentication"], // operation's tag
        description: "Login User", // short desc
        operationId: "login", // unique operation id
        parameters: [], // expected params
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/login", // todo input data model
              },
            },
          },
        },
        "responses": {
          "200": {
            "description": "Login Successful",
            "schema": {
              "type": "object",
              "properties": {
                "success": {
                  "type": "boolean"
                },
                "token": {
                    "type": "string"
                  }
              }
            }
          },
          "400": {
            "description": "Login Failed",
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