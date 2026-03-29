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
      home: FAQPage(),
    );
  }
}

class FAQPage extends StatelessWidget {
  const FAQPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('FAQs')),
      body: const Padding(
        padding: EdgeInsets.all(16),
        child: ExpandableFaqTile(
          question: 'What is Flutter?',
          answer:
          'Flutter is an open-source UI toolkit by Google used to build '
              'natively compiled applications for mobile, web, and desktop '
              'from a single codebase.',
        ),
      ),
    );
  }
}

class ExpandableFaqTile extends StatefulWidget {
  final String question;
  final String answer;

  const ExpandableFaqTile({
    super.key,
    required this.question,
    required this.answer,
  });

  @override
  State<ExpandableFaqTile> createState() => _ExpandableFaqTileState();
}

class _ExpandableFaqTileState extends State<ExpandableFaqTile>
    with TickerProviderStateMixin {
  bool _expanded = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _expanded = !_expanded;
        });
      },
      child: AnimatedSize(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        child: Card(
          elevation: 3,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: AnimatedCrossFade(
              duration: const Duration(milliseconds: 300),
              crossFadeState: _expanded
                  ? CrossFadeState.showSecond
                  : CrossFadeState.showFirst,

              // 🔹 First child: Question only
              firstChild: Text(
                widget.question,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),

              // 🔹 Second child: Question + Answer
              secondChild: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.question,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.answer,
                    style: const TextStyle(fontSize: 16),
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
