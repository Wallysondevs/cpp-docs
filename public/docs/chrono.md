# Utilitários de data e hora

C++ inclui suporte para dois tipos de manipulação de tempo:

  * A biblioteca `chrono`, uma coleção flexível de tipos que rastreiam o tempo com vários graus de precisão (por exemplo, [std::chrono::time_point](<#/doc/chrono/time_point>)).
  * Biblioteca de data e hora estilo C (por exemplo, [std::time](<#/doc/chrono/c/time>)).

### [Biblioteca Chrono](<#/doc/header/chrono>) (desde C++11)

A biblioteca `chrono` define três(até C++20)cinco(desde C++20) tipos principais, bem como funções utilitárias e typedefs comuns:

  * relógios
  * pontos no tempo
  * durações

  * datas de calendário
  * informações de fuso horário

| (desde C++20)

#### Relógios

Um relógio consiste em um ponto de partida (ou época) e uma taxa de tique. Por exemplo, um relógio pode ter uma época de 1º de janeiro de 1970 e ticar a cada segundo. C++ define vários tipos de relógio:

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`
---
Definido no namespace `std::chrono`

```cpp
 system_clock(C++11)
(class)
 steady_clock(C++11)
(class)
 high_resolution_clock(C++11)
(class)
 is_clockis_clock_v(C++20)
(class template) (variable template)
 utc_clock(C++20)
(class)
 tai_clock(C++20)
(class)
 gps_clock(C++20)
(class)
 file_clock(C++20)
(typedef)
 local_t(C++20)
(class)
```

#### Ponto no tempo

Um ponto no tempo é uma duração de tempo que passou desde a época de um relógio específico.

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`
---
Definido no namespace `std::chrono`

```cpp
 time_point(C++11)
(class template)
 clock_time_conversion(C++20)
(class template)
 clock_cast(C++20)
(function template)
```

#### Duração

Uma duração consiste em um intervalo de tempo, definido como um certo número de tiques de alguma unidade de tempo. Por exemplo, "42 segundos" poderia ser representado por uma duração consistindo de 42 tiques de uma unidade de tempo de 1 segundo.

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`
---
Definido no namespace `std::chrono`

```cpp
 duration(C++11)
(class template)
```

#### Hora do dia (desde C++20)

`hh_mm_ss` divide uma duração que representa o tempo decorrido desde a meia-noite em horas, minutos, segundos e segundos fracionários, conforme aplicável. É principalmente uma ferramenta de formatação.

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`
---
Definido no namespace `std::chrono`

```cpp
 hh_mm_ss(C++20)
(class template)
 is_amis_pmmake12make24(C++20)
(function)
```

#### Calendário (desde C++20)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`
---
Definido no namespace `std::chrono`

```cpp
 last_spec(C++20)
(class)
 day(C++20)
(class)
 month(C++20)
(class)
 year(C++20)
(class)
 weekday(C++20)
(class)
 weekday_indexed(C++20)
(class)
 weekday_last(C++20)
(class)
 month_day(C++20)
(class)
 month_day_last(C++20)
(class)
 month_weekday(C++20)
(class)
 month_weekday_last(C++20)
(class)
 year_month(C++20)
(class)
 year_month_day(C++20)
(class)
 year_month_day_last(C++20)
(class)
 year_month_weekday(C++20)
(class)
 year_month_weekday_last(C++20)
(class)
 operator/(C++20)
(function)
```

#### Fuso horário (desde C++20)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`
---
Definido no namespace `std::chrono`

```cpp
 tzdb(C++20)
(class)
 tzdb_list(C++20)
(class)
 get_tzdbget_tzdb_listreload_tzdbremote_version(C++20)
(function)
 locate_zone(C++20)
(function)
 current_zone(C++20)
(function)
 time_zone(C++20)
(class)
 sys_info(C++20)
(class)
 local_info(C++20)
(class)
 choose(C++20)
(enum)
 zoned_traits(C++20)
(class template)
 zoned_time(C++20)
(class)
 leap_second(C++20)
(class)
 leap_second_info(C++20)
(class)
 get_leap_second_info(C++20)
(function template)
 time_zone_link(C++20)
(class)
 nonexistent_local_time(C++20)
(class)
 ambiguous_local_time(C++20)
(class)
```

#### Literais (desde C++14)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`
---
Definido no inline namespace `std::literals::chrono_literals`

```cpp
 operator""y(C++20)
(function)
 operator""d(C++20)
(function)
 operator""h(C++14)
(function)
 operator""min(C++14)
(function)
 operator""s(C++14)
(function)
 operator""ms(C++14)
(function)
 operator""us(C++14)
(function)
 operator""ns(C++14)
(function)
```

#### E/S Chrono (desde C++20)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`
---
Definido no namespace `std::chrono`

```cpp
 parse(C++20)
(function template)
```

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---
[`__cpp_lib_chrono`](<#/doc/feature_test>) | [`201510L`](<#/>) | (C++17) | Funções de arredondamento para [std::chrono::duration](<#/doc/chrono/duration>) e [std::chrono::time_point](<#/doc/chrono/time_point>)
[`201611L`](<#/>) | (C++17) | constexpr para todas as funções membro de [std::chrono::duration](<#/doc/chrono/duration>) e [std::chrono::time_point](<#/doc/chrono/time_point>)
[`201907L`](<#/>) | (C++20) | [Calendários](<#/doc/chrono>) e [Fusos horários](<#/doc/chrono>)
[`202306L`](<#/>) | (C++26) | Suporte a [Hashing](<#/doc/utility/hash>) para classes de valor `std::chrono`

### [Biblioteca de data e hora estilo C](<#/doc/chrono/c>)

Também são fornecidas as funções de data e hora estilo C, como [std::time_t](<#/doc/chrono/c/time_t>), [std::difftime](<#/doc/chrono/c/difftime>) e [CLOCKS_PER_SEC](<#/doc/chrono/c/CLOCKS_PER_SEC>).

### Exemplo

Mede e exibe o tempo de execução de uma chamada de função.

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    long Fibonacci(unsigned n)
    {
        return n < 2 ? n : Fibonacci(n - 1) + Fibonacci(n - 2);
    }
     
    int main()
    {
        const auto start{std::chrono::steady_clock::now()};
        const auto fb{Fibonacci(42)};
        const auto end{std::chrono::steady_clock::now()};
        const std::chrono::duration<double> elapsed_seconds{end - start};
     
        std::cout << "Fibonacci(42): " << fb << "\nElapsed time: ";
    //  std::cout << elapsed_seconds.count() << "s\n"; // Before C++20
        std::cout << elapsed_seconds << '\n'; // C++20's chrono::duration operator<<
    }
```

Saída possível:
```
    Fibonacci(42): 267914296
    Elapsed time: 0.791429s
```