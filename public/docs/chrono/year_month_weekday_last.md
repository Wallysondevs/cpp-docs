# std::chrono::year_month_weekday_last

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class year_month_weekday_last;
```

A classe `year_month_weekday_last` representa o último dia da semana de um ano e mês específicos. É um ponto no tempo baseado em campos, com uma resolução de std::chrono::days, exceto que é limitado a apontar para o último dia da semana de um ano e mês. A aritmética orientada a std::chrono::years e std::chrono::months é suportada diretamente. Uma conversão implícita para std::chrono::sys_days permite que a aritmética orientada a std::chrono::days seja realizada de forma eficiente.

`year_month_weekday_last` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<../named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/chrono/year_month_weekday_last/year_month_weekday_last>) | constrói um `year_month_weekday_last`
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/year_month_weekday_last/operator_arith>) | modifica o ponto no tempo por um certo número de meses ou anos
(função membro pública)
[ yearmonthweekdayweekday_last](<#/doc/chrono/year_month_weekday_last/accessors>) | acessa os campos deste objeto
(função membro pública)
[ operator sys_daysoperator local_days](<#/doc/chrono/year_month_weekday_last/operator_days>) | converte para um [std::chrono::time_point](<#/doc/chrono/time_point>)
(função membro pública)
[ ok](<#/doc/chrono/year_month_weekday_last/ok>) | verifica se este objeto representa uma data válida
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/chrono/year_month_weekday_last/operator_cmp>)(C++20) | compara dois valores `year_month_weekday_last`
(função)
[ operator+operator-](<#/doc/chrono/year_month_weekday_last/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_weekday_last` e um certo número de anos ou meses
(função)
[ operator<<](<#/doc/chrono/year_month_weekday_last/operator_ltlt>)(C++20) | envia um `year_month_weekday_last` para um stream
(modelo de função)

### Classes auxiliares

[ std::formatter<std::chrono::year_month_weekday_last>](<#/doc/chrono/year_month_weekday_last/formatter>)(C++20) | suporte de formatação para `year_month_weekday_last`
(especialização de modelo de classe)
[ std::hash<std::chrono::year_month_weekday_last>](<#/doc/chrono/year_month_weekday_last/hash>)(C++26) | suporte a hash para `std::chrono::year_month_weekday_last`
(especialização de modelo de classe)