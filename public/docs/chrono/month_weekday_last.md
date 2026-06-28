# std::chrono::month_weekday_last

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class month_weekday_last;
```

A classe `month_weekday_last` representa o último dia da semana de um mês específico, de um ano ainda a ser especificado.

`month_weekday_last` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções Membro

[ (construtor)](<#/doc/chrono/month_weekday_last/month_weekday_last>) | constrói um `month_weekday_last`
(função membro pública)
[ monthweekday_last](<#/doc/chrono/month_weekday_last/accessors>) | recupera os valores armazenados de [`month`](<#/doc/chrono/month>) e [`weekday_last`](<#/doc/chrono/weekday_last>)
(função membro pública)
[ ok](<#/doc/chrono/month_weekday_last/ok>) | verifica se os valores contidos de [`month`](<#/doc/chrono/month>) e [`weekday_last`](<#/doc/chrono/weekday_last>) são válidos
(função membro pública)

### Funções Não-Membro

[ operator==](<#/doc/chrono/month_weekday_last/operator_cmp>)(C++20) | compara dois valores de `month_weekday_last`
(função)
[ operator<<](<#/doc/chrono/month_weekday_last/operator_ltlt>)(C++20) | envia um `month_weekday_last` para um stream
(template de função)

### Classes Auxiliares

[ std::formatter<std::chrono::month_weekday_last>](<#/doc/chrono/month_weekday_last/formatter>)(C++20) | suporte de formatação para `month_weekday_last`
(especialização de template de classe)
[ std::hash<std::chrono::month_weekday_last>](<#/doc/chrono/month_weekday_last/hash>)(C++26) | suporte a hash para `std::chrono::month_weekday_last`
(especialização de template de classe)