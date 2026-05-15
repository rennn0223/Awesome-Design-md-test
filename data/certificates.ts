import CERTS_DATA from "@/data/certificates.json";

export type CertType = "link" | "preview";

export interface Cert {
  tag: string;
  tagColor: string;
  title: string;
  en: string;
  zh: string;
  href?: string;
  image?: string;
  btnEn: string;
  btnZh: string;
  type: CertType;
  icon?: React.ReactNode;
}

export const CERTS: Cert[] = CERTS_DATA as Cert[];
