#ifndef WORKINGSTUDENT
#define WORKINGSTUDENT

#include "Employee.h"
#include"Student.h"
using namespace std;

class WorkingStudent: public Student, public Employee
{
public:
	WorkingStudent(string name, long id, int age, int avg, string institute, float salary, bool same_institute);
	friend ostream& operator << (ostream& out, WorkingStudent const& w);
	~WorkingStudent(){}

	bool same_institute;
};
#endif //!WORKINGSTUDENT