# std::atomic_ref&lt;T&gt;::is_always_lock_free

```cpp
static constexpr bool is_always_lock_free = /*implementation-defined*/;  // (desde C++20)
```

  
É igual a true se as operações neste tipo de `atomic_ref` são sempre lock-free e false se nunca ou às vezes são lock-free.

O valor desta constante é consistente com o resultado da função membro is_lock_free.

### Veja também

[ is_lock_free](<#/doc/atomic/atomic_ref/is_lock_free>) | verifica se o objeto `atomic_ref` é lock-free   
(função membro pública)  