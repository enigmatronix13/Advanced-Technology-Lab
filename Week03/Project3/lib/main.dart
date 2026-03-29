import 'package:flutter/material.dart';

void main() => runApp(LayoutDemoApp());

class LayoutDemoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LayoutDemo(),
    );
  }
}

class LayoutDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Layout Management Demo')),
      body: Column(
        children: [
          // Header section
          Container(
            width: double.infinity,
            padding: EdgeInsets.all(20),
            color: Colors.indigo.shade100,
            child: Column(
              children: [
                Text(
                  "Layout Demo",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.indigo.shade800,
                  ),
                ),
                SizedBox(height: 10),
                Text("Row, Column & Expanded in action"),
              ],
            ),
          ),

          SizedBox(height: 20),

          // Main content - Nested layouts
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(20),
              child: Column(
                children: [
                  // Row 1: Equal distribution (1:1:1)
                  Text('Equal Distribution', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                        child: Container(
                          height: 80,
                          decoration: BoxDecoration(
                            color: Colors.red,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(child: Text('Red\n1:1:1', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                        ),
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: Container(
                          height: 80,
                          decoration: BoxDecoration(
                            color: Colors.blue,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(child: Text('Blue\n1:1:1', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                        ),
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: Container(
                          height: 80,
                          decoration: BoxDecoration(
                            color: Colors.green,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(child: Text('Green\n1:1:1', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                        ),
                      ),
                    ],
                  ),

                  SizedBox(height: 30),

                  // Row 2: Proportional distribution (1:2:1)
                  Text('Proportional (1:2:1)', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                        child: Container(
                          height: 80,
                          decoration: BoxDecoration(
                            color: Colors.orange,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(child: Text('Small\nflex:1', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                        ),
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        flex: 2, // Takes double space
                        child: Container(
                          height: 80,
                          decoration: BoxDecoration(
                            color: Colors.purple,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(child: Text('Large\nflex:2', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                        ),
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: Container(
                          height: 80,
                          decoration: BoxDecoration(
                            color: Colors.teal,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Center(child: Text('Small\nflex:1', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                        ),
                      ),
                    ],
                  ),

                  SizedBox(height: 30),

                  // Nested Column example inside Row
                  Text('Nested Layout', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  SizedBox(height: 10),
                  Expanded(
                    child: Row(
                      children: [
                        // Left column (50% width)
                        Expanded(
                          child: Column(
                            children: [
                              Expanded(child: Container(color: Colors.amber, child: Center(child: Text('Top Left')))),
                              SizedBox(height: 10),
                              Expanded(child: Container(color: Colors.cyan, child: Center(child: Text('Bottom Left')))),
                            ],
                          ),
                        ),
                        SizedBox(width: 10),
                        // Right column (50% width)
                        Expanded(
                          child: Container(
                            color: Colors.pink,
                            child: Center(child: Text('Full Right\nColumn', style: TextStyle(fontWeight: FontWeight.bold))),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
