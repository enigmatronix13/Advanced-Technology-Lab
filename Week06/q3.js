// Q3: Create a student object

function createStudent(name, branch, age) {
  return {
    name,
    branch,
    age,
    greet() {
      console.log(`Hello! I'm ${this.name}, studying ${this.branch}. I'm ${this.age} years old.`);
    }
  };
}

// Example usage
const student = createStudent("John Doe", "Computer Science", 20);
student.greet();
