import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactInquiry {
    name: string;
    email: string;
    message: string;
    phone: string;
    marketInterest: IndustryType;
}
export enum IndustryType {
    all = "all",
    forex = "forex",
    crypto = "crypto",
    commodity = "commodity"
}
export interface backendInterface {
    getAllContacts(): Promise<Array<ContactInquiry>>;
    submitContactInquiry(name: string, email: string, phone: string, marketInterest: IndustryType, message: string): Promise<void>;
}
