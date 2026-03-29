import 'package:flutter/material.dart';

void main() => runApp(ProfileDashboardApp());

class ProfileDashboardApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(useMaterial3: true),
      home: ProfileDashboard(),
    );
  }
}

class ProfileDashboard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          ProfileHeader(),
          SliverToBoxAdapter(child: ProfileStats()),
          SliverList(delegate: SliverChildListDelegate(ProfessionalDetails.list)),
        ],
      ),
    );
  }
}

// Header with Stack overlay
class ProfileHeader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
      expandedHeight: 200,
      pinned: true,
      floating: false,
      flexibleSpace: FlexibleSpaceBar(
        background: Stack(
          fit: StackFit.expand,
          children: [
            Image.network(
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=300&fit=crop',
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(color: Colors.grey),
            ),
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  stops: [0.4, 1.0],
                  colors: [Colors.transparent, Colors.black54],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Profile picture + name section
class ProfileHero extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      clipBehavior: Clip.none,
      children: [
        Positioned(
          top: -60,
          right: 20,
          left: 20,
          child: Row(
            children: [
              // Profile picture
              Hero(
                tag: 'profile',
                child: CircleAvatar(
                  radius: 50,
                  backgroundImage: NetworkImage('https://i.pravatar.cc/150'),
                  onBackgroundImageError: (_, __) => Icon(Icons.person, size: 50),
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 4),
                    ),
                    child: Align(
                      alignment: Alignment.bottomRight,
                      child: Container(
                        width: 24,
                        height: 24,
                        decoration: BoxDecoration(
                          color: Colors.green,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.white, width: 2),
                        ),
                        child: Icon(Icons.online_prediction, size: 12, color: Colors.white),
                      ),
                    ),
                  ),
                ),
              ),
              SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Sarah Johnson', style: Theme.of(context).textTheme.headlineMedium),
                    Text('Senior Flutter Developer', style: TextStyle(color: Colors.grey[600])),
                  ],
                ),
              ),
              IconButton(icon: Icon(Icons.edit), onPressed: () {}),
            ],
          ),
        ),
        Container(
          height: 100,
          margin: EdgeInsets.only(top: 40),
          padding: EdgeInsets.symmetric(horizontal: 20),
        ),
      ],
    );
  }
}

// Stats row
class ProfileStats extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(20),
      child: Row(
        children: [
          Expanded(child: _StatCard(label: 'Projects', value: '42')),
          SizedBox(width: 12),
          Expanded(child: _StatCard(label: 'Rating', value: '4.9')),
          SizedBox(width: 12),
          Expanded(child: _StatCard(label: 'Years', value: '5+')),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final String value;

  const _StatCard({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Text(value, style: Theme.of(context).textTheme.headlineSmall),
            Text(label, style: TextStyle(color: Colors.grey[600])),
          ],
        ),
      ),
    );
  }
}

// Professional details ListTiles
class ProfessionalDetails {
  static final List<Widget> list = [
    _SectionTitle(title: 'Professional Details'),
    ProfessionalTile(Icons.email, 'Email', 'sarah.johnson@company.com'),
    ProfessionalTile(Icons.phone, 'Phone', '+1 (555) 123-4567'),
    ProfessionalTile(Icons.location_on, 'Location', 'San Francisco, CA'),
    ProfessionalTile(Icons.work, 'Company', 'TechCorp'),
    ProfessionalTile(Icons.school, 'Education', 'MIT'),
    ProfessionalTile(Icons.code, 'Skills', 'Flutter • Dart • Firebase'),
    SizedBox(height: 20),
    _SectionTitle(title: 'About'),
    _AboutCard(),
    SizedBox(height: 100),
  ];
}

class ProfessionalTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const ProfessionalTile(this.icon, this.title, this.subtitle);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 20, vertical: 2),
      child: ListTile(
        leading: CircleAvatar(backgroundColor: Colors.blue.shade100, child: Icon(icon, color: Colors.blue)),
        title: Text(title, style: TextStyle(fontWeight: FontWeight.w500)),
        subtitle: Text(subtitle),
        trailing: Icon(Icons.chevron_right, size: 20, color: Colors.grey),
        onTap: () {},
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;
  const _SectionTitle({required this.title});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.fromLTRB(20, 20, 20, 12),
      child: Row(
        children: [
          Container(width: 4, height: 20, color: Colors.blue),
          SizedBox(width: 12),
          Text(title, style: Theme.of(context).textTheme.titleLarge),
        ],
      ),
    );
  }
}

class _AboutCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20),
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.grey[50],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        'Experienced Flutter developer specializing in cross-platform mobile apps. Expert in clean architecture, state management (Riverpod, Bloc), and pixel-perfect UI design.',
        style: TextStyle(height: 1.6, color: Colors.grey[700]),
      ),
    );
  }
}
