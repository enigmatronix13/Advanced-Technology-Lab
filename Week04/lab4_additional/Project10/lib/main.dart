import 'package:flutter/material.dart';
import 'dart:math' as math;

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with TickerProviderStateMixin {
  bool _isDarkMode = false;
  late AnimationController _rotationController;
  late AnimationController _opacityController;
  late Animation<double> _rotationAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    _rotationController = AnimationController(
      duration: Duration(milliseconds: 600),
      vsync: this,
    );
    _opacityController = AnimationController(
      duration: Duration(milliseconds: 400),
      vsync: this,
    );

    _rotationAnimation = Tween<double>(
      begin: 0,
      end: 2 * math.pi,
    ).animate(CurvedAnimation(
      parent: _rotationController,
      curve: Curves.easeInOut,
    ));

    _opacityAnimation = Tween<double>(
      begin: 1.0,
      end: 0.0,
    ).animate(CurvedAnimation(
      parent: _opacityController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _rotationController.dispose();
    _opacityController.dispose();
    super.dispose();
  }

  void _toggleTheme() {
    setState(() {
      _isDarkMode = !_isDarkMode;
    });

    // Trigger animations
    _rotationController.forward().then((_) => _rotationController.reverse());
    _opacityController.forward().then((_) => _opacityController.reverse());
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // FIXED: Use colorScheme instead of primarySwatch (Flutter 3.x+)
      theme: ThemeData.light().copyWith(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        scaffoldBackgroundColor: Colors.grey[50],
        appBarTheme: AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black87,
          elevation: 0,
        ),
      ),
      darkTheme: ThemeData.dark().copyWith(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue, brightness: Brightness.dark),
        scaffoldBackgroundColor: Colors.grey[900],
        appBarTheme: AppBarTheme(
          backgroundColor: Colors.grey[850],
          foregroundColor: Colors.white,
          elevation: 0,
        ),
      ),
      themeMode: _isDarkMode ? ThemeMode.dark : ThemeMode.light,
      home: ThemeSwitcherPage(
        toggleTheme: _toggleTheme,
        rotationController: _rotationController,
        opacityController: _opacityController,
      ),
    );
  }
}

class ThemeSwitcherPage extends StatefulWidget {
  final VoidCallback toggleTheme;
  final AnimationController rotationController;
  final AnimationController opacityController;

  const ThemeSwitcherPage({
    Key? key,
    required this.toggleTheme,
    required this.rotationController,
    required this.opacityController,
  }) : super(key: key);

  @override
  _ThemeSwitcherPageState createState() => _ThemeSwitcherPageState();
}

class _ThemeSwitcherPageState extends State<ThemeSwitcherPage> {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text('Animated Theme Switcher'),
        actions: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: GestureDetector(
              onTap: widget.toggleTheme,
              child: AnimatedBuilder(
                // FIXED: Use actual controllers passed from parent
                animation: widget.rotationController,
                builder: (context, child) {
                  return AnimatedContainer(
                    duration: Duration(milliseconds: 600),
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: isDark
                          ? Colors.orange.shade400
                          : Colors.blue.shade400,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: (isDark
                              ? Colors.orange.shade400
                              : Colors.blue.shade400)
                              .withOpacity(0.3),
                          blurRadius: 20,
                          spreadRadius: 2,
                        ),
                      ],
                    ),
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        // Rotating icon animation
                        AnimatedOpacity(
                          opacity: 1.0 - (widget.opacityController.value),
                          duration: Duration(milliseconds: 200),
                          child: Transform.rotate(
                            angle: widget.rotationController.value * 2 * math.pi,
                            child: Icon(
                              isDark ? Icons.wb_sunny : Icons.nights_stay,
                              color: Colors.white,
                              size: 24,
                            ),
                          ),
                        ),
                        // Fading icon animation
                        AnimatedOpacity(
                          opacity: widget.opacityController.value,
                          duration: Duration(milliseconds: 200),
                          child: Icon(
                            isDark ? Icons.nights_stay : Icons.wb_sunny,
                            color: Colors.white,
                            size: 24,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(20.0),
                child: Text(
                  'This card smoothly animates background color changes!',
                  style: Theme.of(context).textTheme.headlineSmall,
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            SizedBox(height: 20),
            Expanded(
              child: AnimatedContainer(
                duration: Duration(milliseconds: 800),
                curve: Curves.easeInOutCubic,
                padding: EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: isDark
                      ? Colors.grey[850]?.withOpacity(0.6)
                      : Colors.white.withOpacity(0.8),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: isDark
                        ? Colors.grey[700]!
                        : Colors.grey[300]!,
                    width: 1,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.star,
                      size: 80,
                      color: isDark ? Colors.amber[300] : Colors.blue[400],
                    ),
                    SizedBox(height: 20),
                    Text(
                      'Animated Background\nContainer Demo',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 10),
                    Text(
                      'Tap the sun/moon icon in the AppBar to toggle themes!',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
