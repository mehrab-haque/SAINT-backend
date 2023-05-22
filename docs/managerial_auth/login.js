module.exports = {
    post: {
        tags: ["Managerial Authentication"], // operation's tag
        description: "Login Admin/Moderator", // short desc
        operationId: "managerialLogin", // unique operation id
        parameters: [], // expected params
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/managerial_login", // todo input data model
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