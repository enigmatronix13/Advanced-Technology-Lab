// import 'package:flutter/material.dart';
//
// void main() {
//   runApp(const MyApp());
// }
//
// class MyApp extends StatelessWidget {
//   const MyApp({super.key});
//
//   @override
//   Widget build(BuildContext context) {
//     return const MaterialApp(
//       debugShowCheckedModeBanner: false,
//       home: RotatingIconPage(),
//     );
//   }
// }
//
// class RotatingIconPage extends StatefulWidget {
//   const RotatingIconPage({super.key});
//
//   @override
//   State<RotatingIconPage> createState() => _RotatingIconPageState();
// }
//
// class _RotatingIconPageState extends State<RotatingIconPage>
//     with SingleTickerProviderStateMixin {
//   late AnimationController _controller;
//
//   @override
//   void initState() {
//     super.initState();
//     // 1️⃣ AnimationController for 360° rotation
//     _controller = AnimationController(
//       vsync: this,
//       duration: const Duration(seconds: 1), // 1 full rotation
//     );
//   }
//
//   @override
//   void dispose() {
//     _controller.dispose(); // Dispose controller
//     super.dispose();
//   }
//
//   void _rotateIcon() {
//     // 2️⃣ Start animation forward from 0 → 1
//     _controller.forward(from: 0);
//     // Stops automatically after one rotation
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Rotating Icon'),
//         centerTitle: true,
//       ),
//       body: Center(
//         child: AnimatedBuilder(
//           animation: _controller,
//           builder: (context, child) {
//             return Transform.rotate(
//               angle: _controller.value * 2 * 3.1415926, // 0 → 2π radians
//               child: child,
//             );
//           },
//           child: const Icon(
//             Icons.refresh,
//             size: 100,
//             color: Colors.deepPurple,
//           ),
//         ),
//       ),
//       floatingActionButton: FloatingActionButton(
//         onPressed: _rotateIcon,
//         child: const Icon(Icons.play_arrow),
//       ),
//     );
//   }
// }
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
      home: MovingIconPage(),
    );
  }
}

class MovingIconPage extends StatefulWidget {
  const MovingIconPage({super.key});

  @override
  State<MovingIconPage> createState() => _MovingIconPageState();
}

class _MovingIconPageState extends State<MovingIconPage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _moveAnimation;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    );

    // Move from -100 → 100 pixels (left to right)
    _moveAnimation = Tween<double>(
      begin: -100,
      end: 100,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _moveIcon() {
    _controller.forward(from: 0);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Moving Icon'),
        centerTitle: true,
      ),
      body: Center(
        child: AnimatedBuilder(
          animation: _moveAnimation,
          builder: (context, child) {
            return Transform.translate(
              offset: Offset(_moveAnimation.value, 0),
              child: child,
            );
          },
          child: const Icon(
            Icons.refresh,
            size: 100,
            color: Colors.deepPurple,
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _moveIcon,
        child: const Icon(Icons.play_arrow),
      ),
    );
  }
}
