#include <iostream>
#include <cstring>
#include <string.h>
using namespace std;

class Person {

	string name;
	long id;
	int age;

public:
	// constructor
	Person(string Name, long ID, int Age) : name(Name), id(ID), age(Age)
	{}
		
	//cout operator
	friend ostream& operator << (ostream& out, const Person& p);

};

