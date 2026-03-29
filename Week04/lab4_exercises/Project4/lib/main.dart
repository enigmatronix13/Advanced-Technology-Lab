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
      home: ImageRevealDemo(),
    );
  }
}

class ImageRevealDemo extends StatefulWidget {
  const ImageRevealDemo({super.key});

  @override
  State<ImageRevealDemo> createState() => _ImageRevealDemoState();
}

class _ImageRevealDemoState extends State<ImageRevealDemo> {
  bool showImage = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Image Reveal')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              width: 200,
              height: 200,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  // Placeholder Icon
                  AnimatedOpacity(
                    opacity: showImage ? 0.0 : 1.0,
                    duration: const Duration(milliseconds: 800),
                    child: const Icon(
                      Icons.image,
                      size: 80,
                      color: Colors.grey,
                    ),
                  ),

                  // Image
                  AnimatedOpacity(
                    opacity: showImage ? 1.0 : 0.0,
                    duration: const Duration(milliseconds: 800),
                    child: Image.network(
                      'https://flutter.dev/assets/homepage/carousel/slide_1-bg-4e2fcef9b12e8a3d0b5c3c4a02e56d5d8a6b1b845a70d820ee7da8db36805b97.jpg',
                      fit: BoxFit.cover,
                      width: 200,
                      height: 200,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  showImage = !showImage;
                });
              },
              child: const Text('Reveal Image'),
            ),
          ],
        ),
      ),
    );
  }
}