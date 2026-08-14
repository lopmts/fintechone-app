/// Representa o objeto `user` retornado pelas rotas de auth.
class AuthUser {
  final String id;
  final String? name;
  final String email;
  final String? codeuniq;
  final String? imageUrl;

  const AuthUser({
    required this.id,
    required this.email,
    this.name,
    this.codeuniq,
    this.imageUrl,
  });

  factory AuthUser.fromJson(Map<String, dynamic> json) {
    return AuthUser(
      id: json['id'] as String,
      email: json['email'] as String,
      name: json['name'] as String?,
      codeuniq: json['codeuniq'] as String?,
      imageUrl: json['imageUrl'] as String?,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'name': name,
        'email': email,
        'codeuniq': codeuniq,
        'imageUrl': imageUrl,
      };
}
