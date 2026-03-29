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
      home: ColorSizeToggle(),
    );
  }
}

class ColorSizeToggle extends StatefulWidget {
  const ColorSizeToggle({super.key});

  @override
  State<ColorSizeToggle> createState() => _ColorSizeToggleState();
}

class _ColorSizeToggleState extends State<ColorSizeToggle> {
  bool isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Color & Size Toggle'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AnimatedContainer(
              width: isExpanded ? 200 : 100,
              height: isExpanded ? 200 : 100,
              color: isExpanded ? Colors.red : Colors.blue,
              duration: const Duration(seconds: 1),
              curve: Curves.easeInOut,
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  isExpanded = !isExpanded;
                });
              },
              child: const Text('Toggle'),
            ),
          ],
        ),
      ),
    );
  }
}