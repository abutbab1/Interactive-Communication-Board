#include "Employee.h"

ostream & operator<<(ostream & os, Employee const & Ec)
{
	return os << Ec.salary << endl;
}
