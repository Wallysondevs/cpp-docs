# std::chrono::gps_clock

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class gps_clock;
```

O relógio `std::chrono::gps_clock` é um [Clock](<#/doc/named_req/Clock>) que representa o tempo do Sistema de Posicionamento Global (GPS). Ele mede o tempo desde 00:00:00, 6 de janeiro de 1980 UTC.

Segundos bissextos não são inseridos no GPS. Assim, toda vez que um segundo bissexto é inserido no UTC, o UTC fica mais um segundo atrasado em relação ao GPS. Em dezembro de 2017, o UTC estava 18 segundos atrasado em relação ao GPS, refletindo os 18 segundos bissextos inseridos entre 1980 e 2017. Assim, 2018-01-01 00:00:00 UTC é equivalente a 2018-01-01 00:00:18 GPS. O GPS está constantemente 19 segundos atrasado em relação ao [TAI](<#/doc/chrono/tai_clock>).

`gps_clock` atende aos requisitos de [Clock](<#/doc/named_req/Clock>). Ele não atende aos requisitos de [TrivialClock](<#/doc/named_req/TrivialClock>) a menos que a implementação possa garantir que [`now()`](<#/doc/chrono/gps_clock/now>) não lance uma exceção.

### Família de time_point

Definido no namespace `std::chrono`

```cpp
template<class Duration>
using gps_time = std::chrono::time_point<std::chrono::gps_clock, Duration>;  // (desde C++20)
using gps_seconds = gps_time<std::chrono::seconds>;  // (desde C++20)
```

[ operator<<(std::chrono::gps_time)](<#/doc/chrono/gps_clock/operator_ltlt>)(C++20) | realiza a saída de stream em um `gps_time`
(modelo de função)
[ from_stream(std::chrono::gps_time)](<#/doc/chrono/gps_clock/from_stream>)(C++20) | analisa um `gps_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ std::formatter<std::chrono::gps_time>](<#/doc/chrono/gps_clock/formatter>)(C++20) | suporte de formatação para `gps_time`
(especialização de modelo de classe)

### Tipos de membros

Tipo de membro | Definição
---|---
`rep` | tipo aritmético com sinal que representa o número de ticks na duração do relógio
`period` | um tipo [std::ratio](<#/doc/numeric/ratio/ratio>) que representa o período de tick do relógio, em segundos
`duration` | [std::chrono::duration](<#/doc/chrono/duration>)<rep, period>, capaz de representar durações negativas
`time_point` | [std::chrono::time_point](<#/doc/chrono/time_point>)<std::chrono::gps_clock>

### Constantes de membros

constexpr bool is_steady[static] | verdadeiro se o tempo entre os ticks for sempre constante, ou seja, chamadas para [`now()`](<#/doc/chrono/gps_clock/now>) retornam valores que aumentam monotonicamente mesmo em caso de algum ajuste de relógio externo, caso contrário falso
(constante de membro estática pública)

### Funções de membros

[ now](<#/doc/chrono/gps_clock/now>)[static] | retorna um [std::chrono::time_point](<#/doc/chrono/time_point>) que representa o ponto atual no tempo
(função de membro estática pública)
[ to_utc](<#/doc/chrono/gps_clock/to_utc>)[static] | converte um `gps_time` para `utc_time`
(função de membro estática pública)
[ from_utc](<#/doc/chrono/gps_clock/from_utc>)[static] | converte um `utc_time` para `gps_time`
(função de membro estática pública)