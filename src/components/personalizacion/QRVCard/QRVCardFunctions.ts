import type { VCardFormType } from "@types/vCardFormType";

export function cleanValues<T extends Record<string, string>>(data: T): T {
  return Object.fromEntries(
    Object.entries(data).map(([key, val]) => [key, (val || "").replace(/;/g, "")])
  ) as T;
}

export function buildVCard(data: VCardFormType): string {
  const t = cleanValues(data);
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    t.lastname || t.firstname ? `N:${t.lastname};${t.firstname}` : "",
    t.lastname || t.firstname ? `FN:${t.firstname} ${t.lastname}` : "",
    t.company ? `ORG:${t.company}` : "",
    t.job ? `TITLE:${t.job}` : "",
    `ADR:;;${[t.street, t.city, t.state, t.zip, t.country].join(";")}`,
    t.phoneNumber ? `TEL;WORK;VOICE:${t.phoneNumber}` : "",
    t.mobileNumber ? `TEL;CELL:${t.mobileNumber}` : "",
    t.faxNumber ? `TEL;FAX:${t.faxNumber}` : "",
    t.email ? `EMAIL;WORK;INTERNET:${t.email}` : "",
    t.website ? `URL:${t.website}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
}
