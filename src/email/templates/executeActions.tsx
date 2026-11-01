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

export const templateName = "Execute Actions";

const { exp } = createVariablesHelper("executeActions.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        preview={`Administrator melakukan tindakan ke Akun anda`}
        locale={locale}
    >
        <Text style={paragraph}>
            Admin Civic Portal baru saja meminta Anda memperbarui data{exp("realmName")} Anda
            dengan melakukan tindakan berikut: &nbsp;
            <code style={code}>
                {exp(
                    "(requiredActions?has_content)?then(msg('requiredAction.' + requiredActions[0]), 'Verifikasi Email')"
                )}
            </code>
        </Text>
        <Text style={paragraph}>Klik tautan di bawah untuk memulai proses ini.</Text>
        <Text style={paragraph}>
            <Button
                backgroundColor="#28a745"
                textColor="#fff"
                width={220}
                height={38}
                borderRadius={4}
                align="center"
                href={exp("link")}
            >
                Tautan ke pembaruan akun
            </Button>
        </Text>
        <Text style={paragraph}>
            Jika Anda tidak mengetahui bahwa administrator Anda telah meminta hal ini,
            abaikan saja pesan ini dan tidak ada yang akan berubah.
        </Text>
    </EmailLayout>
);
export const getTemplate: GetTemplate = async props => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async _props => {
    return "Civic Portal - Perbaruan akun Anda";
};
