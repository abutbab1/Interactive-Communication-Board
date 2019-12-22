#include "Student.h"

Student::Student(string name, long id, int age, int avg, string institute): Person(name, id, age)
{
	this->avg = avg;
	this->institute = institute;
}

ostream& operator<<(ostream& out, Student const& s)
{
	return out << s.name << s.id << s.age << s.avg <<s.institute << endl;
}
