# std::experimental::barrier

Definido no cabeçalho `[<experimental/barrier>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/barrier&action=edit&redlink=1> "cpp/header/experimental/barrier \(page does not exist\)")`

```c
class barrier;
```

A classe `std::experimental::barrier` fornece um mecanismo de coordenação de threads que permite que um conjunto de threads participantes bloqueie até que uma operação seja concluída. Ao contrário de std::experimental::latch, as barriers são reutilizáveis; uma vez que as threads participantes são liberadas do ponto de sincronização de uma barrier, elas podem reutilizar a mesma barrier.

Uma barrier possui uma fase de conclusão, que é executada por uma das threads participantes assim que todas as threads no conjunto de threads participantes chegam ao ponto de sincronização. As chamadas `arrive_and_wait` e `arrive_and_drop` [sincronizam com](<#/doc/atomic/memory_order>) o início da fase de conclusão; o fim da fase de conclusão sincroniza com os retornos de todas as chamadas bloqueadas por sua conclusão.

Para `std::experimental::barrier`, a fase de conclusão é vazia. std::experimental::flex_barrier permite ao usuário controlar a fase de conclusão com um function object.

O conjunto de threads participantes para uma `barrier` construída para `num_threads` threads são as primeiras `num_threads` threads a chegar ao seu ponto de sincronização após a construção. O mesmo conjunto de threads (exceto para threads que chamaram [`arrive_and_drop()`](<#/doc/experimental/barrier/arrive_and_drop>)) deve chegar à `barrier` em cada ciclo.

### Funções membro

[ (constructor)](<#/doc/experimental/barrier/barrier>) | constrói uma `barrier`
(função membro pública)
[ (destructor)](<#/doc/experimental/barrier/~barrier>) | destrói a barrier
(função membro pública)
operator=[deleted] | não copiável por atribuição
(função membro pública)
[ arrive_and_wait](<#/doc/experimental/barrier/arrive_and_wait>) | chega ao ponto de sincronização e bloqueia
(função membro pública)
[ arrive_and_drop](<#/doc/experimental/barrier/arrive_and_drop>) | chega ao ponto de sincronização e remove a thread atual do conjunto de threads participantes
(função membro pública)