#ifndef EMPLOYEE
#define EMPLOYEE


#include "Person.h"


class Employee : public Person
{
	float salary;
public:
	Employee(float x) : salary(x) {}
	friend std::ostream& operator<<(std::ostream& os, Employee const & Ec);

	~Employee(){}
};
#endif // !EMPLOYEE

