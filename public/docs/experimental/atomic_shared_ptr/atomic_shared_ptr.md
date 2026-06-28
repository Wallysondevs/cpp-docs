# std::experimental::atomic_shared_ptr&lt;T&gt;::atomic_shared_ptr

```cpp
constexpr atomic_shared_ptr() noexcept;  // (1)
constexpr atomic_shared_ptr( shared_ptr<T> desired ) noexcept;  // (2)
atomic_shared_ptr( const atomic_shared_ptr& ) = delete;  // (3)
```

Constrói um novo objeto `atomic_shared_ptr`.

1) O construtor padrão inicializa o objeto para um estado vazio.

2) Inicializa o `shared_ptr<T>` subjacente com `desired`. A inicialização não é atômica.

3) Variáveis atômicas não são [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

- **desired** — valor para inicializar

### Exceções