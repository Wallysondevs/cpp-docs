# std::chrono::weekday_indexed

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class weekday_indexed;
```

A classe `weekday_indexed` combina um(a) [`weekday`](<#/doc/chrono/weekday>), representando um dia da semana no [calendário gregoriano proléptico](<https://en.wikipedia.org/wiki/proleptic_Gregorian_calendar> "enwiki:proleptic Gregorian calendar"), com um pequeno índice `_n_` no intervalo `[`1`, `5`]`. Ele representa o primeiro, segundo, terceiro, quarto ou quinto dia da semana de algum mês.

`weekday_indexed` é um(a) [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/chrono/weekday_indexed/weekday_indexed>) | constrói um(a) `weekday_indexed`
(função membro pública)
[ weekday](<#/doc/chrono/weekday_indexed/weekday>) | acessa o(a) [`weekday`](<#/doc/chrono/weekday>) armazenado(a)
(função membro pública)
[ index](<#/doc/chrono/weekday_indexed/index>) | acessa o índice armazenado
(função membro pública)
[ ok](<#/doc/chrono/weekday_indexed/ok>) | verifica se o dia da semana e o índice são ambos válidos
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/chrono/weekday_indexed/operator_cmp>)(C++20) | compara dois valores `weekday_indexed`
(função)
[ operator<<](<#/doc/chrono/weekday_indexed/operator_ltlt>)(C++20) | envia um(a) `weekday_indexed` para um stream
(modelo de função)

### Classes auxiliares

[ std::formatter<std::chrono::weekday_indexed>](<#/doc/chrono/weekday_indexed/formatter>)(C++20) | suporte de formatação para `weekday_indexed`
(especialização de modelo de classe)
[ std::hash<std::chrono::weekday_indexed>](<#/doc/chrono/weekday_indexed/hash>)(C++26) | suporte de hash para `std::chrono::weekday_indexed`
(especialização de modelo de classe)

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::chrono;
    
        constexpr weekday_indexed wi = Friday[2];
    
        // weekday_indexed pode ser usado em qualquer lugar onde chrono::day pode ser usado:
        constexpr year_month_weekday ymwd = 2021y / August / wi;
        static_assert(ymwd == August / wi / 2021y &&
                      ymwd == wi / August / 2021y);
        std::cout << ymwd << '\n';
    
        constexpr year_month_day ymd{ymwd}; // uma conversão
        static_assert(ymd == 2021y / 8 / 13);
        std::cout << ymd << '\n';
    }
```

Saída possível:
```
    2021/Aug/Fri[2]
    2021-08-13
```