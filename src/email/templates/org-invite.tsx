/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable react-refresh/only-export-components */
import { render, Text } from "jsx-email";
import { EmailLayout } from "../layout";
import * as Fm from "keycloakify-emails/jsx-email";
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

export const templateName = "Org Invite";

const { exp, v } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout preview={`Tautan undangan unuk masuk Civic Portal`} locale={locale}>
        <Text style={paragraph}>
            <Fm.If condition={`${v("firstName")}?? && ${v("lastName")}??`}>
                    Hai, {exp("firstName")} {exp("lastName")}.
            </Fm.If>
        </Text>

        <Text style={paragraph}>
            Anda diundang untuk bergabung dengan organisasi {exp("organization.name")}.
            Klik tautan di bawah ini untuk bergabung.{" "}
        </Text>
        <Text style={paragraph}>
            <a href={exp("link")}>Tautan untuk bergabung dengan organisasi</a>
        </Text>
        <Text style={paragraph}>
            Jika Anda tidak ingin bergabung dengan organisasi ini, cukup abaikan pesan
            ini.
        </Text>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Undangan masuk Civic Portal";
};
