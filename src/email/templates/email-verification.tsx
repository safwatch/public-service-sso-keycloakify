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

export const templateName = "Email Verification";

const { exp } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={`Proses verifikasi Civic Portal`} locale={locale}>
        <Text style={paragraph}>
            Seseorang telah membuat akun {exp("user.firstName")} dengan alamat email ini.
            Jika ini Anda, klik tautan di bawah ini untuk memverifikasi alamat email Anda.
        </Text>
        <Text style={paragraph}>
            <a href={exp("link")}>Tautan untuk verifikasi alamat email</a>
        </Text>
        <Text style={paragraph}>
            Jika Anda tidak membuat akun ini, cukup abaikan pesan ini.
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Verifikasi Email";
};
