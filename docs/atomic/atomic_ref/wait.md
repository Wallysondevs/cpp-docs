# std::atomic_ref&lt;T&gt;::wait

```cpp
void wait( value_type old, std::memory_order order =  
std::memory_order_seq_cst ) const noexcept;
```
| | | (constexpr desde C++26)

Executa operações de espera atômicas. Comporta-se como se executasse repetidamente os seguintes passos:

*   Compara a [representação de valor](<#/doc/language/objects>) de `this->load(order)` com a de `old`.
    *   Se forem iguais, então bloqueia até que `*this` seja notificado por `notify_one()` ou `notify_all()`, ou o thread seja desbloqueado espuriamente.
    *   Caso contrário, retorna.

Estas funções têm garantia de retornar apenas se o valor tiver mudado, mesmo que a implementação subjacente desbloqueie espuriamente.

Se `order` não for [std::memory_order_relaxed](<#/doc/atomic/memory_order>), [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) ou [std::memory_order_seq_cst](<#/doc/atomic/memory_order>), o comportamento é indefinido.

### Parâmetros

- **old** — o valor para verificar se o objeto do `atomic_ref` não contém mais
- **order** — restrições de ordem de memória a serem impostas

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

Devido ao [problema ABA](<https://en.wikipedia.org/wiki/ABA_problem> "enwiki:ABA problem"), mudanças transitórias de `old` para outro valor e de volta para `old` podem ser perdidas, e não desbloquear.

A comparação é bit a bit (similar a [std::memcmp](<#/doc/string/byte/memcmp>)); nenhum operador de comparação é usado. Bits de preenchimento que nunca participam da representação de valor de um objeto são ignorados.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ notify_one](<#/doc/atomic/atomic_ref/notify_one>) | notifica pelo menos um thread esperando no objeto atômico
(função membro pública)
[ notify_all](<#/doc/atomic/atomic_ref/notify_all>) | notifica todos os threads bloqueados esperando no objeto atômico
(função membro pública)
[ atomic_notify_one](<#/doc/atomic/atomic_notify_one>)(C++20) | notifica um thread bloqueado em atomic_wait
(template de função)
[ atomic_notify_all](<#/doc/atomic/atomic_notify_all>)(C++20) | notifica todos os threads bloqueados em atomic_wait
(template de função)