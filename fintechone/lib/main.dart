import 'package:fintechone/providers/app_providers.dart';
import 'package:fintechone/screens/auth/forgot_password_screen.dart';
import 'package:fintechone/screens/auth/login_screen.dart';
import 'package:fintechone/screens/auth/otp_request_screen.dart';
import 'package:fintechone/screens/auth/register_screen.dart';
import 'package:fintechone/screens/auth/reset_password_screen.dart';
import 'package:fintechone/screens/auth/verify_code_screen.dart';
import 'package:fintechone/screens/forms/account_form_screen.dart';
import 'package:fintechone/screens/profile_user.dart';
import 'package:fintechone/screens/settings/settings_screen.dart';
import 'package:fintechone/screens/settings/theme_settings_screen.dart';
import 'package:fintechone/theme/dynamic_color_wrapper.dart';
import 'package:fintechone/widgets/tabs_navegation.dart';
import 'package:flutter/material.dart';
import 'package:fintechone/screens/forms/transaction_form_screen.dart';
import 'package:fintechone/screens/transactions_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return AppProviders(
      child: DynamicColorWrapper(
        builder: (context, lightTheme, darkTheme, mode) {
          return MaterialApp(
            title: 'FinteChone',
            theme: lightTheme,
            darkTheme: darkTheme,
            themeMode: mode,
            home: const MainTabScreen(),
            routes: {
              '/account_form': (context) => const AccountFormScreen(),
              '/settings/settings_screen': (context) => const SettingsScreen(),
              '/settings/theme_settings_screen': (context) =>
                  const ThemeSettingsScreen(),
              '/transaction_form': (context) => const TransactionFormScreen(),
              '/transactions': (context) => const TransactionsScreen(),

              '/profile_user': (context) => const ProfileUserScreen(),
              '/register': (context) => const RegisterScreen(),
              '/login': (context) => const LoginScreen(),
              '/forgot_password': (context) => const ForgotPasswordScreen(),
              // '/reset_password': (context) => const ResetPasswordScreen(),
              '/forgot_password_email_sent': (context) =>
                  const ForgotPasswordScreen(),
              '/otp_verification': (context) => const OtpRequestScreen(),
              // '/verify_code': (context) => const VerifyCodeScreen(),
            },
          );
        },
      ),
    );
  }
}
