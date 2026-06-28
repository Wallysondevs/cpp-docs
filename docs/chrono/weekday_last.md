# std::chrono::weekday_last

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
class weekday_last;
```

A classe `weekday_last` representa o último dia da semana de algum mês.

`weekday_last` é um [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) [StandardLayoutType](<#/doc/named_req/StandardLayoutType>).

### Funções membro

[ (construtor)](<#/doc/chrono/weekday_last/weekday_last>) | constrói um objeto `weekday_last`
(função membro pública)
[ weekday](<#/doc/chrono/weekday_last/weekday>) | acessa o [`weekday`](<#/doc/chrono/weekday>) armazenado
(função membro pública)
[ ok](<#/doc/chrono/weekday_last/ok>) | verifica se o [`weekday`](<#/doc/chrono/weekday>) armazenado é válido
(função membro pública)

### Funções não-membro

[ operator==](<#/doc/chrono/weekday_last/operator_cmp>)(C++20) | compara dois valores `weekday_last`
(função)
[ operator<<](<#/doc/chrono/weekday_last/operator_ltlt>)(C++20) | envia um `weekday_last` para um stream
(modelo de função)

### Classes auxiliares

[ std::formatter<std::chrono::weekday_last>](<#/doc/chrono/weekday_last/formatter>)(C++20) | suporte a formatação para `weekday_last`
(especialização de modelo de classe)
[ std::hash<std::chrono::weekday_last>](<#/doc/chrono/weekday_last/hash>)(C++26) | suporte a hash para `std::chrono::weekday_last`
(especialização de modelo de classe)