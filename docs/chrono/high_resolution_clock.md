# std::chrono::high_resolution_clock

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class high_resolution_clock;
```

A classe `std::chrono::high_resolution_clock` representa o relógio com o menor período de tick fornecido pela implementação. Pode ser um alias de [std::chrono::system_clock](<#/doc/chrono/system_clock>) ou [std::chrono::steady_clock](<#/doc/chrono/steady_clock>), ou um terceiro relógio independente.

`std::chrono::high_resolution_clock` atende aos requisitos de [TrivialClock](<#/doc/named_req/TrivialClock>).

### Tipos Membro

Tipo | Definição
---|---
`rep` | tipo aritmético representando o número de ticks na duração do relógio
`period` | um tipo [std::ratio](<#/doc/numeric/ratio/ratio>) representando o período de tick do relógio, em segundos
`duration` | [std::chrono::duration](<#/doc/chrono/duration>)<rep, period>
`time_point` | [std::chrono::time_point](<#/doc/chrono/time_point>)<std::chrono::high_resolution_clock>

### Constantes Membro

constexpr bool is_steady[static] | true se o tempo entre os ticks for sempre constante, ou seja, chamadas para [`now()`](<#/doc/chrono/high_resolution_clock/now>) retornam valores que aumentam monotonicamente mesmo em caso de algum ajuste externo do relógio, caso contrário false
(constante membro estática pública)

### Funções Membro

[ now](<#/doc/chrono/high_resolution_clock/now>)[static] | retorna um [std::chrono::time_point](<#/doc/chrono/time_point>) representando o valor atual do relógio
(função membro estática pública)

### Notas

Tem havido alguma controvérsia em torno do uso de `high_resolution_clock`. Howard Hinnant, que afirma ter introduzido `high_resolution_clock` na linguagem, declarou em 2016 na [lista de discussão do Padrão ISO C++](<https://lists.isocpp.org/mailman/listinfo.cgi/std-discussion>) que era a favor de sua depreciação. Sua justificativa era que, como o padrão permite que seja um alias para [std::chrono::steady_clock](<#/doc/chrono/steady_clock>) ou [std::chrono::system_clock](<#/doc/chrono/system_clock>), seu uso adiciona incerteza a um programa sem benefício. No entanto, outros participantes da discussão se manifestaram a seu favor, por exemplo, com base no fato de que, como nem [std::chrono::steady_clock](<#/doc/chrono/steady_clock>) nem [std::chrono::system_clock](<#/doc/chrono/steady_clock>) vêm com quaisquer garantias de resolução particulares, `high_resolution_clock` desempenha um papel útil ao dar ao fornecedor a oportunidade de fornecer o relógio de maior resolução da plataforma, quando nem seu [std::chrono::steady_clock](<#/doc/chrono/steady_clock>) nem seu [std::chrono::system_clock](<#/doc/chrono/system_clock>) seriam isso.

Frequentemente, é apenas um alias para [std::chrono::steady_clock](<#/doc/chrono/steady_clock>) ou [std::chrono::system_clock](<#/doc/chrono/system_clock>), mas qual deles é depende da biblioteca ou configuração. Quando é um `system_clock`, não é monotônico (por exemplo, o tempo pode retroceder). Por exemplo, a partir de 2023, o libstdc++ o tem como alias para `system_clock` "até que definições maiores que nanossegundos se tornem viáveis"[1](<#/doc/chrono/high_resolution_clock>), o MSVC o tem como `steady_clock`[2](<#/doc/chrono/high_resolution_clock>), e o libc++ usa `steady_clock` quando a implementação da standard library C++ suporta um relógio monotônico e `system_clock` caso contrário[3](<#/doc/chrono/high_resolution_clock>).

### Veja também

[ system_clock](<#/doc/chrono/system_clock>)(C++11) | tempo de relógio de parede do relógio em tempo real de todo o sistema
(classe)
[ steady_clock](<#/doc/chrono/steady_clock>)(C++11) | relógio monotônico que nunca será ajustado
(classe)

### Links externos

  1. [↑](<#/doc/chrono/high_resolution_clock>) [libstdc++ `<chrono.h>`](<https://github.com/gcc-mirror/gcc/blob/63663e4e69527b308687c63bacb0cc038b386593/libstdc%2B%2B-v3/include/bits/chrono.h#L1285>)
  2. [↑](<#/doc/chrono/high_resolution_clock>) [MSVC `high_resolution_clock`](<https://learn.microsoft.com/en-us/cpp/standard-library/high-resolution-clock-struct?view=msvc-170>)
  3. [↑](<#/doc/chrono/high_resolution_clock>) [libc++ `<high_resolution_clock.h>`](<https://github.com/llvm/llvm-project/blob/aa97f6b4947e599e17e900aebd511d8d497c3be9/libcxx/include/__chrono/high_resolution_clock.h#L26>)

---