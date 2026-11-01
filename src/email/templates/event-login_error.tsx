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
    fontWeight: "700",
    padding: "1px 4px",
    backgroundColor: "#dfe1e4",
    fontSize: "16px",
    borderRadius: "4px",
    color: "#3c4149"
};

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "public-service-sso"
};

export const templateName = "Event Login Error";

const { exp } = createVariablesHelper("event-login_error.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={"Terdapat percobaan masuk ke akun Anda"} locale={locale}>
        <Text style={{ ...paragraph, marginTop: "30px" }}>
            Upaya gagal login terdeteksi melalui akun Anda pada{" "}
            <code style={code}>
                {exp(`event.date?datetime?string("dd-MM-yyyy HH:mm 'WIB'")`)}
            </code>{" "}
            dari IP : <code style={code}>{exp("event.ipAddress")}</code>. Jika bukan anda,
            hubungi admin.
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Percobaan masuk gagal civic-portal";
};
