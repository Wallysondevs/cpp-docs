# std::chrono::month_weekday

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)` | | (desde C++20)

```c
class month_weekday;
```

A classe `month_weekday` representa o enésimo dia da semana de um mês específico, de um ano ainda a ser especificado.

`month_weekday` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções Membro

[ (construtor)](<#/doc/chrono/month_weekday/month_weekday>) | constrói um `month_weekday`
(public member function)
[ monthweekday_indexed](<#/doc/chrono/month_weekday/accessors>) | recupera os valores armazenados de [`month`](<#/doc/chrono/month>) e [`weekday_indexed`](<#/doc/chrono/weekday_indexed>)
(public member function)
[ ok](<#/doc/chrono/month_weekday/ok>) | verifica se os valores contidos de [`month`](<#/doc/chrono/month>) e [`weekday_indexed`](<#/doc/chrono/weekday_indexed>) são válidos
(public member function)

### Funções Não-Membro

[ operator==](<#/doc/chrono/month_weekday/operator_cmp>)(C++20) | compara dois valores `month_weekday`
(function)
[ operator<<](<#/doc/chrono/month_weekday/operator_ltlt>)(C++20) | envia um `month_weekday` para um stream
(function template)

### Classes Auxiliares

[ std::formatter<std::chrono::month_weekday>](<#/doc/chrono/month_weekday/formatter>)(C++20) | suporte a formatação para `month_weekday`
(class template specialization)
[ std::hash<std::chrono::month_weekday>](<#/doc/chrono/month_weekday/hash>)(C++26) | suporte a hash para `std::chrono::month_weekday`
(class template specialization)