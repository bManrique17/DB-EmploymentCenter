/********************************************************************************
Simulador del funcionamiento de la memoria cache usando 3 tipos de correspondencia

Organizacion de Computadoras

Q2-2019

Bryan Manrique Amador Mena - 11711211
*********************************************************************************/


#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

bool directa(int,int*,int,int);
bool asociativaSecuencial(int,int*,int,int*,int);
bool asociativaLRU(int,int*,int,vector <int>*,int);
bool asociativaXconjuntosSecuencial(int,int*,int,int*,int,int);
bool asociativaXconjuntosLRU(int,int*,int,vector <int>*,int,int);


int main(){
	cout<<"---MEMORIA CACHE---\n"<<endl;

	char respuesta;
	do{
		int numLineas = 0;
		int numPalabrasXLinea = 0;
		int tipoCorrespondecia = 0;
		int numIntervalos = 0;
		int tamanoConjunto = -1;
		int metodoDeLinea = 0;
		double aciertos = 0.0;
		double fallos = 0.0;
		int siguienteLinea = 0;


		cout<<"->Ingrese el numero de lineas de la cache: ";
		cin>>numLineas;
		cout<<"->Ingrese el numero de palabras por linea: ";
		cin>>numPalabrasXLinea;


		cout<<std::endl;
		cout<<"Ingrese el numero de intervalos a evaluar: ";
		cin>>numIntervalos;

		string intervalos[numIntervalos][2];
		string informacion = "";

		for(int i=0 ; i<numIntervalos ; i++){
			cout<<"Ingrese su intervarlo (ejemplo: 1250-1522,1600-1750): ";
			cin>>intervalos[i][0];
			cout<<"Ingrese el numero de repeticiones del intervalo: ";
			cin>>intervalos[i][1];
			informacion += intervalos[i][0] + " : " + intervalos[i][1] + " veces" + "\n";
			intervalos[i][0] += ",";
		}
		cout<<std::endl;
		cout<<"Datos:"<<std::endl;
		cout<<informacion<<std::endl;


		cout<<"*Correspondecnias disponibles:"<<endl;
		cout<<"(1)Directa"<<endl;
		cout<<"(2)Asociativa"<<endl;
		cout<<"(3)Asociativa por conjuntos"<<endl;
		cout<<"->Ingrese el metodo deseado: ";
		cin>>tipoCorrespondecia;


		if(tipoCorrespondecia == 3 || tipoCorrespondecia == 2){
			if(tipoCorrespondecia == 3){
				cout<<"->Ingrese el tamano del conjunto: ";
				cin>>tamanoConjunto;
			}
			cout<<"->Ingrese el metodo de linea (1. Secuencial, 2. LRU): ";
			cin>>metodoDeLinea;
		}

		vector<int> implementacionLRU;
		int cache[numLineas];
		if(tipoCorrespondecia != 1){
			for(int i=0 ; i<numLineas ; i++){
				cache[i] = -1;
				implementacionLRU.push_back(i);
			}
		}else{
			for(int i=0 ; i<numLineas ; i++){
				cache[i] = -1;
			}
		}

		for(int i=0 ; i<numIntervalos ; i++){
			int numIntervalosGrupo = count(intervalos[i][0].begin(),intervalos[i][0].end(),',') ;
			for(int h=0 ; h<stoi(intervalos[i][1]); h++){
				string intervaloActual = intervalos[i][0];
				for(int j=0 ; j<numIntervalosGrupo; j++){
					for(int k=stoi(intervaloActual.substr(0,intervaloActual.find("-"))) ;
						k<=stoi(intervaloActual.substr(intervaloActual.find("-")+1,intervaloActual.find(","))) ; k++){
						switch(tipoCorrespondecia){
							case 1:
								if(directa(k,&cache[0],numPalabrasXLinea,numLineas)){
									aciertos++;
								}else{
									fallos++;
								}
								break;
							case 2:
								if(metodoDeLinea == 1){
									if(asociativaSecuencial(k,&cache[0],numPalabrasXLinea,&siguienteLinea,numLineas)){
										aciertos++;
									}else{
										fallos++;
									}
								}else{
									if(asociativaLRU(k,&cache[0],numPalabrasXLinea,&implementacionLRU,numLineas)){
										aciertos++;
									}else{
										fallos++;
									}
								}
								break;
							case 3:
								if(metodoDeLinea == 1){
									if(asociativaXconjuntosSecuencial(k,&cache[0],numPalabrasXLinea,&siguienteLinea,tamanoConjunto,numLineas)){
										aciertos++;
									}else{
										fallos++;
									}
								}else{
									if(asociativaXconjuntosLRU(k,&cache[0],numPalabrasXLinea,&implementacionLRU,tamanoConjunto,numLineas)){
										aciertos++;
									}else{
										fallos++;
									}
								}
								break;
							default:
								break;
						}
					}
					intervaloActual.erase(0, intervaloActual.find(",")+1);
				}
			}
		}

		cout<<"\nRESULTADOS"<<endl;
		cout<<"*Aciertos: "<<aciertos<<endl;
		cout<<"*Fallos: "<<fallos<<endl;
		double tasaAciertos = (100*aciertos)/(aciertos+fallos);
		cout<<"***Tasa de aciertos: "<<tasaAciertos<<"%"<<endl;

		cout<<endl;
		cout<<"¿Desea salir? [s/n]: ";
		cin>>respuesta;

	}while(respuesta != 's' && respuesta != 'S');

}

bool directa(int memoria, int* cache, int numPalabrasXLinea, int numLineas){
	int bloque = memoria/numPalabrasXLinea;
	int linea = bloque%numLineas;
	int primerValor = bloque*numPalabrasXLinea;
	if(cache[linea] != primerValor){
		cache[linea] = primerValor;
		return false;
	}
	return true;
}

bool asociativaSecuencial(int memoria, int* cache, int numPalabrasXLinea, int* siguienteLinea, int numLineas){
	int bloque = memoria/numPalabrasXLinea;
	int primerValor = bloque*numPalabrasXLinea;
	for(int i=0 ; i<numLineas; i++){
		if(primerValor == cache[i])
			return true;
	}
	cache[*(siguienteLinea)] = primerValor;
	if(*(siguienteLinea) != numLineas-1)
		*(siguienteLinea) = *(siguienteLinea)+1;
	else
		*(siguienteLinea) = 0;
	return false;
}

bool asociativaLRU(int memoria, int* cache, int numPalabrasXLinea, vector<int>* implementacionLRU, int numLineas){
	int bloque = memoria/numPalabrasXLinea;
	int primerValor = bloque*numPalabrasXLinea;
	int temp = 0;
	for(int i=0 ; i<numLineas; i++){
		if(primerValor == cache[i]){
			int j=0;
			for(j=0 ; j<numLineas; j++){
				if( (*(implementacionLRU)).at(j) == i )
					break;
			}
			temp = (*(implementacionLRU)).at(j);
			(*(implementacionLRU)).erase((*(implementacionLRU)).begin()+j);
			(*(implementacionLRU)).push_back(temp);
			return true;
		}
	}
	temp = (*(implementacionLRU)).at(0);
	cache[temp] = primerValor;
	(*(implementacionLRU)).erase((*(implementacionLRU)).begin()+0);
	(*(implementacionLRU)).push_back(temp);
	return false;
}

bool asociativaXconjuntosSecuencial(int memoria,int* cache,int numPalabrasXLinea, int* siguienteLinea, int tamanoConjunto, int numLineas){
	int bloque = memoria/numPalabrasXLinea;
	int conjunto = bloque%(numLineas/tamanoConjunto);
	int primerValor = bloque*numPalabrasXLinea;

	for(int i=conjunto*tamanoConjunto ; i<tamanoConjunto*(conjunto+1); i++){
		if(primerValor == cache[i])
			return true;
	}

	cache[(*(siguienteLinea))+conjunto*tamanoConjunto] = primerValor;
	if(*(siguienteLinea) != tamanoConjunto-1)
		*(siguienteLinea) = *(siguienteLinea)+1;
	else
		*(siguienteLinea) = 0;
	return false;
}

bool asociativaXconjuntosLRU(int memoria,int* cache,int numPalabrasXLinea, vector<int>* implementacionLRU, int tamanoConjunto, int numLineas){
	int bloque = memoria/numPalabrasXLinea;
	int conjunto = bloque%(numLineas/tamanoConjunto);
	int primerValor = bloque*numPalabrasXLinea;
	int temp = 0;
	for(int i=conjunto*tamanoConjunto ; i<tamanoConjunto*(conjunto+1); i++){
		if(primerValor == cache[i]){
			int j=0;
			for(j=0 ; j<numLineas; j++){
				if( (*(implementacionLRU)).at(j) == i )
					break;
			}
			temp = (*(implementacionLRU)).at(j);
			(*(implementacionLRU)).insert((*(implementacionLRU)).begin()+(conjunto+1)*tamanoConjunto,temp);
			(*(implementacionLRU)).erase((*(implementacionLRU)).begin()+j);
			return true;
		}
	}
	temp = (*(implementacionLRU)).at(conjunto*tamanoConjunto);
	cache[temp] = primerValor;
	(*(implementacionLRU)).insert((*(implementacionLRU)).begin()+(conjunto+1)*tamanoConjunto,temp);
	(*(implementacionLRU)).erase((*(implementacionLRU)).begin()+temp);					
	return false;
}
