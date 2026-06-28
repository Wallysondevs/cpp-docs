# std::experimental::atomic_weak_ptr&lt;T&gt;::atomic_weak_ptr

```cpp
constexpr atomic_weak_ptr() noexcept;  // (1)
constexpr atomic_weak_ptr( weak_ptr<T> desired ) noexcept;  // (2)
atomic_weak_ptr( const atomic_weak_ptr& ) = delete;  // (3)
```

  
Constrói um novo objeto `atomic_weak_ptr`.

1) O construtor padrão inicializa o objeto para um estado vazio.

2) Inicializa o `weak_ptr<T>` subjacente com `desired`. A inicialização não é atômica.

3) Variáveis atômicas não são [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

desired  |  \-  |  valor para inicializar com   