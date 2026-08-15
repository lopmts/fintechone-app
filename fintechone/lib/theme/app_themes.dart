import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static ThemeData light({required ColorScheme dynamicScheme}) {
    return ThemeData(
      useMaterial3: true,
      colorScheme: dynamicScheme,
      scaffoldBackgroundColor: dynamicScheme.surface,
      textTheme: _textTheme,
      cardTheme: _cardTheme(dynamicScheme),
    );
  }

  static ThemeData dark({
    required ColorScheme dynamicScheme,
    bool isAmoled = false,
  }) {
    return ThemeData(
      useMaterial3: true,
      colorScheme: dynamicScheme,
      scaffoldBackgroundColor: isAmoled ? Colors.black : dynamicScheme.surface,
      textTheme: _textTheme,
      cardTheme: _cardTheme(dynamicScheme),
    );
  }

  static CardThemeData _cardTheme(ColorScheme scheme) {
    return CardThemeData(
      color: scheme.surfaceContainer,
      elevation: 0,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    );
  }

  static TextTheme get _textTheme {
    return GoogleFonts.interTextTheme(
      const TextTheme(
        displayLarge: TextStyle(fontSize: 36, fontWeight: FontWeight.w700),
        displayMedium: TextStyle(fontSize: 32, fontWeight: FontWeight.w700),
        displaySmall: TextStyle(fontSize: 28, fontWeight: FontWeight.w700),
        headlineLarge: TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
        headlineMedium: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
        headlineSmall: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
        titleLarge: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
        titleMedium: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
        titleSmall: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        bodyLarge: TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
        bodyMedium: TextStyle(fontSize: 14, fontWeight: FontWeight.w400),
        bodySmall: TextStyle(fontSize: 12, fontWeight: FontWeight.w400),
        labelLarge: TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        labelMedium: TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
        labelSmall: TextStyle(fontSize: 11, fontWeight: FontWeight.w500),
      ),
    );
  }
}
