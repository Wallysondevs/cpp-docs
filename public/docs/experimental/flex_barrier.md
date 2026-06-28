Definido no cabeçalho `[<experimental/barrier>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/barrier&action=edit&redlink=1> "cpp/header/experimental/barrier \(page does not exist\)")`

```c
class flex_barrier;
```

A classe `std::experimental::flex_barrier` fornece um mecanismo de coordenação de threads que permite que um conjunto de threads participantes bloqueie até que uma operação seja concluída. Ao contrário de std::experimental::latch, as barreiras são reutilizáveis; uma vez que as threads participantes são liberadas do ponto de sincronização de uma barreira, elas podem reutilizar a mesma barreira.

Uma barreira possui uma fase de conclusão, que é executada por uma das threads participantes assim que todas as threads no conjunto de threads participantes chegam ao ponto de sincronização. As chamadas `arrive_and_wait` e `arrive_and_drop` [sincronizam com](<#/doc/atomic/memory_order>) o início da fase de conclusão; o fim da fase de conclusão sincroniza com os retornos de todas as chamadas bloqueadas por sua conclusão.

`std::experimental::flex_barrier` permite ao usuário controlar a fase de conclusão com um objeto de função. Se o objeto de função retornar -1, o conjunto de threads participantes permanece inalterado (e o mesmo conjunto de threads participantes deve chegar ao ponto de sincronização no próximo ciclo); caso contrário, o conjunto de threads participantes torna-se um novo conjunto com um tamanho igual ao valor retornado `N`, e consiste nas próximas `N` threads a chegar ao ponto de sincronização da barreira.

Usuários que não precisam dessa funcionalidade podem usar std::experimental::barrier.

### Funções membro

[ (constructor)](<#/doc/experimental/flex_barrier/flex_barrier>) | constrói uma `flex_barrier`
(função membro pública)
[ (destructor)](<#/doc/experimental/flex_barrier/~flex_barrier>) | destrói a `flex_barrier`
(função membro pública)
operator=[deleted] | não copiável por atribuição
(função membro pública)
[ arrive_and_wait](<#/doc/experimental/flex_barrier/arrive_and_wait>) | chega ao ponto de sincronização e bloqueia
(função membro pública)
[ arrive_and_drop](<#/doc/experimental/flex_barrier/arrive_and_drop>) | chega ao ponto de sincronização e remove a thread atual do conjunto de threads participantes
(função membro pública)