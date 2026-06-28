# std::chrono::year_month_weekday

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class year_month_weekday;
```

A classe `year_month_weekday` representa o n-ésimo dia da semana de um ano e mês específicos. É um ponto no tempo baseado em campos, com uma resolução de std::chrono::days. Aritmética orientada a std::chrono::years e std::chrono::months é suportada diretamente. Uma conversão implícita para e de std::chrono::sys_days permite que a aritmética orientada a std::chrono::days seja realizada eficientemente.

`year_month_weekday` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/chrono/year_month_weekday/year_month_weekday>) | constrói um `year_month_weekday`
(função membro pública)
[ operator+=operator-=](<#/doc/chrono/year_month_weekday/operator_arith>) | modifica o ponto no tempo por um certo número de meses ou anos
(função membro pública)
[ yearmonthweekdayindexweekday_indexed](<#/doc/chrono/year_month_weekday/accessors>) | acessa os campos deste objeto
(função membro pública)
[ operator sys_daysoperator local_days](<#/doc/chrono/year_month_weekday/operator_days>) | converte para um [std::chrono::time_point](<#/doc/chrono/time_point>)
(função membro pública)
[ ok](<#/doc/chrono/year_month_weekday/ok>) | verifica se este objeto representa uma data válida
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/chrono/year_month_weekday/operator_cmp>)(C++20) | compara dois valores `year_month_weekday`
(função)
[ operator+operator-](<#/doc/chrono/year_month_weekday/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_weekday` e um certo número de anos ou meses
(função)
[ operator<<](<#/doc/chrono/year_month_weekday/operator_ltlt>)(C++20) | envia um `year_month_weekday` para um stream
(template de função)

### Classes auxiliares

[ std::formatter<std::chrono::year_month_weekday>](<#/doc/chrono/year_month_weekday/formatter>)(C++20) | suporte a formatação para `year_month_weekday`
(especialização de template de classe)
[ std::hash<std::chrono::year_month_weekday>](<#/doc/chrono/year_month_weekday/hash>)(C++26) | suporte a hash para `std::chrono::year_month_weekday`
(especialização de template de classe)