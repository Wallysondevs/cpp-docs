# std::atomic_flag::wait

```cpp
void wait( bool old, std::memory_order order =
std::memory_order_seq_cst ) const noexcept;  // (1) (desde C++20)
(constexpr desde C++26)
void wait( bool old,
std::memory_order order =
std::memory_order_seq_cst ) const volatile noexcept;  // (2) (desde C++20)
```

  
Executa operações de espera atômicas. Comporta-se como se executasse repetidamente os seguintes passos: 

  * Compara this->test(order) com o de old. 
    * Se forem iguais, então bloqueia até que *this seja notificado por notify_one() ou notify_all(), ou o thread seja desbloqueado de forma espúria. 
    * Caso contrário, retorna. 

Essas funções têm garantia de retornar apenas se o valor tiver mudado, mesmo que a implementação subjacente desbloqueie de forma espúria. 

Se order não for [std::memory_order_relaxed](<#/doc/atomic/memory_order>), [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) ou [std::memory_order_seq_cst](<#/doc/atomic/memory_order>), o comportamento é indefinido. 

### Parâmetros

old  |  \-  |  o valor para verificar se o objeto `atomic_flag` não contém mais   
---|---|---
order  |  \-  |  restrições de ordem de memória a serem impostas   
  
### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros. 

Devido ao [problema ABA](<https://en.wikipedia.org/wiki/ABA_problem> "enwiki:ABA problem"), mudanças transitórias de old para outro valor e de volta para old podem ser perdidas e não desbloquear. 

  

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ notify_one](<#/doc/atomic/atomic_flag/notify_one>)(C++20) |  notifica pelo menos um thread esperando no objeto atômico   
(função membro pública)  
[ notify_all](<#/doc/atomic/atomic_flag/notify_all>)(C++20) |  notifica todos os threads bloqueados esperando no objeto atômico   
(função membro pública)  
[ atomic_flag_notify_one](<#/doc/atomic/atomic_flag_notify_one>)(C++20) |  notifica um thread bloqueado em atomic_flag_wait   
(função)  
[ atomic_flag_notify_all](<#/doc/atomic/atomic_flag_notify_all>)(C++20) |  notifica todos os threads bloqueados em atomic_flag_wait   
(função)