#include "WorkingStudent.h"

WorkingStudent::WorkingStudent(string name, long id, int age, int avg, string institute, float salary, bool same_institute)
{
	this->name = name;
	this->id = id;
	this->age = age;
	this->avg = avg;
	this->salary = salary;
	this->institute = institute;
	this->same_institute = same_institute;
}

ostream& operator<<(ostream& out, WorkingStudent const& s)
{
	out << s.name << s.id << s.age << s.avg << s.institute << s.salary << s.same_institute << endl;
	return out;
}
