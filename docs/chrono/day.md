# std::chrono::day

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class day;
```

A classe `day` representa um dia em um mês. Seu intervalo normal é `[`1`, `31`]`, mas pode conter qualquer número em `[`​0​`, `255`]`.

`day` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (constructor)](<#/doc/chrono/day/day>) | constrói um `day`
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/day/operator_inc_dec>) | incrementa ou decrementa o dia
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/day/operator_arith>) | adiciona ou subtrai um número de dias
(função membro pública)
[ operator unsigned](<#/doc/chrono/day/operator_unsigned>) | recupera o valor do dia armazenado
(função membro pública)
[ ok](<#/doc/chrono/day/ok>) | verifica se o valor do dia armazenado está no intervalo normal
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/chrono/day/operator_cmp>)(C++20) | compara dois valores `day`
(função)
[ operator+operator-](<#/doc/chrono/day/operator_arith_2>)(C++20) | adiciona ou subtrai um número de dias e um `day`, ou encontra a diferença entre dois `day`s
(função)
[ operator<<](<#/doc/chrono/day/operator_ltlt>)(C++20) | envia um `day` para um stream
(modelo de função)
[ from_stream](<#/doc/chrono/day/from_stream>)(C++20) | analisa um `day` de um stream de acordo com o formato fornecido
(modelo de função)

### Classes auxiliares

[ std::formatter<std::chrono::day>](<#/doc/chrono/day/formatter>)(C++20) | suporte a formatação para `day`
(especialização de modelo de classe)
[ std::hash<std::chrono::day>](<#/doc/chrono/day/hash>)(C++26) | suporte a hash para `std::chrono::day`
(especialização de modelo de classe)

### Literais

Definido no namespace inline `std::literals::chrono_literals`
---
[ operator""d](<#/doc/chrono/operator_q__q_d>)(C++20) | um literal std::chrono::day representando um dia de um mês
(função)