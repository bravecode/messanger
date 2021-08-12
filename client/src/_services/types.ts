/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface TypesAccessResponse {
  token: string;
}

export interface TypesAuthResponse {
  auth: TypesAccessResponse;
  user: TypesUserResponse;
}

export interface TypesErrorResponse {
  errors?: string[];
}

export interface TypesLoginDTO {
  email: string;
  password: string;
}

export interface TypesRegisterDTO {
  email: string;
  password: string;
  username: string;
}

export interface TypesRelationshipResponse {
  friends: TypesRelationshipResponseItem[];
  incoming_requests: TypesRelationshipResponseItem[];
  outgoing_requests: TypesRelationshipResponseItem[];
}

export interface TypesRelationshipResponseItem {
  id: number;
  online?: boolean;
  user_id: number;
  username: string;
}

export interface TypesUserResponse {
  email: string;
  id: number;
  username: string;
}
