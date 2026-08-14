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

  // Um cardTheme só, chamado tanto no light quanto no dark — não precisa
  // saber se é AMOLED aqui: o DynamicColorWrapper já substitui
  // surfaceContainer por um tom próprio antes de chegar aqui (ver
  // _applyAmoledColors), então esse token já vem "certo" nos 3 casos
  // (light, dark normal, dark AMOLED).
  //
  // surfaceTintColor: transparent é o pulo do gato — sem isso, o Material
  // 3 mistura um verniz de `primary` por cima da cor conforme a elevação,
  // e o fundo do card deixa de ser previsível (fica ilhado entre a cor que
  // você pediu e essa mistura). Com elevation 0 + tint transparente, o
  // card fica exatamente na cor do token, sem surpresa.
  static CardThemeData _cardTheme(ColorScheme scheme) {
    return CardThemeData(
      color: scheme.surfaceContainer,
      elevation: 0,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    );
  }

  static TextTheme get _textTheme {
    return TextTheme(
      displayLarge: const TextStyle(fontSize: 72, fontWeight: FontWeight.bold),
      titleLarge: GoogleFonts.oswald(fontSize: 30, fontStyle: FontStyle.normal),
      bodyMedium: GoogleFonts.merriweather(),
      displaySmall: GoogleFonts.pacifico(),
    );
  }
}
