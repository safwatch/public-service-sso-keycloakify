/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Text, render } from "jsx-email";
import { EmailLayout } from "../layout";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "public-service-sso"
};

export const templateName = "Identity Provider Link";

const { exp } = createVariablesHelper("identity-provider-link.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={`Seseorang ingin menghubungkan akun Anda`} locale={locale}>
        <Text style={paragraph}>
            Seseorang ingin menghubungkan akun <b>{exp("realmName")}</b> Anda dengan{" "}
            <b>{exp("identityProviderDisplayName")}</b> akun pengguna{" "}
            {exp("identityProviderContext.username")}. Jika ini anda, klik tautan di bawah
            ini untuk menghubungkan akun
        </Text>
        <Text style={paragraph}>
            <a href={exp("link")}>Tautan untuk mengonfirmasi penautan akun</a>
        </Text>
        <Text style={paragraph}>
            Jika Anda tidak ingin menautkan akun, abaikan saja pesan ini. Jika Anda
            menautkan akun, Anda akan dapat masuk ke {exp("realmName")} melalui{" "}
            {exp("identityProviderDisplayName")}.
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Konfirmasi penautan akun Anda";
};
