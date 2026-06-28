# std::scoped_lock&lt;MutexTypes...&gt;::scoped_lock

```cpp
explicit scoped_lock( MutexTypes&... m );  // (1) (desde C++17)
scoped_lock( std::adopt_lock_t, MutexTypes&... m );  // (2) (desde C++17)
scoped_lock( const scoped_lock& ) = delete;  // (3) (desde C++17)
```

Adquire a propriedade dos mutexes m fornecidos.

1) Se sizeof...(MutexTypes) == 0, não faz nada. Caso contrário, se sizeof...(MutexTypes) == 1, efetivamente chama m.lock(). Caso contrário, efetivamente chama [std::lock](<#/doc/thread/lock>)(m...).

2) Adquire a propriedade dos mutexes m... sem tentar bloquear nenhum deles. O comportamento é indefinido a menos que a thread atual possua um bloqueio não compartilhado (ou seja, um bloqueio adquirido por `lock`, `try_lock`, `try_lock_for`, ou `try_lock_until`) em cada objeto em m....

3) O construtor de cópia é deletado.

O comportamento é indefinido se m for destruído antes do objeto `scoped_lock`.

### Parâmetros

- **m** — mutexes para adquirir a propriedade

### Exceções

1) Lança quaisquer exceções lançadas por m.lock().

2) Não lança nada.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[P0739R0](<https://wg21.link/P0739R0>) | C++17 | O parâmetro `adopt_lock_t` estava por último, impedindo a dedução de argumentos de template de classe | movido para o primeiro