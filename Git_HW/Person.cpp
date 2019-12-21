#include "Person.h"

ostream& operator<<(ostream& out, Person const& p)
{
	out << p.name << endl << p.id << endl << p.age << endl;
	return out;
}



