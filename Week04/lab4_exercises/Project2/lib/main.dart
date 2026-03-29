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
      home: ShapeMorphingCard(),
    );
  }
}

class ShapeMorphingCard extends StatefulWidget {
  const ShapeMorphingCard({super.key});

  @override
  State<ShapeMorphingCard> createState() => _ShapeMorphingCardState();
}

class _ShapeMorphingCardState extends State<ShapeMorphingCard> {
  bool toggled = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Shape Morphing Card')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: AnimatedAlign(
          alignment: toggled ? Alignment.centerRight : Alignment.centerLeft,
          duration: const Duration(seconds: 1),
          curve: Curves.easeInOut,
          child: GestureDetector(
            onTap: () {
              setState(() {
                toggled = !toggled;
              });
            },
            child: AnimatedContainer(
              duration: const Duration(seconds: 1),
              curve: Curves.easeInOut,
              margin: EdgeInsets.all(toggled ? 20 : 0), // BONUS
              width: 160,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.teal,
                borderRadius: BorderRadius.circular(toggled ? 30 : 0),
                boxShadow: toggled
                    ? [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.3),
                    blurRadius: 12,
                    offset: const Offset(0, 6),
                  )
                ]
                    : [],
              ),
              child: const Center(
                child: Text(
                  'Tap Me',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}