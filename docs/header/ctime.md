# Cabeçalho da biblioteca padrão &lt;ctime&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<time.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [data e hora estilo C](<#/doc/chrono/c>).

### Constantes de macro

---
[ CLOCKS_PER_SEC](<#/doc/chrono/c/CLOCKS_PER_SEC>) | número de tiques de clock do processador por segundo
(constante de macro)
[ NULL](<#/doc/types/NULL>) | constante de ponteiro nulo definida pela implementação
(constante de macro)

### Tipos

[ clock_t](<#/doc/chrono/c/clock_t>) | tempo de execução do processo
(typedef)
[ size_t](<#/doc/types/size_t>) | tipo inteiro sem sinal retornado pelo operador [`sizeof`](<#/doc/language/sizeof>)
(typedef)
[ time_t](<#/doc/chrono/c/time_t>) | tipo de tempo desde a época
(typedef)
[ tm](<#/doc/chrono/c/tm>) | tipo de tempo de calendário
(classe)
[ timespec](<#/doc/chrono/c/timespec>)(C++17) | tempo em segundos e nanossegundos
(struct)

### Funções

##### Manipulação de tempo

[ clock](<#/doc/chrono/c/clock>) | retorna o tempo de clock bruto do processador desde o início do programa
(função)
[ time](<#/doc/chrono/c/time>) | retorna a hora atual do sistema como tempo desde a época
(função)
[ difftime](<#/doc/chrono/c/difftime>) | calcula a diferença entre tempos
(função)
[ timespec_get](<#/doc/chrono/c/timespec_get>)(C++17) | retorna o tempo de calendário em segundos e nanossegundos com base em uma dada base de tempo
(função)

##### Conversões de formato

[ ctime](<#/doc/chrono/c/ctime>) | converte um objeto [std::time_t](<#/doc/chrono/c/time_t>) para uma representação textual
(função)
[ asctime](<#/doc/chrono/c/asctime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual
(função)
[ strftime](<#/doc/chrono/c/strftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual personalizada
(função)
[ gmtime](<#/doc/chrono/c/gmtime>) | converte o tempo desde a época para o tempo de calendário expresso como Tempo Universal Coordenado
(função)
[ localtime](<#/doc/chrono/c/localtime>) | converte o tempo desde a época para o tempo de calendário expresso como hora local
(função)
[ mktime](<#/doc/chrono/c/mktime>) | converte o tempo de calendário para o tempo desde a época
(função)

### Sinopse
```cpp
    #define NULL /* see description */
    #define CLOCKS_PER_SEC /* see description */
    #define TIME_UTC /* see description */
    
    namespace std {
      using size_t = /* see description */;
      using clock_t = /* see description */;
      using time_t = /* see description */;
    
      struct timespec;
      struct tm;
    
      clock_t clock();
      double difftime(time_t time1, time_t time0);
      time_t mktime(tm* timeptr);
      time_t time(time_t* timer);
      int timespec_get(timespec* ts, int base);
      char* asctime(const tm* timeptr);
      char* ctime(const time_t* timer);
      tm* gmtime(const time_t* timer);
      tm* localtime(const time_t* timer);
      size_t strftime(char* s, size_t maxsize, const char* format, const tm* timeptr);
    }
```

### Classe [std::timespec](<#/doc/chrono/c/timespec>)
```cpp
    struct timespec {
      std::time_t tv_sec;
      long tv_nsec;
    };
```

### Classe [std::tm](<#/doc/chrono/c/tm>)
```cpp
    struct tm {
      int tm_sec;
      int tm_min;
      int tm_hour;
      int tm_mday;
      int tm_mon;
      int tm_year;
      int tm_wday;
      int tm_yday;
      int tm_isdst;
    };
```