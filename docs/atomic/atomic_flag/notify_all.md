# std::atomic_flag::notify_all

```cpp
void notify_all() noexcept;  // (1) (desde C++20)
(constexpr desde C++26)
void notify_all() volatile noexcept;  // (2) (desde C++20)
```

Realiza operações atômicas de notificação.

Desbloqueia todas as threads bloqueadas em operações atômicas de espera (ou seja, wait()) neste objeto (*this), se houver alguma; caso contrário, não faz nada.

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ wait](<#/doc/atomic/atomic_flag/wait>)(C++20) | bloqueia a thread até ser notificada e o valor atômico mudar
(função membro pública)
[ atomic_flag_waitatomic_flag_wait_explicit](<#/doc/atomic/atomic_flag_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e a flag mudar
(função)
[ atomic_flag_notify_one](<#/doc/atomic/atomic_flag_notify_one>)(C++20) | notifica uma thread bloqueada em atomic_flag_wait
(função)