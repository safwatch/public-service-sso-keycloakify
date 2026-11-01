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

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "public-service-sso"
};

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={"Pesan ini merupakan untuk tujuan tes"} locale={locale}>
        <Text style={{ ...paragraph, marginTop: "30px" }}>
            Ini hanya sebuah pesan uji coba dari Keycloak {exp("realmName")}
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Test Pesan";
};
