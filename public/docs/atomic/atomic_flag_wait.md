# std::atomic_flag_wait, std::atomic_flag_wait_explicit

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
void atomic_flag_wait( const atomic_flag* object, bool old ) noexcept;
void atomic_flag_wait( const volatile atomic_flag* object,
bool old ) noexcept;
void atomic_flag_wait_explicit( const atomic_flag* object,
bool old, std::memory_order order ) noexcept;
void atomic_flag_wait_explicit( const volatile atomic_flag* object,
bool old, std::memory_order order ) noexcept;
```

  
Executa operações de espera atômicas.

Compara object->test([std::memory_order_seq_cst](<#/doc/atomic/memory_order>)) ou object->test(order) com old, e se eles forem iguais, então bloqueia até que *object seja notificado por [`std::atomic_flag::notify_one()`](<#/doc/atomic/atomic_flag/notify_one>) ou [`std::atomic_flag::notify_all()`](<#/doc/atomic/atomic_flag/notify_all>) (ou o thread seja desbloqueado de forma espúria). Isso é repetido até que os valores se comparem como desiguais.

1,2) A ordem de sincronização de memória é [std::memory_order_seq_cst](<#/doc/atomic/memory_order>).

3,4) A ordem de sincronização de memória é order.

Se order for um de [std::memory_order_release](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

Essas funções têm garantia de retornar somente se o valor tiver mudado, mesmo que a implementação subjacente desbloqueie de forma espúria.

### Parâmetros

object  |  \-  |  ponteiro para a atomic flag a ser verificada e aguardada   
---|---|---
old  |  \-  |  o valor para verificar se a atomic flag não contém mais   
order  |  \-  |  a ordem de sincronização de memória   
  
### Valor de retorno

(nenhum)

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

Devido ao [problema ABA](<https://en.wikipedia.org/wiki/ABA_problem> "enwiki:ABA problem"), mudanças transitórias de old para outro valor e de volta para old podem ser perdidas e não desbloquear.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ notify_one](<#/doc/atomic/atomic_flag/notify_one>)(desde C++20) |  notifica pelo menos um thread esperando no objeto atômico   
(função membro pública de `std::atomic_flag`)  
[ notify_all](<#/doc/atomic/atomic_flag/notify_all>)(desde C++20) |  notifica todos os threads bloqueados esperando no objeto atômico   
(função membro pública de `std::atomic_flag`)  
[ atomic_flag_notify_one](<#/doc/atomic/atomic_flag_notify_one>)(desde C++20) |  notifica um thread bloqueado em atomic_flag_wait   
(função)  
[ atomic_flag_notify_all](<#/doc/atomic/atomic_flag_notify_all>)(desde C++20) |  notifica todos os threads bloqueados em atomic_flag_wait   
(função)