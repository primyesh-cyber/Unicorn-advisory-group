import Array "mo:core/Array";
import List "mo:core/List";

actor {
  let contacts = List.empty<ContactInquiry>();

  type ContactInquiry = {
    name : Text;
    email : Text;
    phone : Text;
    marketInterest : IndustryType;
    message : Text;
  };

  type IndustryType = {
    #forex;
    #commodity;
    #crypto;
    #all;
  };

  public shared ({ caller }) func submitContactInquiry(name : Text, email : Text, phone : Text, marketInterest : IndustryType, message : Text) : async () {
    let inquiry : ContactInquiry = {
      name;
      email;
      phone;
      marketInterest;
      message;
    };

    contacts.add(inquiry);
  };

  public query ({ caller }) func getAllContacts() : async [ContactInquiry] {
    contacts.toArray();
  };
};
