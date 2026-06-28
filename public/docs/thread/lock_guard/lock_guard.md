# std::lock_guard&lt;Mutex&gt;::lock_guard

```cpp
explicit lock_guard( mutex_type& m );  // (1) (desde C++11)
lock_guard( mutex_type& m, std::adopt_lock_t t );  // (2) (desde C++11)
lock_guard( const lock_guard& ) = delete;  // (3) (desde C++11)
```

Adquire a posse do mutex m fornecido.

1) Efetivamente chama m.lock().

2) Adquire a posse do mutex m sem tentar bloqueá-lo. O comportamento é indefinido se a thread atual não possui um bloqueio não compartilhado (ou seja, um bloqueio adquirido por `lock`, `try_lock`, `try_lock_for`, ou `try_lock_until`) em m.

3) O construtor de cópia é deletado.

O comportamento é indefinido se m for destruído antes do objeto `lock_guard`.

### Parâmetros

- **m** — mutex para adquirir a posse
- **t** — parâmetro de tag usado para selecionar a versão do construtor que não bloqueia

### Exceções

1) Lança quaisquer exceções lançadas por m.lock().

2) Não lança nada.