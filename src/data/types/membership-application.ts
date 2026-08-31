export type MembershipType = "single" | "family" | "child";

export interface MembershipApplicationContent {
  metadata: {
    title: string;
    description: string;
  };
  form: {
    title: string;
    intro: string;
    requiredMarker: string;
    membership: {
      heading: string;
      description: string;
      cards: Array<{
        value: MembershipType;
        title: string;
        description: string;
      }>;
      dateOfBirthLabel: string;
      primaryMemberLabel: string;
      primaryMemberPlaceholder: string;
    };
    sailingExperience: {
      heading: string;
      description: string;
      qualificationsToggle: string;
      experienceToggle: string;
      experienceLabel: string;
      experiencePlaceholder: string;
      qualificationsLabel: string;
      qualificationOptions: string[];
      otherQualificationsLabel: string;
      otherQualificationsPlaceholder: string;
    };
    personalDetails: {
      heading: string;
      nameLabel: string;
      namePlaceholder: string;
      surnameLabel: string;
      surnamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
    };
    emergencyContact: {
      heading: string;
      nameLabel: string;
      namePlaceholder: string;
      surnameLabel: string;
      surnamePlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      relationshipLabel: string;
      relationshipPlaceholder: string;
      relationshipOptions: Array<{ value: string; label: string }>;
    };
    addressLookup: {
      your: {
        postcodeLabel: string;
        addressLabel: string;
        cityLabel: string;
        lookupEmptyStatus: string;
        lookupStatus: string;
      };
      emergency: {
        postcodeLabel: string;
        addressLabel: string;
        cityLabel: string;
        lookupEmptyStatus: string;
        lookupStatus: string;
      };
      postcodePlaceholder: string;
      addressPlaceholder: string;
      cityPlaceholder: string;
      button: string;
    };
    health: {
      heading: string;
      declaration: string;
    };
    declaration: {
      heading: string;
      declaration: string;
    };
    dataConsent: {
      heading: string;
      paragraphs: string[];
      dataConsent: string;
      ageConsent: string;
      emailConsent: string;
    };
    membershipConsent: {
      heading: string;
      addressee: string;
      description: string;
      signatureLabel: string;
      signaturePlaceholder: string;
      dateLabel: string;
    };
    submitButton: string;
    successMessage: string;
  };
}