#include"WorkingStudent.h"

int main()
{
	Person** arr;
	int amount;
	int choise;
	string name;
	long id;
	int age;
	int avg;
	string institute;
	int salary;
	bool same_institute;
	cout << "how many? ";
	cin >> amount;
	arr = new Person*[amount];
	for (int i = 0; i < amount; i++)
	{
		cout << "1: Student.\n2: Employee.\n3: Working Student.";
		cin >> choise;
		switch (choise)
		{
		case 1:	cout << "Enter a name, id, age, avg, institute:";

				cin >> name >> id >> age >> avg >> institute;
				arr[i] = new Student(name , id, age, avg, institute);
				break;

		case 2:	cout << "Enter a name, id, age, salary:";
				cin >> name >> id >> age >> salary;
				arr[i] = new Employee(name, id, age, salary);
				break;

		case 3:	cout << "Enter a name, id, age, avg, institute, salary, same institute:";
				cin >> name >> id >> age >> avg >> institute >> salary >> same_institute;
				arr[i] = new WorkingStudent(name, id, age, avg, institute, salary, same_institute);
				break;

		default:
			cout << "ERROR!";
			i--;
		}
	}

	for (int i = 0; i < amount; i++)
	{
		cout << *arr[i];
	}

}