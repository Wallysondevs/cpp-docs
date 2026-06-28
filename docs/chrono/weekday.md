# std::chrono::weekday

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class weekday;
inline constexpr std::chrono::weekday Sunday{0};
inline constexpr std::chrono::weekday Monday{1};
inline constexpr std::chrono::weekday Tuesday{2};
inline constexpr std::chrono::weekday Wednesday{3};
inline constexpr std::chrono::weekday Thursday{4};
inline constexpr std::chrono::weekday Friday{5};
inline constexpr std::chrono::weekday Saturday{6};
```

A classe `weekday` representa um dia da semana no [calendário gregoriano proléptico](<https://en.wikipedia.org/wiki/proleptic_Gregorian_calendar> "enwiki:proleptic Gregorian calendar"). Seu intervalo normal é `[`0`, `6`]`, para Domingo a Sábado, mas pode conter qualquer valor no intervalo `[`0`, `255`]`. Sete constantes nomeadas são predefinidas no namespace `std::chrono` para os sete dias da semana.

`weekday` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/chrono/weekday/weekday>) | constrói um `weekday`
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/weekday/operator_inc_dec>) | incrementa ou decrementa o dia da semana
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/weekday/operator_arith>) | adiciona ou subtrai um número de dias
(função membro pública)
[ c_encodingiso_encoding](<#/doc/chrono/weekday/encoding>) | recupera o valor do dia da semana armazenado
recupera o valor do dia da semana ISO 8601
(função membro pública)
[ ok](<#/doc/chrono/weekday/ok>) | verifica se o valor do dia da semana armazenado é válido
(função membro pública)
[ operator[]](<#/doc/chrono/weekday/operator_at>) | sintaxe de conveniência para construir um [`weekday_indexed`](<#/doc/chrono/weekday_indexed>) ou [`weekday_last`](<#/doc/chrono/weekday_last>) a partir deste `weekday`
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/chrono/weekday/operator_cmp>)(C++20) | compara dois valores `weekday`
(função)
[ operator+operator-](<#/doc/chrono/weekday/operator_arith_2>)(C++20) | realiza operações aritméticas em `weekday`s
(função)
[ operator<<](<#/doc/chrono/weekday/operator_ltlt>)(C++20) | envia um `weekday` para um stream
(modelo de função)
[ from_stream](<#/doc/chrono/weekday/from_stream>)(C++20) | analisa um `weekday` de um stream de acordo com o formato fornecido
(modelo de função)

### Classes auxiliares

[ std::formatter<std::chrono::weekday>](<#/doc/chrono/weekday/formatter>)(C++20) | suporte a formatação para `weekday`
(especialização de modelo de classe)
[ std::hash<std::chrono::weekday>](<#/doc/chrono/weekday/hash>)(C++26) | suporte a hash para `std::chrono::weekday`
(especialização de modelo de classe)

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        std::chrono::weekday x{42 / 13};
        std::cout << x++ << '\n';
        std::cout << x << '\n';
        std::cout << ++x << '\n';
    }
```

Saída:
```
    Wed
    Thu
    Fri
```

### Veja também

[ weekday_indexed](<#/doc/chrono/weekday_indexed>)(C++20) | representa o enésimo `weekday` de um mês
(classe)