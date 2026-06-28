# std::chrono::year_month

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class year_month;
```

A classe `year_month` representa um mês específico de um ano específico, mas com um dia não especificado. É um ponto no tempo baseado em campos, com uma resolução de std::chrono::months.

`year_month` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/chrono/year_month/year_month>) | constrói um `year_month`
(função membro pública)
[ yearmonth](<#/doc/chrono/year_month/accessors>) | acessa o ano e o mês armazenados
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/year_month/operator_arith>) | modifica o `year_month` por um certo número de meses ou anos
(função membro pública)
[ ok](<#/doc/chrono/year_month/ok>) | verifica se este `year_month` é válido
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/chrono/year_month/operator_cmp>)(C++20) | compara dois valores `year_month`
(função)
[ operator+operator-](<#/doc/chrono/year_month/operator_arith_2>)(C++20) | realiza operações aritméticas em `year_month`
(função)
[ operator<<](<#/doc/chrono/year_month/operator_ltlt>)(C++20) | envia um `year_month` para um stream
(modelo de função)
[ from_stream](<#/doc/chrono/year_month/from_stream>)(C++20) | analisa um `year_month` de um stream de acordo com o formato fornecido
(modelo de função)

### Classes auxiliares

[ std::formatter<std::chrono::year_month>](<#/doc/chrono/year_month/formatter>)(C++20) | suporte a formatação para `year_month`
(especialização de modelo de classe)
[ std::hash<std::chrono::year_month>](<#/doc/chrono/year_month/hash>)(C++26) | suporte a hash para `std::chrono::year_month`
(especialização de modelo de classe)