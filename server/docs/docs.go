// GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag

package docs

import (
	"bytes"
	"encoding/json"
	"strings"

	"github.com/alecthomas/template"
	"github.com/swaggo/swag"
)

var doc = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{.Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/auth/login": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Access your account",
                "parameters": [
                    {
                        "description": "Login Data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/types.LoginDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/types.AuthResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    },
                    "404": {
                        "description": "Not Found",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/auth/profile": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Fetch info about signed in user",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/types.UserResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/auth/register": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Auth"
                ],
                "summary": "Create new account",
                "parameters": [
                    {
                        "description": "Register Data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/types.RegisterDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/types.AuthResponse"
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/relationship": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Relationship"
                ],
                "summary": "Get all relationships for signed in user.",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/types.RelationshipResponse"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    }
                }
            },
            "post": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Relationship"
                ],
                "summary": "Sends friend request to specified user.",
                "parameters": [
                    {
                        "description": "Invite Data",
                        "name": "data",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/types.RelationshipInviteDTO"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/types.RelationshipResponseItem"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/relationship/{id}/accept": {
            "get": {
                "tags": [
                    "Relationship"
                ],
                "summary": "Accept friend request.",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Relationship ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/relationship/{id}/decline": {
            "get": {
                "tags": [
                    "Relationship"
                ],
                "summary": "Decline friend request.",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Relationship ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": ""
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    }
                }
            }
        },
        "/users/search": {
            "get": {
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "Users"
                ],
                "summary": "Search for users with specified username.",
                "parameters": [
                    {
                        "minLength": 3,
                        "type": "string",
                        "description": "Username query value",
                        "name": "username",
                        "in": "query",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/types.UserSearchResponse"
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "schema": {
                            "$ref": "#/definitions/types.ErrorResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "types.AccessResponse": {
            "type": "object",
            "required": [
                "token"
            ],
            "properties": {
                "token": {
                    "type": "string"
                }
            }
        },
        "types.AuthResponse": {
            "type": "object",
            "required": [
                "auth",
                "user"
            ],
            "properties": {
                "auth": {
                    "$ref": "#/definitions/types.AccessResponse"
                },
                "user": {
                    "$ref": "#/definitions/types.UserResponse"
                }
            }
        },
        "types.ErrorResponse": {
            "type": "object",
            "properties": {
                "errors": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        },
        "types.LoginDTO": {
            "type": "object",
            "required": [
                "email",
                "password"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "types.RegisterDTO": {
            "type": "object",
            "required": [
                "email",
                "password",
                "username"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "types.RelationshipInviteDTO": {
            "type": "object",
            "properties": {
                "to": {
                    "type": "integer"
                }
            }
        },
        "types.RelationshipResponse": {
            "type": "object",
            "required": [
                "friends",
                "incoming_requests",
                "outgoing_requests"
            ],
            "properties": {
                "friends": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/types.RelationshipResponseItem"
                    }
                },
                "incoming_requests": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/types.RelationshipResponseItem"
                    }
                },
                "outgoing_requests": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/types.RelationshipResponseItem"
                    }
                }
            }
        },
        "types.RelationshipResponseItem": {
            "type": "object",
            "required": [
                "id",
                "user_id",
                "username"
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                "online": {
                    "type": "boolean"
                },
                "user_id": {
                    "type": "integer"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "types.UserResponse": {
            "type": "object",
            "required": [
                "email",
                "id",
                "username"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "types.UserSearchResponse": {
            "type": "object",
            "required": [
                "id",
                "username"
            ],
            "properties": {
                "id": {
                    "type": "integer"
                },
                "username": {
                    "type": "string"
                }
            }
        }
    },
    "securityDefinitions": {
        "ApiKeyAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}`

type swaggerInfo struct {
	Version     string
	Host        string
	BasePath    string
	Schemes     []string
	Title       string
	Description string
}

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = swaggerInfo{
	Version:     "1.0",
	Host:        "localhost:8000",
	BasePath:    "/",
	Schemes:     []string{},
	Title:       "Messanger API",
	Description: "Learning GO (with Fiber) by creating messanger copy.",
}

type s struct{}

func (s *s) ReadDoc() string {
	sInfo := SwaggerInfo
	sInfo.Description = strings.Replace(sInfo.Description, "\n", "\\n", -1)

	t, err := template.New("swagger_info").Funcs(template.FuncMap{
		"marshal": func(v interface{}) string {
			a, _ := json.Marshal(v)
			return string(a)
		},
	}).Parse(doc)
	if err != nil {
		return doc
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, sInfo); err != nil {
		return doc
	}

	return tpl.String()
}

func init() {
	swag.Register(swag.Name, &s{})
}
