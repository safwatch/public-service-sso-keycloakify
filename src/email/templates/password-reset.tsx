/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { render, Text, Button } from "jsx-email";
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

export const templateName = "Password Reset";

const { exp } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={`Permintaan reset password di Civic Portal`} locale={locale}>
        <Text style={paragraph}>
            Seseorang baru saja meminta untuk mengubah kredensial (password) akun Anda{" "}
            {exp("realmName")}. Jika ini Anda, klik tautan di bawah ini untuk meresetnya.
        </Text>
        <Button
            backgroundColor="#28a745"
            textColor="#fff"
            width={220}
            height={38}
            borderRadius={4}
            align="center"
            href={exp("link")}
        >
            Reset password
        </Button>
        <Text style={paragraph}>
            Jika Anda tidak ingin mereset kredensial Anda, cukup abaikan pesan ini dan
            tidak akan ada perubahan apa pun.
        </Text>
    </EmailLayout>
);
export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Reset password";
};
