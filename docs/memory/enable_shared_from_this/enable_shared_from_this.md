# std::enable_shared_from_this&lt;T&gt;::enable_shared_from_this

```cpp
constexpr enable_shared_from_this() noexcept;  // (1) (desde C++11)
enable_shared_from_this( const enable_shared_from_this& other ) noexcept;  // (2) (desde C++11)
```

Constrói um novo objeto `enable_shared_from_this`. `_[weak_this](<#/doc/memory/enable_shared_from_this>)_` é [inicializado por valor](<#/doc/language/value_initialization>).

### Parâmetros

- **other** — um `enable_shared_from_this` para copiar

### Notas

Não há construtor de movimento: mover de um objeto derivado de `enable_shared_from_this` não transfere sua identidade compartilhada.

### Exemplo

Execute este código
```cpp
    #include <memory>
     
    struct Foo : public std::enable_shared_from_this<Foo>
    {
        Foo() {} // implicitly calls enable_shared_from_this constructor
        std::shared_ptr<Foo> getFoo() { return shared_from_this(); }
    };
     
    int main()
    {
        std::shared_ptr<Foo> pf1(new Foo);
        auto pf2 = pf1->getFoo(); // shares ownership of object with pf1
    }
```

### Veja também

[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de propriedade de objeto compartilhada
(modelo de classe)