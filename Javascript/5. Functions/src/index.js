const grade = (marks) => {
   return marks >= 80 && marks <= 100 ? 'A':
   marks < 80 && marks > 65 ? 'B':
   marks < 65 && marks > 45  ? 'C':
   marks < 45 && marks > 35 ? 'D':
   marks < 35 ? 'E':
   "Invalid marks"

}

console.log(`${grade(60)}`)