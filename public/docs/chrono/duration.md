# std::chrono::duration

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template<
class Rep,
class Period = std::ratio<1>
> class duration;
```

O template de classe `std::chrono::duration` representa um intervalo de tempo.

Ele consiste em uma contagem de "ticks" do tipo `Rep` e um período de "tick", onde o período de "tick" é uma [fração](<#/doc/numeric/ratio/ratio>) racional em tempo de compilação que representa o tempo em segundos de um "tick" para o próximo.

O único dado armazenado em um `duration` é uma contagem de "ticks" do tipo `Rep`. Se `Rep` for um tipo de ponto flutuante, então o `duration` pode representar frações de "ticks". `Period` é incluído como parte do tipo do duration e é usado apenas ao converter entre diferentes durations.

### Tipos membro

Tipo membro | Definição
---|---
`rep` | `Rep`, um tipo aritmético, ou uma classe que emula um tipo aritmético, representando o número de "ticks"
`period` | `Period`(até C++17)typename Period::type(desde C++17), um [std::ratio](<#/doc/numeric/ratio/ratio>) representando o período de "tick" (ou seja, o número de frações de segundo por "tick")

### Funções membro

[ (construtor)](<#/doc/chrono/duration/duration>) | constrói um novo duration
(função membro pública)
[ operator=](<#/>) | atribui o conteúdo
(função membro pública)
[ count](<#/doc/chrono/duration/count>) | retorna a contagem de "ticks"
(função membro pública)
[ zero](<#/doc/chrono/duration/zero>)[static] | retorna o valor especial de duration zero
(função membro estática pública)
[ min](<#/doc/chrono/duration/min>)[static] | retorna o valor especial de duration min
(função membro estática pública)
[ max](<#/doc/chrono/duration/max>)[static] | retorna o valor especial de duration max
(função membro estática pública)
[ operator+operator-](<#/doc/chrono/duration/operator_arith>) | implementa os operadores unários + e -
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/duration/operator_arith2>) | incrementa ou decrementa a contagem de "ticks"
(função membro pública)
[ operator+=operator-=operator*=operator/=operator%=](<#/doc/chrono/duration/operator_arith3>) | implementa atribuição composta entre dois durations
(função membro pública)

### Funções não-membro

[ operator+operator-operator*operator/operator%](<#/doc/chrono/duration/operator_arith4>)(C++11) | implementa operações aritméticas com durations como argumentos
(template de função)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/chrono/duration/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara dois durations
(template de função)
[ duration_cast](<#/doc/chrono/duration/duration_cast>)(C++11) | converte um duration para outro, com um intervalo de "tick" diferente
(template de função)
[ floor(std::chrono::duration)](<#/doc/chrono/duration/floor>)(C++17) | converte um duration para outro, arredondando para baixo
(template de função)
[ ceil(std::chrono::duration)](<#/doc/chrono/duration/ceil>)(C++17) | converte um duration para outro, arredondando para cima
(template de função)
[ round(std::chrono::duration)](<#/doc/chrono/duration/round>)(C++17) | converte um duration para outro, arredondando para o mais próximo, empates para o par
(template de função)
[ abs(std::chrono::duration)](<#/doc/chrono/duration/abs>)(C++17) | obtém o valor absoluto do duration
(template de função)
[ operator<<](<#/doc/chrono/duration/operator_ltlt>)(C++20) | realiza a saída de stream em um `duration`
(template de função)
[ from_stream](<#/doc/chrono/duration/from_stream>)(C++20) | analisa um `duration` de um stream de acordo com o formato fornecido
(template de função)

### Tipos auxiliares

Um tipo /* intXX */ usado na tabela abaixo significa um tipo inteiro com sinal de pelo menos XX bits.

Tipo | Definição
---|---
`std::chrono::nanoseconds` | std::chrono::duration</* int64 */, [std::nano](<#/doc/numeric/ratio/ratio>)>
`std::chrono::microseconds` | std::chrono::duration</* int55 */, [std::micro](<#/doc/numeric/ratio/ratio>)>
`std::chrono::milliseconds` | std::chrono::duration</* int45 */, [std::milli](<#/doc/numeric/ratio/ratio>)>
`std::chrono::seconds` | std::chrono::duration</* int35 */>
`std::chrono::minutes` | std::chrono::duration</* int29 */, [std::ratio](<#/doc/numeric/ratio/ratio>)<60>>
`std::chrono::hours` | std::chrono::duration</* int23 */, [std::ratio](<#/doc/numeric/ratio/ratio>)<3600>>
`std::chrono::days` (desde C++20) | std::chrono::duration</* int25 */, [std::ratio](<#/>)<86400>>
`std::chrono::weeks` (desde C++20) | std::chrono::duration</* int22 */, [std::ratio](<#/doc/numeric/ratio/ratio>)<604800>>
`std::chrono::months` (desde C++20) | std::chrono::duration</* int20 */, [std::ratio](<#/doc/numeric/ratio/ratio>)<2629746>>
`std::chrono::years` (desde C++20) | std::chrono::duration</* int17 */, [std::ratio](<#/doc/numeric/ratio/ratio>)<31556952>>

Nota: cada um dos tipos de duration predefinidos até `hours` cobre um intervalo de pelo menos ±292 anos.

Cada um dos tipos de duration predefinidos `days`, `weeks`, `months` e `years` cobre um intervalo de pelo menos ±40000 anos. `years` é igual a 365.2425 `days` (a duração média de um ano Gregoriano). `months` é igual a 30.436875 `days` (exatamente 1/12 de `years`). | (desde C++20)

### Classes auxiliares

[ std::common_type<std::chrono::duration>](<#/doc/chrono/duration/common_type>)(C++11) | especializa o trait [std::common_type](<#/doc/types/common_type>)
(especialização de template de classe)
[ treat_as_floating_point](<#/doc/chrono/treat_as_floating_point>)(C++11) | indica que um duration é conversível para duration com período de "tick" diferente
(template de classe)
[ duration_values](<#/doc/chrono/duration_values>)(C++11) | constrói os valores zero, min e max de uma contagem de "ticks" de um dado tipo
(template de classe)
[ std::formatter<std::chrono::duration>](<#/doc/chrono/duration/formatter>)(C++20) | suporte de formatação para `duration`
(especialização de template de classe)
[ std::hash<std::chrono::duration>](<#/doc/chrono/duration/hash>)(C++26) | suporte a hash para `std::chrono::duration`
(especialização de template de classe)

### Especializações auxiliares

```cpp
template< class Rep, class Period >
constexpr bool enable_nonlocking_formatter_optimization<chrono::duration<Rep, Period>>
= enable_nonlocking_formatter_optimization<Rep>;  // (desde C++23)
```

Esta especialização de [`std::enable_nonlocking_formatter_optimization`](<#/doc/utility/format/enable_nonlocking_formatter_optimization>) permite uma implementação eficiente de [`std::print`](<#/doc/io/print>) e [`std::println`](<#/doc/io/println>) para imprimir um objeto `chrono::duration` quando o parâmetro de template `Rep` o permite.

### Literais

Definido no namespace inline `std::literals::chrono_literals`
---
```cpp
 operator""h(C++14) | um literal **std::chrono::duration** representando horas
(função)
 operator""min(C++14) | um literal **std::chrono::duration** representando minutos
(função)
 operator""s(C++14) | um literal **std::chrono::duration** representando segundos
(função)
 operator""ms(C++14) | um literal **std::chrono::duration** representando milissegundos
(função)
 operator""us(C++14) | um literal **std::chrono::duration** representando microssegundos
(função)
 operator""ns(C++14) | um literal **std::chrono::duration** representando nanossegundos
(função)
Nota: os sufixos literais `d` e `y` não se referem a `days` e `years`, mas sim a `day` e `year`, respectivamente.  // (desde C++20)
```

### Notas

O intervalo de tempo real (em segundos) mantido por um objeto duration `d` é aproximadamente igual a `d.count() * D::period::num / D::period::den`, onde `D` é do tipo `chrono::duration<>` e `d` é um objeto desse tipo.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_chrono_udls`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | [Literais definidos pelo usuário para tipos de tempo](<#/doc/chrono/duration>)

### Exemplo

Este exemplo mostra como definir vários tipos de duration personalizados e converter entre tipos:

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    using namespace std::chrono_literals;
     
    template<typename T1, typename T2>
    using mul = std::ratio_multiply<T1, T2>;
     
    int main()
    {
        using microfortnights = std::chrono::duration<float,
            mul<mul<std::ratio<2>, std::chrono::weeks::period>, std::micro>>;
        using nanocenturies = std::chrono::duration<float,
            mul<mul<std::hecto, std::chrono::years::period>, std::nano>>;
        using fps_24 = std::chrono::duration<double, std::ratio<1, 24>>;
     
        std::cout << "1 second is:\n";
     
        // conversão de escala inteira sem perda de precisão: sem cast
        std::cout << std::chrono::milliseconds(1s).count() << " milliseconds\n"
                  << std::chrono::microseconds(1s).count() << " microseconds\n"
                  << std::chrono::nanoseconds(1s).count() << " nanoseconds\n";
     
        // conversão de escala inteira com perda de precisão: requer um cast
        std::cout << std::chrono::duration_cast<std::chrono::minutes>(1s).count()
                  << " minutes\n";
        // alternativa a duration_cast:
        std::cout << 1s / 1min << " minutes\n";
     
        // conversão de escala de ponto flutuante: sem cast
        std::cout << microfortnights(1s).count() << " microfortnights\n"
                  << nanocenturies(1s).count() << " nanocenturies\n"
                  << fps_24(1s).count() << " frames at 24fps\n";
    }
```

Saída:
```
    1 second is:
    1000 milliseconds
    1000000 microseconds
    1000000000 nanoseconds
    0 minutes
    0 minutes
    0.82672 microfortnights
    0.316887 nanocenturies
    24 frames at 24fps
```
* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
* [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão