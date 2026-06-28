# std::time

Definido no header `[<ctime>](<#/doc/header/ctime>)`

```cpp
std::time_t time( std::time_t* arg );
```

Retorna o tempo de calendário atual codificado como um objeto [std::time_t](<#/doc/chrono/c/time_t>), e também o armazena no objeto apontado por arg, a menos que arg seja um ponteiro nulo.

### Parâmetros

- **arg** — ponteiro para um objeto [std::time_t](<#/doc/chrono/c/time_t>) para armazenar o tempo, ou um ponteiro nulo

### Valor de retorno

Tempo de calendário atual codificado como objeto [std::time_t](<#/doc/chrono/c/time_t>) em caso de sucesso, ([std::time_t](<#/doc/chrono/c/time_t>))(-1) em caso de erro. Se arg não for nulo, o valor de retorno também é armazenado no objeto apontado por arg.

### Notas

A codificação do tempo de calendário em [std::time_t](<#/doc/chrono/c/time_t>) é não especificada, mas a maioria dos sistemas está em conformidade com a [especificação POSIX](<https://pubs.opengroup.org/onlinepubs/9799919799/functions/time.html>) e retorna um valor de tipo integral que contém 86400 vezes o número de dias de calendário desde [a Época](<https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap04.html#tag_04_16>) mais o número de segundos que se passaram desde a última meia-noite UTC. Mais notavelmente, o tempo POSIX não leva (e não pode levar) em conta os segundos bissextos, de modo que este valor integral não é igual ao número de [segundos S.I.](<https://en.wikipedia.org/wiki/SI_base_unit#Definitions> "enwiki:SI base unit") que se passaram desde a época, mas sim é reduzido pelo número de segundos bissextos que ocorreram desde a época. Implementações nas quais [std::time_t](<#/doc/chrono/c/time_t>) é um inteiro assinado de 32 bits (muitas implementações históricas) falham no ano [2038](<https://en.wikipedia.org/wiki/Year_2038_problem> "enwiki:Year 2038 problem").

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iostream>
     
    int main()
    {
        std::time_t result = std::time(nullptr);
        std::cout << std::asctime(std::localtime(&result))
                  << result << " seconds since the Epoch\n";
    }
```

Saída possível:
```
    Wed Sep 21 10:27:52 2011
    1316615272 seconds since the Epoch
```

### Veja também

[ timespec_get](<#/doc/chrono/c/timespec_get>)(C++17) | retorna o tempo de calendário em segundos e nanossegundos com base em uma dada base de tempo
(função)
[ localtime](<#/doc/chrono/c/localtime>) | converte o tempo desde a época para o tempo de calendário expresso como tempo local
(função)
[ gmtime](<#/doc/chrono/c/gmtime>) | converte o tempo desde a época para o tempo de calendário expresso como Tempo Universal Coordenado
(função)
[ system_clock](<#/doc/chrono/system_clock>)(desde C++11) | tempo de relógio de parede do relógio de tempo real de todo o sistema
(classe)
[documentação C](<#/>) para time