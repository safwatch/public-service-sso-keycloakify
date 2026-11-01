/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable react-refresh/only-export-components */
import { render, Text } from "jsx-email";
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

export const templateName = "Email Update Confirmation";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={`Pembaharuan email untuk tetap akses Civic Portal`}
        locale={locale}
    >
        <Text style={paragraph}>
            Untuk memperbarui akun {exp("realmName")} Anda dengan alamat email{" "}
            {exp("newEmail")}, klik tautan di bawah ini.
        </Text>
        <Text style={paragraph}>
            <a href={exp("link")}>{exp("link")}</a>
        </Text>
        <Text style={paragraph}>
            Jika Anda tidak ingin melanjutkan perubahan ini, cukup abaikan pesan ini.
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Verifikasi email anda";
};
