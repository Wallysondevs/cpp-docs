# std::chrono::month_day

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class month_day;
```

A classe `month_day` representa um dia específico de um mês específico, de algum ano ainda a ser especificado.

`month_day` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/chrono/month_day/month_day>) | constrói um `month_day`
(função membro pública)
[ monthday](<#/doc/chrono/month_day/accessors>) | recupera os valores armazenados de [`month`](<#/doc/chrono/month>) e [`day`](<#/doc/chrono/day>)
(função membro pública)
[ ok](<#/doc/chrono/month_day/ok>) | verifica se o `month_day` é válido
(função membro pública)

### Funções não-membro

[ operator==operator<=>](<#/doc/chrono/month_day/operator_cmp>)(C++20) | compara dois valores `month_day`
(função)
[ operator<<](<#/doc/chrono/month_day/operator_ltlt>)(C++20) | envia um `month_day` para um stream
(modelo de função)
[ from_stream](<#/doc/chrono/month_day/from_stream>)(C++20) | analisa um `month_day` de um stream de acordo com o formato fornecido
(modelo de função)

### Classes auxiliares

[ std::formatter<std::chrono::month_day>](<#/doc/chrono/month_day/formatter>)(C++20) | suporte a formatação para `month_day`
(especialização de modelo de classe)
[ std::hash<std::chrono::month_day>](<#/doc/chrono/month_day/hash>)(C++26) | suporte a hash para `std::chrono::month_day`
(especialização de modelo de classe)