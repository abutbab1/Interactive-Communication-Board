#include "Person.h"

ostream& operator<<(ostream& out, const Person& p)
{
	out << p.name << endl << p.id << endl << p.age << endl;
	return out;
}



