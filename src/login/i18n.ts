/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            cookieNotFoundMessage:
                "Kuki (Cookie) tidak ditemukan. Pastikan kuki (cookie) di peramban diaktifkan.",
            doLogIn: "Masuk",
            pageNotFound: "Halaman tidak ditemukan",
            internalServerError: "Telah terjadi kesalahan server internal",
            noAccount: "Pengguna Baru?",
            doRegister: "Daftar Disini",
            registerTitle: "Daftar",
            loginAccountTitle: "Masuk dengan akun Anda",
            accountDisabledMessage: "Akun telah dikunci, harap hubungi admin.",
            accountUpdatedMessage: "Aksi berhasil dilakukan. Akun anda telah berhasil diperbaharui.",
            accountPasswordUpdatedMessage: "Kata sandi anda telah diupdate",
            accountTemporarilyDisabledMessage:
                "Akun untuk sementara dikunci, harap hubungi admin atau coba beberapa saat lagi.",
            loginTitle: "Masuk ke {0}",
            loginTitleHtml: "{0}",
            usernameOrEmail: "NIP",
            loginTotpIntro:
                "Anda perlu menyiapkan One Time Password (OTP) Generator untuk mengakses akun ini.",
            loginTotpStep1:
                "Silahkan instal salah satu aplikasi berikut di smartphone Anda:",
            loginTotpStep2:
                "Kemudian buka aplikasi yang telah Anda install dan scan barcode berikut:",
            loginTotpUnableToScan: "Gagal saat scan? Klik disini.",
            loginTotpStep3:
                "Klik tombol selanjutnya dibawah kemudian masukkan kode OTP yang tersedia dari aplikasi tersebut dan klik kirim untuk menyelesaikan pengaturan.",
            loginTotpStep3DeviceName:
                "Tambahkan nama perangkat untuk melakukan manage terhadap OTP Anda.",
            loginTimeout: "Sesi percobaan login telah berakhir. Silahkan login kembali.",
            alreadyLoggedIn: "Anda sudah login sebelumnya.",
            differentUserAuthenticated:
                "Anda sudah login sebagai pengguna lain ''{0}'' di sesi masuk ini. Silahkan keluar (logout) terlebih dahulu.",
            errorTitle: "Mohon maaf terjadi kesalahan...",
            errorTitleHtml: "Mohon maaf <strong>terjadi kesalahan</strong> ...",
            authenticatorCode: "Kode OTP",
            loginTotpDeviceName: "Nama Perangkat",
            invalidCodeMessage:
                "Terjadi kesalahan, silakan coba kembali beberapa saat lagi.",
            expiredCodeMessage: "Login sesi berakhir (Timeout). Dimohon login kembali.",
            expiredActionMessage:
                "Aksi sudah Masa berlaku telah berakhir. Silakan login kembali seakrang.",
            expiredActionTokenNoSessionMessage: "Masa berlaku telah berakhir (Expired).",
            expiredActionTokenSessionExistsMessage:
                "Masa berlaku Aksi telah berakhir (Expired). Coba lagi.",
            sessionLimitExceeded: "There are too many sessions",
            doSubmit: "Kirim",
            loginCredential: "Kredensial",
            loginOtpOneTime: "Kode OTP",
            configureTotpMessage:
                "Anda harus melakukan pengaturan Mobile Authenticator untuk mengaktifasi akun Anda.",
            configureBackupCodesMessage:
                "Anda harus melakukan pengaturan Backup Code untuk mengaktifasi akun Anda.",
            oauthGrantRequest: "Apakah anda yakin akan mengizinkan hak akses berikut?",
            doYes: "Ya",
            doNo: "Tidak",
            doContinue: "Lanjutkan",
            doIgnore: "Lewati",
            doAccept: "Setuju",
            doDecline: "Batalkan",
            doForgotPassword: "Lupa Password?",
            resetPasswordMessage: "Anda harus update password Anda",
            rememberMe: "Ingatkan Saya",
            invalidUserMessage: "NIP atau password salah!",
            invalidUsernameMessage: "NIP salah!",
            invalidPasswordMessage: "Password salah!",
            invalidPasswordExistingMessage: "Kata sandi yang ada tidak valid.",
            invalidPasswordBlacklistedMessage:
                "Kata sandi tidak valid: kata sandi tidak layak digunakan (blacklist).",
            invalidPasswordConfirmMessage: "Konfirmasi kata sandi tidak cocok",
            invalidTotpMessage: "Kode autentikator (OTP) tidak sesuai atau valid.",
            reauthenticate: "Harap autentikasi ulang untuk melanjutkan",
            restartLoginTooltip: "Bukan anda ? Login ulang",
            loginTotpTitle: "Pengaturan Autentikator",
            loginTotpManualStep2:
                "Buka aplikasi autentikator yang sudah diinstal dan masukkan kode berikut:",
            loginTotpManualStep3:
                "Gunakan nilai konfigurasi berikut jika aplikasi memungkinkan untuk mengaturnya:",
            logoutOtherSessions: "Logout dari perangkat lain",
            verifyEmailMessage:
                "Anda perlu memverifikasi alamat email untuk mengaktivasi akun.",
            emailVerifyInstruction1:
                "Email dengan instruksi untuk memverifikasi alamat email Anda telah dikirim ke alamat {0}.",
            emailVerifyInstruction2: "Belum menerima kode verifikasi di email Anda?",
            emailVerifyInstruction3: "untuk mengirim ulang email.",
            emailVerified: "Email terverifikasi",
            emailSentMessage: "Email instruksi telah dikirim. Silahkan cek email Anda.",
            emailSendErrorMessage: "Gagal mengirim email, coba lagi beberapa saat lagi.",
            emailInstruction:
                "Masukan NIP Anda dan kami akan kirimkan email instruksi dalam pembuatan password baru.",
            emailInstructionUsername:
                "Masukan NIP Anda dan kami kirimkan instruksi untuk pembuatan password baru.",
            oauthGrantTitle: "Berikan akses ke {0}",
            oauthGrantTitleHtml: "{0}",
            oauthGrantInformation:
                "Pastikan Anda memercayai {0} dengan mempelajari bagaimana {0} akan menangani data Anda.",
            doClickHere: "Klik disini",
            backToLogin: "Kembali ke halaman login",
            username: "NIP",
            passwordNew: "Password Baru",
            passwordConfirm: "Konfirmasi Password",
            backToApplication: "Kembali ke Aplikasi",
            emailForgotTitle: "Lupa Password Anda?",
            updatePasswordTitle: "Perbarui Password",
            "requiredAction.UPDATE_PASSWORD": "Perbarui Password",
            "requiredAction.VERIFY_EMAIL": "Verifikasi Email",
            "requiredAction.CONFIGURE_TOTP": "Setting OTP",
            "requiredAction.UPDATE_PROFILE": "Update Profil",
            "requiredAction.TERMS_AND_CONDITIONS": "Paham & menerima Kebijakan dan Kondisi",
            loginActionRequired: "Update akun diperlukan",
            performFollowingActions: "Silakan lakukan aksi berikut:",
            infoTitle: "Informasi - {0}",
            infoMessage: "Aksi yang dilakukan berhasil.",
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
