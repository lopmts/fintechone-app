import 'package:flutter/material.dart';

class ProfileUserScreen extends StatefulWidget {
  const ProfileUserScreen({super.key});

  @override
  State<ProfileUserScreen> createState() => _ProfileUserState();
}

class _ProfileUserState extends State<ProfileUserScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 96),
          children: [
            const SizedBox(height: 20),
            const Text('Perfil do Usuário'),
          ],
        ),
      ),
    );
  }
}
