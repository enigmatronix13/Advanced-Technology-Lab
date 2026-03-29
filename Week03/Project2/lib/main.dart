import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: InputControlsDemo(),
    );
  }
}

class InputControlsDemo extends StatefulWidget {
  @override
  _InputControlsDemoState createState() => _InputControlsDemoState();
}

class _InputControlsDemoState extends State<InputControlsDemo> {
  // Checkbox states
  bool _isAccepted = false;
  bool _receiveEmails = false;
  bool _shareData = false;

  // Radio button state
  String _selectedGender = '';

  // Validation message
  String? _validationMessage;

  bool get _isFormValid {
    return _isAccepted && _selectedGender.isNotEmpty;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Input Controls Demo')),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Preferences', style: Theme.of(context).textTheme.headlineSmall),
            SizedBox(height: 20),

            // Checkboxes section
            CheckboxListTile(
              title: Text('I accept terms & conditions *', style: TextStyle(fontWeight: FontWeight.bold)),
              value: _isAccepted,
              onChanged: (value) {
                setState(() {
                  _isAccepted = value ?? false;
                  _validationMessage = null; // Clear validation on change
                });
              },
            ),
            CheckboxListTile(
              title: Text('Receive promotional emails'),
              value: _receiveEmails,
              onChanged: (value) => setState(() => _receiveEmails = value ?? false),
            ),
            CheckboxListTile(
              title: Text('Share my data'),
              value: _shareData,
              onChanged: (value) => setState(() => _shareData = value ?? false),
            ),

            SizedBox(height: 30),

            // Radio buttons section
            Text('Gender *', style: TextStyle(fontWeight: FontWeight.bold)),
            RadioListTile<String>(
              title: Text('Male'),
              value: 'male',
              groupValue: _selectedGender,
              onChanged: (value) {
                setState(() {
                  _selectedGender = value!;
                  _validationMessage = null; // Clear validation on change
                });
              },
            ),
            RadioListTile<String>(
              title: Text('Female'),
              value: 'female',
              groupValue: _selectedGender,
              onChanged: (value) {
                setState(() {
                  _selectedGender = value!;
                  _validationMessage = null;
                });
              },
            ),
            RadioListTile<String>(
              title: Text('Other'),
              value: 'other',
              groupValue: _selectedGender,
              onChanged: (value) {
                setState(() {
                  _selectedGender = value!;
                  _validationMessage = null;
                });
              },
            ),

            SizedBox(height: 20),

            // Validation message display
            if (_validationMessage != null)
              Container(
                width: double.infinity,
                padding: EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.red.shade50,
                  border: Border.all(color: Colors.red.shade200),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _validationMessage!,
                  style: TextStyle(color: Colors.red.shade700),
                ),
              ),

            SizedBox(height: 20),

            // Submit button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _isFormValid ? _showSummary : null, // Disabled if invalid
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isFormValid ? null : Colors.grey,
                  foregroundColor: Colors.white,
                ),
                child: Text('Show Summary'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showSummary() {
    debugPrint('✅ Form Valid! Selections:');
    debugPrint('   Accepted: $_isAccepted');
    debugPrint('   Emails: $_receiveEmails');
    debugPrint('   Data sharing: $_shareData');
    debugPrint('   Gender: $_selectedGender');

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Summary saved! Gender: $_selectedGender'),
        backgroundColor: Colors.green,
      ),
    );
  }
}
