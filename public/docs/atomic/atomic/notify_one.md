# std::atomic&lt;T&gt;::notify_one

```cpp
void notify_one() noexcept;  // (1) (desde C++20)
(constexpr desde C++26)
void notify_one() volatile noexcept;  // (2) (desde C++20)
```

Realiza operações atômicas de notificação.

Se houver uma thread bloqueada em uma operação atômica de espera (isto é, [`wait()`](<#/doc/atomic/atomic/wait>)) neste objeto, então desbloqueia _pelo menos_ uma dessas threads; caso contrário, não faz nada.

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ wait](<#/doc/atomic/atomic/wait>)(C++20) | bloqueia a thread até ser notificada e o valor atômico mudar
(função membro pública)
[ atomic_waitatomic_wait_explicit](<#/doc/atomic/atomic_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e o valor atômico mudar
(modelo de função)
[ atomic_notify_one](<#/doc/atomic/atomic_notify_one>)(C++20) | notifica uma thread bloqueada em atomic_wait
(modelo de função)