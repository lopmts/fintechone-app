plugins {
    id("com.android.application")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
    // Removido: id("com.google.gms.google-services")
    // google_sign_in NÃO precisa disso — esse plugin é só pra produtos
    // Firebase (Analytics, Crashlytics, FCM...), que este app não usa.
    // O login com Google funciona só com o serverClientId (Web Client ID)
    // configurado em GoogleAuthService + o Android Client ID/SHA-1
    // registrados no Google Cloud Console — nenhum arquivo extra necessário
    // no repositório.
}

android {
    namespace = "com.lopmts.fintechone"
    compileSdk = 37
    ndkVersion = flutter.ndkVersion

    compileOptions {
        isCoreLibraryDesugaringEnabled = true
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.lopmts.fintechone"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = 24
        targetSdk = 37
        versionCode = flutter.versionCode
        versionName = flutter.versionName
        multiDexEnabled = true
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = signingConfigs.getByName("debug")
        }
    }
}

kotlin {
    jvmToolchain(17)
}

flutter {
    source = "../.."
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.1.4")
    // Removido: firebase-bom / firebase-analytics — não fazem parte do
    // fluxo de login com Google via `google_sign_in`. Se algum dia vocês
    // quiserem Analytics/Crashlytics/FCM de verdade, aí sim faz sentido
    // voltar com o plugin com.google.gms.google-services + o
    // google-services.json baixado do Firebase Console.
}