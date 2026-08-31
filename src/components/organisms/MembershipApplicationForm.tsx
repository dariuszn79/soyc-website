"use client";

import type {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import { useState } from "react";
import { Overline } from "@/components/atoms/Overline";
import type {
  MembershipApplicationContent,
  MembershipType,
} from "@/data/types/membership-application";

type FormValues = {
  membershipType: MembershipType;
  dateOfBirth: string;
  primaryMember: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  postcode: string;
  address: string;
  city: string;
  hasQualifications: boolean;
  hasExperience: boolean;
  experienceDetails: string;
  qualifications: string[];
  otherQualifications: string;
  emergencyName: string;
  emergencySurname: string;
  emergencyPhone: string;
  relationship: string;
  emergencyPostcode: string;
  emergencyAddress: string;
  emergencyCity: string;
  healthDeclaration: boolean;
  declaration: boolean;
  dataConsent: boolean;
  ageConsent: boolean;
  emailConsent: boolean;
  signature: string;
  signatureDate: string;
};

const inputClass =
  "h-14 w-full border border-[#e2e2e2] bg-brand-tertiary-100 px-3 py-2 font-gill text-body leading-body text-brand-ink placeholder:text-[#afafaf] transition-colors focus:border-brand-secondary-100 focus:outline-none focus:ring-1 focus:ring-brand-secondary-100";

const initialValues: FormValues = {
  membershipType: "single",
  dateOfBirth: "",
  primaryMember: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
  postcode: "",
  address: "",
  city: "",
  hasQualifications: false,
  hasExperience: false,
  experienceDetails: "",
  qualifications: [],
  otherQualifications: "",
  emergencyName: "",
  emergencySurname: "",
  emergencyPhone: "",
  relationship: "",
  emergencyPostcode: "",
  emergencyAddress: "",
  emergencyCity: "",
  healthDeclaration: false,
  declaration: false,
  dataConsent: false,
  ageConsent: false,
  emailConsent: false,
  signature: "",
  signatureDate: "",
};

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-1 pb-4 pt-3 text-brand-secondary-100">
      <h2 className="font-baskerville text-3xl italic leading-[40px] sm:text-heading-md">
        {children}
      </h2>
    </div>
  );
}

function Divider() {
  return <div className="my-3 h-px w-full bg-[#d9d9d9]" aria-hidden="true" />;
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5 px-3 py-2">
      <label className="font-gill text-base font-medium leading-[18px] text-brand-secondary-100">
        {label}
        {required && <span className="text-brand-primary-100">*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  onChange,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return <input {...props} onChange={onChange} className={`${inputClass} ${props.className ?? ""}`} />;
}

function TextArea({
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-28 w-full resize-y border border-[#e2e2e2] bg-brand-tertiary-100 px-3 py-2 font-gill text-body leading-body text-brand-ink placeholder:text-[#afafaf] transition-colors focus:border-brand-secondary-100 focus:outline-none focus:ring-1 focus:ring-brand-secondary-100 ${props.className ?? ""}`}
    />
  );
}

function CheckboxRow({
  checked,
  onChange,
  children,
  required = false,
  name,
}: {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
  required?: boolean;
  name: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border border-[#e2e2e2] bg-brand-tertiary-100 px-3 py-4 transition-colors has-[:checked]:border-brand-secondary-100">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className="mt-0.5 size-6 shrink-0 accent-brand-secondary-100"
      />
      <span className="font-gill text-body leading-body text-brand-ink">{children}</span>
    </label>
  );
}

function AddressLookup({
  postcode,
  onPostcodeChange,
  address,
  onAddressChange,
  city,
  onCityChange,
  required = false,
  status,
  prefix,
  onLookup,
  postcodeLabel,
  addressLabel,
  cityLabel,
  postcodePlaceholder,
  addressPlaceholder,
  cityPlaceholder,
  lookupButton,
}: {
  postcode: string;
  onPostcodeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  address: string;
  onAddressChange: (event: ChangeEvent<HTMLInputElement>) => void;
  city: string;
  onCityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  status: string;
  prefix: string;
  onLookup: () => void;
  postcodeLabel: string;
  addressLabel: string;
  cityLabel: string;
  postcodePlaceholder: string;
  addressPlaceholder: string;
  cityPlaceholder: string;
  lookupButton: string;
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
        <Field label={postcodeLabel} required={required}>
          <TextInput
            name={`${prefix}Postcode`}
            value={postcode}
            onChange={onPostcodeChange}
            placeholder={postcodePlaceholder}
            required={required}
          />
        </Field>
        <div className="flex items-end px-3 py-2">
          <button
            type="button"
            className="h-14 w-full border border-brand-secondary-100 px-6 py-3 font-button text-button leading-button tracking-button text-brand-secondary-100 transition-colors hover:bg-brand-secondary-100 hover:text-brand-tertiary-100"
            onClick={onLookup}
          >
            {lookupButton}
          </button>
        </div>
      </div>
      {status && (
        <p className="px-3 text-sm text-brand-secondary-100" role="status">
          {status}
        </p>
      )}
      <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
        <Field label={addressLabel} required={required}>
          <TextInput
            name={`${prefix}Address`}
            value={address}
            onChange={onAddressChange}
            placeholder={addressPlaceholder}
            required={required}
          />
        </Field>
        <Field label={cityLabel} required={required}>
          <TextInput
            name={`${prefix}City`}
            value={city}
            onChange={onCityChange}
            placeholder={cityPlaceholder}
            required={required}
          />
        </Field>
      </div>
    </>
  );
}

export function MembershipApplicationForm({ content }: { content: MembershipApplicationContent }) {
  const { form } = content;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [addressStatus, setAddressStatus] = useState("");
  const [emergencyAddressStatus, setEmergencyAddressStatus] = useState("");

  const updateText =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setSubmitted(false);
    };

  const updateBoolean =
    (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.checked }));
      setSubmitted(false);
    };

  const updateQualification = (qualification: string) => {
    setValues((current) => ({
      ...current,
      qualifications: current.qualifications.includes(qualification)
        ? current.qualifications.filter((item) => item !== qualification)
        : [...current.qualifications, qualification],
    }));
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      id="membership-application-form"
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-[960px] border border-[#e2e2e2] bg-brand-tertiary-100 p-5 sm:p-9"
    >
      <div className="flex flex-col items-start pb-6 pt-4">
        <h1 className="font-baskerville text-4xl leading-[1.08] text-brand-secondary-100 sm:text-[60px] sm:leading-[64px]">
          {form.title}
        </h1>
        <p className="font-gill text-body leading-body text-brand-ink">
          {form.intro} <span className="text-brand-primary-100">{form.requiredMarker}</span>
        </p>
      </div>

      <Divider />

      <section aria-labelledby="membership-type-heading">
        <SectionHeading>
          <span id="membership-type-heading">{form.membership.heading}</span>
        </SectionHeading>
        <p className="px-3 font-gill text-body leading-body text-brand-ink">
          {form.membership.description}
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 px-3 md:grid-cols-3">
          {form.membership.cards.map((card) => {
            const selected = values.membershipType === card.value;
            return (
              <label
                key={card.value}
                className={`flex min-h-[216px] cursor-pointer flex-col gap-6 overflow-hidden border p-6 transition-colors ${
                  selected
                    ? "border-brand-secondary-100 bg-brand-secondary-100 text-brand-tertiary-100"
                    : "border-[#e3e3e3] bg-brand-tertiary-100 text-brand-secondary-100 hover:border-brand-secondary-100"
                }`}
              >
                <input
                  type="radio"
                  name="membershipType"
                  value={card.value}
                  checked={selected}
                  onChange={() =>
                    setValues((current) => ({ ...current, membershipType: card.value }))
                  }
                  className="sr-only"
                />
                <Overline size="lg" />
                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-baskerville text-2xl italic leading-[40px] sm:text-heading-sm">
                      {card.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className={`mt-1 size-6 shrink-0 rounded-full border-2 ${
                        selected
                          ? "border-brand-tertiary-100 bg-brand-tertiary-100 shadow-[inset_0_0_0_5px_rgb(38,46,188)]"
                          : "border-brand-secondary-100 bg-brand-tertiary-100"
                      }`}
                    />
                  </div>
                  <p className="font-gill text-body-sm leading-body-sm">{card.description}</p>
                </div>
              </label>
            );
          })}
        </div>

        <Divider />

        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          <Field label={form.membership.dateOfBirthLabel} required>
            <TextInput
              type="date"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={updateText("dateOfBirth")}
              required
            />
          </Field>
          <Field label={form.membership.primaryMemberLabel}>
            <TextInput
              name="primaryMember"
              value={values.primaryMember}
              onChange={updateText("primaryMember")}
              placeholder={form.membership.primaryMemberPlaceholder}
              required={values.membershipType !== "single"}
            />
          </Field>
        </div>
      </section>

      <Divider />

      <section aria-labelledby="sailing-experience-heading">
        <SectionHeading>
          <span id="sailing-experience-heading">{form.sailingExperience.heading}</span>
        </SectionHeading>
        <p className="px-3 font-gill text-body leading-body text-brand-ink">
          {form.sailingExperience.description}
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 px-3 sm:grid-cols-2">
          <CheckboxRow
            name="hasQualifications"
            checked={values.hasQualifications}
            onChange={updateBoolean("hasQualifications")}
          >
            {form.sailingExperience.qualificationsToggle}
          </CheckboxRow>
          <CheckboxRow
            name="hasExperience"
            checked={values.hasExperience}
            onChange={updateBoolean("hasExperience")}
          >
            {form.sailingExperience.experienceToggle}
          </CheckboxRow>
        </div>
        <Field label={form.sailingExperience.experienceLabel}>
          <TextArea
            name="experienceDetails"
            value={values.experienceDetails}
            onChange={updateText("experienceDetails")}
            placeholder={form.sailingExperience.experiencePlaceholder}
          />
        </Field>
        <p className="px-3 pt-2 font-gill text-base font-medium leading-[18px] text-brand-secondary-100">
          {form.sailingExperience.qualificationsLabel}
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 px-3 sm:grid-cols-2">
          {form.sailingExperience.qualificationOptions.map((qualification) => (
            <CheckboxRow
              key={qualification}
              name={`qualification-${qualification}`}
              checked={values.qualifications.includes(qualification)}
              onChange={() => updateQualification(qualification)}
            >
              {qualification}
            </CheckboxRow>
          ))}
        </div>
        <Field label={form.sailingExperience.otherQualificationsLabel}>
          <TextArea
            name="otherQualifications"
            value={values.otherQualifications}
            onChange={updateText("otherQualifications")}
            placeholder={form.sailingExperience.otherQualificationsPlaceholder}
          />
        </Field>
      </section>

      <Divider />

      <section aria-labelledby="your-details-heading">
        <SectionHeading>
          <span id="your-details-heading">{form.personalDetails.heading}</span>
        </SectionHeading>
        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          <Field label={form.personalDetails.nameLabel} required>
            <TextInput
              name="name"
              value={values.name}
              onChange={updateText("name")}
              placeholder={form.personalDetails.namePlaceholder}
              required
            />
          </Field>
          <Field label={form.personalDetails.surnameLabel} required>
            <TextInput
              name="surname"
              value={values.surname}
              onChange={updateText("surname")}
              placeholder={form.personalDetails.surnamePlaceholder}
              required
            />
          </Field>
          <Field label={form.personalDetails.emailLabel} required>
            <TextInput
              type="email"
              name="email"
              value={values.email}
              onChange={updateText("email")}
              placeholder={form.personalDetails.emailPlaceholder}
              required
            />
          </Field>
          <Field label={form.personalDetails.phoneLabel} required>
            <TextInput
              type="tel"
              name="phone"
              value={values.phone}
              onChange={updateText("phone")}
              placeholder={form.personalDetails.phonePlaceholder}
              required
            />
          </Field>
        </div>
        <AddressLookup
          prefix="your"
          postcode={values.postcode}
          onPostcodeChange={updateText("postcode")}
          address={values.address}
          onAddressChange={updateText("address")}
          city={values.city}
          onCityChange={updateText("city")}
          required
          status={addressStatus}
          postcodeLabel={form.addressLookup.your.postcodeLabel}
          addressLabel={form.addressLookup.your.addressLabel}
          cityLabel={form.addressLookup.your.cityLabel}
          postcodePlaceholder={form.addressLookup.postcodePlaceholder}
          addressPlaceholder={form.addressLookup.addressPlaceholder}
          cityPlaceholder={form.addressLookup.cityPlaceholder}
          lookupButton={form.addressLookup.button}
          onLookup={() =>
            setAddressStatus(
              values.postcode
                ? form.addressLookup.your.lookupStatus
                : form.addressLookup.your.lookupEmptyStatus,
            )
          }
        />
      </section>

      <Divider />

      <section aria-labelledby="emergency-contact-heading">
        <SectionHeading>
          <span id="emergency-contact-heading">{form.emergencyContact.heading}</span>
        </SectionHeading>
        <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
          <Field label={form.emergencyContact.nameLabel} required>
            <TextInput
              name="emergencyName"
              value={values.emergencyName}
              onChange={updateText("emergencyName")}
              placeholder={form.emergencyContact.namePlaceholder}
              required
            />
          </Field>
          <Field label={form.emergencyContact.surnameLabel} required>
            <TextInput
              name="emergencySurname"
              value={values.emergencySurname}
              onChange={updateText("emergencySurname")}
              placeholder={form.emergencyContact.surnamePlaceholder}
              required
            />
          </Field>
          <Field label={form.emergencyContact.phoneLabel} required>
            <TextInput
              type="tel"
              name="emergencyPhone"
              value={values.emergencyPhone}
              onChange={updateText("emergencyPhone")}
              placeholder={form.emergencyContact.phonePlaceholder}
              required
            />
          </Field>
          <Field label={form.emergencyContact.relationshipLabel} required>
            <select
              name="relationship"
              value={values.relationship}
              onChange={updateText("relationship")}
              className={inputClass}
              required
            >
              <option value="">{form.emergencyContact.relationshipPlaceholder}</option>
              {form.emergencyContact.relationshipOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <AddressLookup
          prefix="emergency"
          postcode={values.emergencyPostcode}
          onPostcodeChange={updateText("emergencyPostcode")}
          address={values.emergencyAddress}
          onAddressChange={updateText("emergencyAddress")}
          city={values.emergencyCity}
          onCityChange={updateText("emergencyCity")}
          required
          status={emergencyAddressStatus}
          postcodeLabel={form.addressLookup.emergency.postcodeLabel}
          addressLabel={form.addressLookup.emergency.addressLabel}
          cityLabel={form.addressLookup.emergency.cityLabel}
          postcodePlaceholder={form.addressLookup.postcodePlaceholder}
          addressPlaceholder={form.addressLookup.addressPlaceholder}
          cityPlaceholder={form.addressLookup.cityPlaceholder}
          lookupButton={form.addressLookup.button}
          onLookup={() =>
            setEmergencyAddressStatus(
              values.emergencyPostcode
                ? form.addressLookup.emergency.lookupStatus
                : form.addressLookup.emergency.lookupEmptyStatus,
            )
          }
        />
      </section>

      <Divider />

      <section aria-labelledby="health-heading">
        <SectionHeading>
          <span id="health-heading">{form.health.heading}</span>
        </SectionHeading>
        <CheckboxRow
          name="healthDeclaration"
          checked={values.healthDeclaration}
          onChange={updateBoolean("healthDeclaration")}
          required
        >
          {form.health.declaration}
        </CheckboxRow>
      </section>

      <Divider />

      <section aria-labelledby="declaration-heading">
        <SectionHeading>
          <span id="declaration-heading">{form.declaration.heading}</span>
        </SectionHeading>
        <CheckboxRow
          name="declaration"
          checked={values.declaration}
          onChange={updateBoolean("declaration")}
          required
        >
          {form.declaration.declaration}
        </CheckboxRow>
      </section>

      <Divider />

      <section aria-labelledby="data-consent-heading">
        <SectionHeading>
          <span id="data-consent-heading">{form.dataConsent.heading}</span>
        </SectionHeading>
        <div className="flex flex-col gap-4 px-3 font-gill text-body leading-body text-brand-ink">
          {form.dataConsent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <CheckboxRow
            name="dataConsent"
            checked={values.dataConsent}
            onChange={updateBoolean("dataConsent")}
            required
          >
            {form.dataConsent.dataConsent}
          </CheckboxRow>
          <CheckboxRow
            name="ageConsent"
            checked={values.ageConsent}
            onChange={updateBoolean("ageConsent")}
            required
          >
            {form.dataConsent.ageConsent}
          </CheckboxRow>
          <CheckboxRow
            name="emailConsent"
            checked={values.emailConsent}
            onChange={updateBoolean("emailConsent")}
          >
            {form.dataConsent.emailConsent}
          </CheckboxRow>
        </div>
      </section>

      <Divider />

      <section aria-labelledby="membership-consent-heading">
        <SectionHeading>
          <span id="membership-consent-heading">{form.membershipConsent.heading}</span>
        </SectionHeading>
        <div className="flex flex-col gap-4">
          <p className="px-3 font-gill text-body font-semibold leading-body text-brand-ink">
            {form.membershipConsent.addressee}
          </p>
          <div className="px-3 font-gill text-body leading-body text-brand-ink">
            <p>{form.membershipConsent.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            <Field label={form.membershipConsent.signatureLabel} required>
              <TextInput
                name="signature"
                value={values.signature}
                onChange={updateText("signature")}
                placeholder={form.membershipConsent.signaturePlaceholder}
                required
              />
            </Field>
            <Field label={form.membershipConsent.dateLabel} required>
              <TextInput
                type="date"
                name="signatureDate"
                value={values.signatureDate}
                onChange={updateText("signatureDate")}
                required
              />
            </Field>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center justify-center gap-4 px-3 py-12">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center bg-brand-primary-100 px-6 py-3 font-button text-button leading-button tracking-button text-brand-tertiary-100 transition-colors hover:bg-brand-primary-hover"
        >
          {form.submitButton}
        </button>
        {submitted && (
          <p className="text-center font-gill text-body text-brand-secondary-100" role="status">
            {form.successMessage}
          </p>
        )}
      </div>
    </form>
  );
}