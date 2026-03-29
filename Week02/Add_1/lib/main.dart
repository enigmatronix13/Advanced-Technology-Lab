import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Table Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: Scaffold(
        appBar: AppBar(title: Text('Employee Table')),
        body: Center(
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: Table(
              border: TableBorder.all(color: Colors.black, width: 1),
              defaultVerticalAlignment: TableCellVerticalAlignment.middle,
              children: [
                // Header row
                TableRow(
                  decoration: BoxDecoration(color: Colors.grey[300]),
                  children: [
                    Padding(padding: EdgeInsets.all(8.0), child: Text('Name', style: TextStyle(fontWeight: FontWeight.bold))),
                    Padding(padding: EdgeInsets.all(8.0), child: Text('Age', style: TextStyle(fontWeight: FontWeight.bold))),
                    Padding(padding: EdgeInsets.all(8.0), child: Text('Department', style: TextStyle(fontWeight: FontWeight.bold))),
                  ],
                ),
                // Data rows
                TableRow(children: [
                  Padding(padding: EdgeInsets.all(8.0), child: Text('A')),
                  Padding(padding: EdgeInsets.all(8.0), child: Text('20')),
                  Padding(padding: EdgeInsets.all(8.0), child: Text('CSE')),
                ]),
                TableRow(children: [
                  Padding(padding: EdgeInsets.all(8.0), child: Text('B')),
                  Padding(padding: EdgeInsets.all(8.0), child: Text('21')),
                  Padding(padding: EdgeInsets.all(8.0), child: Text('IT')),
                ]),
                TableRow(children: [
                  Padding(padding: EdgeInsets.all(8.0), child: Text('C')),
                  Padding(padding: EdgeInsets.all(8.0), child: Text('22')),
                  Padding(padding: EdgeInsets.all(8.0), child: Text('ECE')),
                ]),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
