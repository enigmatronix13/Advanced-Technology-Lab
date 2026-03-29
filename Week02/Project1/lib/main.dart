import 'package:flutter/material.dart';
void main() {
  runApp(MyApp());
}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: AddNumbers());
  }
}
class AddNumbers extends StatefulWidget {
  @override
  _AddNumbersState createState() => _AddNumbersState();
}
class _AddNumbersState extends State<AddNumbers> {
  TextEditingController num1 = TextEditingController();
  TextEditingController num2 = TextEditingController();
  int result = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Add Two Numbers")),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: num1, keyboardType: TextInputType.number),
            TextField(controller: num2, keyboardType: TextInputType.number),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  result = int.parse(num1.text) + int.parse(num2.text);
                });
              },
              child: Text("Add"),
            ),
            Text("Result: $result")
          ],
        ),
      ),
    );
  }
}