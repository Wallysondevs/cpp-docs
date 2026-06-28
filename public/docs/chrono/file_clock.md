# std::chrono::file_clock

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
using file_clock = /* see below */;
```

`std::chrono::file_clock` é um alias para o clock usado para [std::filesystem::file_time_type](<#/doc/filesystem/file_time_type>). Sua época é não especificada.

`file_clock` atende aos requisitos de [TrivialClock](<#/doc/named_req/TrivialClock>).

### Time point family

Definido no namespace `std::chrono`

```cpp
template<class Duration>
using file_time = std::chrono::time_point<std::chrono::file_clock, Duration>;  // (desde C++20)
```

[ operator<<(std::chrono::file_time)](<#/doc/chrono/file_clock/operator_ltlt>)(C++20) | realiza saída de stream em um `file_time`
(modelo de função)
[ from_stream(std::chrono::file_time)](<#/doc/chrono/file_clock/from_stream>)(C++20) | analisa um `file_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ std::formatter<std::chrono::file_time>](<#/doc/chrono/file_clock/formatter>)(C++20) | suporte a formatação para `file_time`
(especialização de modelo de classe)

### Member types

Tipo membro | Definição
---|---
`rep` | tipo aritmético com sinal representando o número de ticks na duração do clock
`period` | um tipo [std::ratio](<#/doc/numeric/ratio/ratio>) representando o período de tick do clock, em segundos
`duration` | [std::chrono::duration](<#/doc/chrono/duration>)<rep, period>, capaz de representar durações negativas
`time_point` | [std::chrono::time_point](<#/doc/chrono/time_point>)<std::chrono::file_clock>

### Member constants

constexpr bool is_steady[static] | verdadeiro se o tempo entre os ticks for sempre constante, ou seja, chamadas para [`now()`](<#/doc/chrono/file_clock/now>) retornam valores que aumentam monotonicamente mesmo em caso de algum ajuste de clock externo, caso contrário falso
(constante membro estática pública)

### Member functions

`file_clock` fornece exatamente um dos dois pares de funções membro estáticas a seguir:

* `to_utc` e `from_utc`; ou
* `to_sys` e `from_sys`.

[ now](<#/doc/chrono/file_clock/now>)[static] | retorna um [std::chrono::time_point](<#/doc/chrono/time_point>) representando o ponto atual no tempo
(função membro estática pública)
[ to_utcfrom_utc](<#/doc/chrono/file_clock/to_from_utc>)[static] (opcional) | converte entre `file_time` e `utc_time`
(função membro estática pública)
[ to_sysfrom_sys](<#/doc/chrono/file_clock/to_from_sys>)[static] (opcional) | converte entre `file_time` e `sys_time`
(função membro estática pública)