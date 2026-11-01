/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { render, Text } from "jsx-email";
import { EmailLayout } from "../layout";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

const paragraph = {
    color: "#777",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const
};

const code = {
    fontFamily: "monospace",
    fontWeight: "700",
    padding: "1px 4px",
    backgroundColor: "#dfe1e4",
    letterSpacing: "-0.3px",
    fontSize: "21px",
    borderRadius: "4px",
    color: "#3c4149"
};

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "public-service-sso"
};

export const templateName = "Email Verification With Code";

const { exp } = createVariablesHelper("email-verification-with-code.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={"Kode verifikasi untuk akun Portal Layanan Administrasi Public Service Administration"}
        locale={locale}
    >
        <Text style={{ ...paragraph, marginTop: "30px" }}>
            Silakan verifikasi alamat email Anda dengan memasukkan kode berikut.
        </Text>
        <code style={code}>{exp("code")}</code>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Kode verifikasi Akun Civic Portal";
};
