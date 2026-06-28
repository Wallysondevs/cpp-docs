# std::chrono::duration_values

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class Rep >
struct duration_values;
```

O tipo `std::chrono::duration_values` define três durações comuns:

  * std::chrono::duration_values::zero
  * std::chrono::duration_values::min
  * std::chrono::duration_values::max

As funções membro estáticas [zero](<#/doc/chrono/duration/zero>), [min](<#/doc/chrono/duration/min>) e [max](<#/doc/chrono/duration/max>) em [std::chrono::duration](<#/doc/chrono/duration>) encaminham seu trabalho para estas funções.

Este tipo pode ser especializado se a representação `Rep` exigir uma implementação específica para retornar esses objetos duration.

### Funções membro

[ zero](<#/doc/chrono/duration_values/zero>)[static] | retorna uma representação de comprimento zero
(função membro estática pública)
[ min](<#/doc/chrono/duration_values/min>)[static] | retorna a menor representação possível
(função membro estática pública)
[ max](<#/doc/chrono/duration_values/max>)[static] | retorna a maior representação possível
(função membro estática pública)