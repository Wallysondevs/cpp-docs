# std::time_t

Definido no header `[<ctime>](<#/doc/header/ctime>)`

```cpp
typedef /* unspecified */ time_t;
```

Tipo aritmético capaz de representar tempos.

Embora não definido, este é quase sempre um valor integral que contém o número de segundos (sem contar segundos bissextos) desde 00:00, 1º de janeiro de 1970 UTC, correspondendo ao [tempo POSIX](<https://en.wikipedia.org/wiki/Unix_time> "enwiki:Unix time").

### Veja também

[ time](<#/doc/chrono/c/time>) | retorna o tempo atual do sistema como tempo desde a época
(função)
[ localtime](<#/doc/chrono/c/localtime>) | converte o tempo desde a época para tempo de calendário expresso como tempo local
(função)
[ gmtime](<#/doc/chrono/c/gmtime>) | converte o tempo desde a época para tempo de calendário expresso como Tempo Universal Coordenado
(função)
[ to_time_t](<#/doc/chrono/system_clock/to_time_t>)[static] | converte um ponto no tempo do relógio do sistema para **std::time_t**
(função membro estática pública de `std::chrono::system_clock`)
[Documentação C](<#/>) para time_t