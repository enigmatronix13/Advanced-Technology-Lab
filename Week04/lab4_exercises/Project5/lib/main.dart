import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginProfileDemo(),
    );
  }
}

class LoginProfileDemo extends StatefulWidget {
  const LoginProfileDemo({super.key});

  @override
  State<LoginProfileDemo> createState() => _LoginProfileDemoState();
}

class _LoginProfileDemoState extends State<LoginProfileDemo> {
  bool isLoggedIn = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login ↔ Profile View')),
      body: Center(
        child: AnimatedCrossFade(
          duration: const Duration(seconds: 1),
          crossFadeState: isLoggedIn
              ? CrossFadeState.showSecond
              : CrossFadeState.showFirst,
          firstChild: ElevatedButton(
            onPressed: () {
              setState(() {
                isLoggedIn = true;
              });
            },
            child: const Text('Login'),
          ),
          secondChild: Card(
            elevation: 6,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const CircleAvatar(
                    radius: 30,
                    child: Icon(Icons.person, size: 30),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'Welcome, User',
                    style: TextStyle(fontSize: 18),
                  ),
                  const SizedBox(height: 12),
                  TextButton(
                    onPressed: () {
                      setState(() {
                        isLoggedIn = false;
                      });
                    },
                    child: const Text('Logout'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}