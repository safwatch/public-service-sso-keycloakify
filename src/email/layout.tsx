import { Body, Container, Head, Html, Preview, Section, Img, Hr, Text } from "jsx-email";
import type { PropsWithChildren, ReactNode } from "react";

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    marginBottom: "64px",
    padding: "20px 0 48px",
    border: "1px solid #f0f0f0",
    borderRadius: "10px"
};

const box = {
    padding: "0 48px"
};

const logo = {
    marginBottom: "12px",
    marginTop: "40px",
    paddingTop: "40px",
    paddingBottom: "20px"
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0"
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px"
};

export const EmailLayout = ({
    locale,
    children,
    preview
}: PropsWithChildren<{ preview: ReactNode; locale: string }>) => {
    return (
        <Html lang={locale}>
            <Head />
            <Preview>{preview}</Preview>
            <Body style={main}>
                <Container style={logo}>
                    <Img
                        src="https://raw.githubusercontent.com/safwatch/public-service-sso-keycloakify/main/src/assets/images/app-logo.png"
                        alt="Civic Portal"
                        width="260"
                        height="auto"
                    />
                </Container>
                <Container style={container}>
                    <Section style={box}>{children}</Section>
                </Container>
                <Container>
                    <Hr style={hr} />
                    <Text style={footer}>
                        Email ini adalah informasi yang dibuat secara otomatis, mohon
                        tidak membalas pesan ini.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};
