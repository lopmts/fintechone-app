import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;

class LogsScreen extends StatelessWidget {
  const LogsScreen({super.key});

  Future<List<String>> fetchLogs() async {
    final response = await http.get(
      Uri.parse('http://192.168.18.11:3333/logs'),
    );

    if (response.statusCode == 200) {
      final dynamic decoded = json.decode(response.body);
      final List<dynamic> logsJson = decoded is List ? decoded : [decoded];
      return logsJson.map((log) => log.toString()).toList();
    } else {
      throw Exception('Failed to load logs');
    }
  }

  Stream<List<String>> streamLogs() async* {
    while (true) {
      yield await fetchLogs();
      await Future.delayed(const Duration(seconds: 5));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Logs')),
      body: FutureBuilder<List<String>>(
        future: fetchLogs(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No logs available.'));
          } else {
            final logs = snapshot.data!;
            return ListView.builder(
              itemCount: logs.length,
              itemBuilder: (context, index) {
                return ListTile(title: Text(logs[index]));
              },
            );
          }
        },
      ),
    );
  }
}
