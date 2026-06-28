# std::chrono::system_clock

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class system_clock;
```

A classe `std::chrono::system_clock` representa o relógio de parede de tempo real de todo o sistema.

Pode não ser monotônico: na maioria dos sistemas, o tempo do sistema pode ser ajustado a qualquer momento. É o único relógio C++ que tem a capacidade de mapear seus pontos de tempo para o tempo estilo C.

`std::chrono::system_clock` atende aos requisitos de [TrivialClock](<#/doc/named_req/TrivialClock>).

A época de `system_clock` é não especificada, mas a maioria das implementações usa o Tempo Unix (ou seja, tempo desde 00:00:00 Tempo Universal Coordenado (UTC), quinta-feira, 1 de janeiro de 1970, sem contar segundos bissextos). | (até C++20)
---|---
`system_clock` mede o Tempo Unix (ou seja, tempo desde 00:00:00 Tempo Universal Coordenado (UTC), quinta-feira, 1 de janeiro de 1970, sem contar segundos bissextos). | (desde C++20)

### Família de pontos de tempo

Definido no namespace `std::chrono`

```cpp
template<class Duration>
using sys_time = std::chrono::time_point<std::chrono::system_clock, Duration>;  // (desde C++20)
using sys_seconds = sys_time<std::chrono::seconds>;  // (desde C++20)
using sys_days = sys_time<std::chrono::days>;  // (desde C++20)
```

[ operator<<(std::chrono::sys_time)](<#/doc/chrono/system_clock/operator_ltlt>)(C++20) | realiza saída de stream em um `sys_time`
(modelo de função)
[ from_stream(std::chrono::sys_time)](<#/doc/chrono/system_clock/from_stream>)(C++20) | analisa um `sys_time` de um stream de acordo com o formato fornecido
(modelo de função)
[ std::formatter<std::chrono::sys_time>](<#/doc/chrono/system_clock/formatter>)(C++20) | suporte de formatação para `sys_time`
(especialização de modelo de classe)

### Tipos de membros

Tipo de membro | Definição
---|---
`rep` | tipo aritmético assinado que representa o número de tiques na duração do relógio
`period` | um tipo [std::ratio](<#/doc/numeric/ratio/ratio>) que representa o período de tique do relógio, em segundos
`duration` | [std::chrono::duration](<#/doc/chrono/duration>)<rep, period>, capaz de representar durações negativas
`time_point` | [std::chrono::time_point](<#/doc/chrono/time_point>)<std::chrono::system_clock>

### Constantes de membro

constexpr bool is_steady[static] | verdadeiro se o tempo entre os tiques for sempre constante, ou seja, chamadas para [`now()`](<#/doc/chrono/system_clock/now>) retornam valores que aumentam monotonicamente mesmo em caso de algum ajuste de relógio externo, caso contrário, falso
(constante de membro estática pública)

### Funções de membro

[ now](<#/doc/chrono/system_clock/now>)[static] | retorna um [std::chrono::time_point](<#/doc/chrono/time_point>) representando o ponto atual no tempo
(função de membro estática pública)
[ to_time_t](<#/doc/chrono/system_clock/to_time_t>)[static] | converte um ponto de tempo do relógio do sistema para [std::time_t](<#/doc/chrono/c/time_t>)
(função de membro estática pública)
[ from_time_t](<#/doc/chrono/system_clock/from_time_t>)[static] | converte [std::time_t](<#/doc/chrono/c/time_t>) para um ponto de tempo do relógio do sistema
(função de membro estática pública)

### Notas

O valor de tempo de `system_clock` pode ser ajustado internamente a qualquer momento pelo sistema operacional, por exemplo, devido à sincronização NTP ou ao usuário alterando o relógio do sistema. No entanto, o Horário de Verão e as mudanças de fuso horário não o afetam, pois ele é baseado no fuso horário [UTC](<https://en.wikipedia.org/wiki/Coordinated_Universal_Time>).

### Veja também

[ steady_clock](<#/doc/chrono/steady_clock>)(C++11) | relógio monotônico que nunca será ajustado
(classe)
[ high_resolution_clock](<#/doc/chrono/high_resolution_clock>)(C++11) | o relógio com o menor período de tique disponível
(classe)