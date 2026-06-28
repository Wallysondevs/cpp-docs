# std::chrono::leap_second_info

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
struct leap_second_info {
bool is_leap_second;
std::chrono::seconds elapsed;
};
```

Um `leap_second_info` indica se um horário UTC está durante uma inserção de segundo bissexto positivo e o número total de segundos bissextos entre 1º de janeiro de 1970 e o horário UTC.

`leap_second_info` não possui classes base ou membros além de is_leap_second, elapsed e funções membro especiais implicitamente declaradas.

### Objetos membro

is_leap_second | se o horário UTC está durante uma inserção de segundo bissexto positivo
(objeto membro público)
elapsed | a soma dos segundos bissextos entre 1º de janeiro de 1970 e o horário UTC
(objeto membro público)

### Notas

`leap_second_info` é tipicamente obtido de [std::chrono::get_leap_second_info](<#/doc/chrono/utc_clock/get_leap_second_info>).

### Veja também

[ leap_second](<#/doc/chrono/leap_second>)(C++20) | contém informações sobre uma inserção de segundo bissexto
(classe)