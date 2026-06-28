# std::chrono::zoned_time

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<
class Duration,
class TimeZonePtr = const std::chrono::time_zone*
> class zoned_time;
using zoned_seconds = std::chrono::zoned_time<std::chrono::seconds>;
```

A classe `zoned_time` representa um emparelhamento lógico de um fuso horário e um [std::chrono::time_point](<#/doc/chrono/time_point>) cuja resolução é `Duration`.

Um invariante de `zoned_time` é que ele sempre se refere a um fuso horário válido e representa um ponto no tempo existente e não ambíguo nesse fuso horário. Consistente com este invariante, `zoned_time` não possui construtor de movimento ou operador de atribuição de movimento; tentativas de mover um `zoned_time` realizarão uma cópia.

O programa é malformado se `Duration` não for uma especialização de [std::chrono::duration](<#/doc/chrono/duration>).

O parâmetro de template `TimeZonePtr` permite que os usuários forneçam seus próprios tipos de ponteiro de fuso horário e personalizem ainda mais o comportamento de `zoned_time` via std::chrono::zoned_traits. Tipos de fuso horário personalizados não precisam suportar todas as operações suportadas por std::chrono::time_zone, apenas aquelas usadas pelas funções realmente chamadas no `zoned_time`.

`TimeZonePtr` deve ser [MoveConstructible](<#/doc/named_req/MoveConstructible>). `TimeZonePtr`s somente de movimento são permitidos, mas difíceis de usar, pois o `zoned_time` será imóvel e não será possível acessar o `TimeZonePtr` armazenado.

### Tipos Membro

Tipo Membro | Definição
---|---
`duration` | [std::common_type_t](<#/doc/types/common_type>)<Duration, [std::chrono::seconds](<#/doc/chrono/duration>)>

### Funções Membro

```cpp
 (construtor) | constrói um `zoned_time`
(função membro pública)
 operator= | atribui valor a um `zoned_time`
(função membro pública)
 get_time_zone | obtém uma cópia do ponteiro do fuso horário
(função membro pública)
 operator local_timeget_local_time | obtém o ponto no tempo armazenado como um `local_time`
(função membro pública)
 operator sys_timeget_sys_time | obtém o ponto no tempo armazenado como um `sys_time`
(função membro pública)
 get_info | obtém informações sobre o fuso horário no ponto no tempo armazenado
(função membro pública)
```

### Funções Não-Membro

```cpp
 operator==(C++20) | compara dois valores `zoned_time`
(template de função)
 operator<<(C++20) | envia um `zoned_time` para um stream
(template de função)
```

### Classes Auxiliares

[ std::formatter<std::chrono::zoned_time>](<#/doc/chrono/zoned_time/formatter>)(C++20) | suporte de formatação para `zoned_time`
---|---
(especialização de template de classe) |
[ std::hash<std::chrono::zoned_time>](<#/doc/chrono/zoned_time/hash>)(C++26) | suporte a hash para `std::chrono::zoned_time`
(especialização de template de classe) |

### Especializações Auxiliares

```cpp
template< class Duration >
constexpr bool enable_nonlocking_formatter_optimization
<chrono::zoned_time<Duration, const chrono::time_zone*>> = true;  // (desde C++23)
```

Esta especialização de [`std::enable_nonlocking_formatter_optimization`](<#/doc/utility/format/enable_nonlocking_formatter_optimization>) permite a implementação eficiente de [`std::print`](<#/doc/io/print>) e [`std::println`](<#/doc/io/println>) para imprimir um objeto `chrono::zoned_time`.

### [Guias de Dedução](<#/doc/chrono/zoned_time/deduction_guides>)

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    #include <stdexcept>
    #include <string_view>
    
    int main()
    {
        constexpr std::string_view locations[] =
        {
            "Africa/Casablanca",   "America/Argentina/Buenos_Aires",
            "America/Barbados",    "America/Indiana/Petersburg",
            "America/Tarasco_Bar", "Antarctica/Casey",
            "Antarctica/Vostok",   "Asia/Magadan",
            "Asia/Manila",         "Asia/Shanghai",
            "Asia/Tokyo",          "Atlantic/Bermuda",
            "Australia/Darwin",    "Europe/Isle_of_Man",
            "Europe/Laputa",       "Indian/Christmas",
            "Indian/Cocos",        "Pacific/Galapagos",
        };
    
        constexpr auto width = std::ranges::max_element(locations, {},
            { return s.length(); })->length();
    
        for (const auto location : locations)
            try
            {
                // may throw if 'location' is not in the time zone database
                const std::chrono::zoned_time zt{location, std::chrono::system_clock::now()};
                std::cout << std::setw(width) << location << " - Zoned Time: " << zt << '\n';
            }
            catch (std::runtime_error& ex)
            {
                std::cout << "Error: " << ex.what() << '\n';
            }
    }
```

Saída possível:
```
                 Africa/Casablanca - Zoned Time: 2023-06-29 20:58:34.697449319 +01
    America/Argentina/Buenos_Aires - Zoned Time: 2023-06-29 16:58:34.709957354 -03
                  America/Barbados - Zoned Time: 2023-06-29 15:58:34.709977888 AST
        America/Indiana/Petersburg - Zoned Time: 2023-06-29 15:58:34.709998072 EDT
    Error: tzdb: cannot locate zone: America/Tarasco_Bar
                  Antarctica/Casey - Zoned Time: 2023-06-30 06:58:34.710093685 +11
                 Antarctica/Vostok - Zoned Time: 2023-06-30 01:58:34.710107932 +06
                      Asia/Magadan - Zoned Time: 2023-06-30 06:58:34.710121831 +11
                       Asia/Manila - Zoned Time: 2023-06-30 03:58:34.710134751 PST
                     Asia/Shanghai - Zoned Time: 2023-06-30 03:58:34.710153259 CST
                        Asia/Tokyo - Zoned Time: 2023-06-30 04:58:34.710172815 JST
                  Atlantic/Bermuda - Zoned Time: 2023-06-29 16:58:34.710191043 ADT
                  Australia/Darwin - Zoned Time: 2023-06-30 05:28:34.710236720 ACST
                Europe/Isle_of_Man - Zoned Time: 2023-06-29 20:58:34.710256834 BST
    Error: tzdb: cannot locate zone: Europe/Laputa
                  Indian/Christmas - Zoned Time: 2023-06-30 02:58:34.710360409 +07
                      Indian/Cocos - Zoned Time: 2023-06-30 02:28:34.710377520 +0630
                 Pacific/Galapagos - Zoned Time: 2023-06-29 13:58:34.710389952 -06
```

### Veja também

[ time_zone](<#/doc/chrono/time_zone>)(C++20) | representa um fuso horário
---|---
(classe) |
---