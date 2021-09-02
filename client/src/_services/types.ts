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

export interface TypesConversation {
  last_message?: string;
  relationship_id: number;
}

export interface TypesConversationMessage {
  author: boolean;
  content: string;
}

export interface TypesConversationMessageDTO {
  content: string;
  relationship_id: number;
}

export interface TypesConversationOpenDTO {
  relationship_id: number;
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

export interface TypesRelationshipInviteDTO {
  to: number;
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

export interface TypesSocketEvent {
  event: string;
}

export interface TypesSocketResponse {
  errors?: string[];
  success: boolean;
}

export interface TypesUserResponse {
  email: string;
  id: number;
  username: string;
}

export interface TypesUserSearchResponse {
  id: number;
  username: string;
}
