# std::chrono::get_leap_second_info

Definido no header `[<chrono>](<#/doc/header/chrono>)`

```cpp
template< class Duration >
std::chrono::leap_second_info
get_leap_second_info( const std::chrono::utc_time<Duration>& ut );  // (desde C++20)
```

Obtém um [std::chrono::leap_second_info](<#/doc/chrono/utc_clock/leap_second_info>) cujos membros `is_leap_second` e `elapsed` indicam se `ut` está durante uma inserção de segundo bissexto positivo e a soma dos segundos bissextos entre 1 de janeiro de 1970 e `ut`, respectivamente.

### Parâmetros

- **ut** — Tempo UTC a ser examinado

### Valor de retorno

Um valor `leap_second_info` especificado acima.

### Exceções

Pode lançar exceções definidas pela implementação.

### Veja também

[ leap_second_info](<#/doc/chrono/utc_clock/leap_second_info>)(C++20) | informações de inserção de segundo bissexto
(class)
[ leap_second](<#/doc/chrono/leap_second>)(C++20) | contém informações sobre uma inserção de segundo bissexto
(class)