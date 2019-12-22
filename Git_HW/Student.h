#include "Person.h"
using namespace std;

class Student :virtual public Person
{
public:
	Student() {}
	Student(string name, long id, int age, int avg, string institute);
	friend ostream& operator << (ostream& out, Student const& s);
	~Student() {}

	int avg;
	string institute;
};