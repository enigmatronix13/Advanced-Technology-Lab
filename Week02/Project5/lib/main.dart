import 'package:flutter/material.dart';
void main() => runApp(MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text("Layout Demo")),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Flutter Layout Example", style: TextStyle(fontSize: 20)),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Icon(Icons.home, size: 40),
                Icon(Icons.settings, size: 40),
                Icon(Icons.person, size: 40),
              ],
            ),
          ],
        ),
      ),
    );
  }
}