# std::chrono::year

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class year;
```

A classe `year` representa um ano no [calendário gregoriano proléptico](<https://en.wikipedia.org/wiki/proleptic_Gregorian_calendar> "enwiki:proleptic Gregorian calendar"). Seu intervalo é `[`-32767`, `32767`]`.

`year` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções Membro

[ (constructor)](<#/doc/chrono/year/year>) | constrói um `year`
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/chrono/year/operator_inc_dec>) | incrementa ou decrementa o ano
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/year/operator_arith>) | adiciona ou subtrai um número de anos de um `year`
(função membro pública)
[ operator+operator-](<#/doc/chrono/year/operator_sign>) | aplica operadores unários a `year`
(função membro pública)
[ is_leap](<#/doc/chrono/year/is_leap>) | determina se o ano é bissexto
(função membro pública)
[ operator int](<#/doc/chrono/year/operator_int>) | recupera o valor do ano
(função membro pública)
[ ok](<#/doc/chrono/year/ok>) | verifica se o valor do ano armazenado é válido
(função membro pública)
[ min](<#/doc/chrono/year/min>)[static] | retorna o menor valor de ano possível
(função membro estática pública)
[ max](<#/doc/chrono/year/max>)[static] | retorna o maior `year` possível
(função membro estática pública)

### Funções Não-Membro

[ operator==operator<=>](<#/doc/chrono/year/operator_cmp>)(C++20) | compara dois valores `year`
(função)
[ operator+operator-](<#/doc/chrono/year/operator_arith_2>)(C++20) | realiza operações aritméticas em `year`s
(função)
[ operator<<](<#/doc/chrono/year/operator_ltlt>)(C++20) | envia um `year` para um stream
(modelo de função)
[ from_stream](<#/doc/chrono/year/from_stream>)(C++20) | analisa um `year` de um stream de acordo com o formato fornecido
(modelo de função)

### Classes Auxiliares

[ std::formatter<std::chrono::year>](<#/doc/chrono/year/formatter>)(C++20) | suporte a formatação para `year`
(especialização de modelo de classe)
[ std::hash<std::chrono::year>](<#/doc/chrono/year/hash>)(C++26) | suporte a hash para `std::chrono::year`
(especialização de modelo de classe)

### Literais

Definido no namespace inline `std::literals::chrono_literals`
---
[ operator""y](<#/doc/chrono/operator_q__q_y>)(C++20) | um literal std::chrono::year representando um ano específico
(função)