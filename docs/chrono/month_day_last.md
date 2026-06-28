# std::chrono::month_day_last

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class month_day_last;
```

A classe `month_day_last` representa o último dia de um mês específico, de algum ano ainda a ser especificado.

`month_day_last` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/chrono/month_day_last/month_day_last>) | constrói um `month_day_last`
(função membro pública)
[ month](<#/doc/chrono/month_day_last/month>) | acessa o [`month`](<#/doc/chrono/month>) armazenado
(função membro pública)
[ ok](<#/doc/chrono/month_day_last/ok>) | verifica se o [`month`](<#/doc/chrono/month>) armazenado é válido
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/chrono/month_day_last/operator_cmp>)(C++20) | compara dois valores `month_day_last`
(função)
[ operator<<](<#/doc/chrono/month_day_last/operator_ltlt>)(C++20) | envia um `month_day_last` para um stream
(modelo de função)

### Classes auxiliares

[ std::formatter<std::chrono::month_day_last>](<#/doc/chrono/month_day_last/formatter>)(C++20) | suporte a formatação para `month_day_last`
(especialização de modelo de classe)
[ std::hash<std::chrono::month_day_last>](<#/doc/chrono/month_day_last/hash>)(C++26) | suporte a hash para `std::chrono::month_day_last`
(especialização de modelo de classe)