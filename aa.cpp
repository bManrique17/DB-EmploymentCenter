
#include <vector>
#include <iostream>

using namespace std;

int main(){
	vector<int> hola;
	hola.push_back(1);
	hola.push_back(2);
	hola.push_back(3);
	hola.push_back(4);

	hola.insert (hola.begin()+2,9);

	for(int i=0 ; i<5 ; i++){
		cout<<hola.at(i)<<endl;
	}
}


