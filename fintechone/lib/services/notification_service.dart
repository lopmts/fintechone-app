import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin _notifications =
      FlutterLocalNotificationsPlugin();

  bool _permissionRequested = false;
  bool _permissionGranted = false;

  Future<bool> initializeAndRequestPermission() async {
    // Se já pediu permissão, retorna o resultado anterior
    if (_permissionRequested) {
      return _permissionGranted;
    }

    try {
      // Inicializa as notificações
      const android = AndroidInitializationSettings('@mipmap/ic_launcher');
      const ios = DarwinInitializationSettings();

      await _notifications.initialize(
        settings: const InitializationSettings(android: android, iOS: ios),
      );

      // Pede permissão para Android 13+ (API 33+)
      final androidImpl = _notifications
          .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin
          >();

      if (androidImpl != null) {
        _permissionGranted =
            await androidImpl.requestNotificationsPermission() ?? false;
        _permissionRequested = true;
        return _permissionGranted;
      }

      // Pede permissão para iOS
      final iosImpl = _notifications
          .resolvePlatformSpecificImplementation<
            IOSFlutterLocalNotificationsPlugin
          >();

      if (iosImpl != null) {
        _permissionGranted =
            await iosImpl.requestPermissions(
              alert: true,
              badge: true,
              sound: true,
            ) ??
            false;
        _permissionRequested = true;
        return _permissionGranted;
      }

      // Se não for Android nem iOS, assume que tem permissão
      _permissionGranted = true;
      _permissionRequested = true;
      return true;
    } catch (e) {
      debugPrint('Erro ao inicializar notificações: $e');
      _permissionRequested = true;
      _permissionGranted = false;
      return false;
    }
  }

  /// Retorna se a permissão já foi solicitada
  bool get wasPermissionRequested => _permissionRequested;

  /// Retorna se a permissão foi concedida
  bool get isPermissionGranted => _permissionGranted;

  /// Reset manual (útil para testes)
  void resetPermissionState() {
    _permissionRequested = false;
    _permissionGranted = false;
  }

  FlutterLocalNotificationsPlugin get notifications => _notifications;
}
