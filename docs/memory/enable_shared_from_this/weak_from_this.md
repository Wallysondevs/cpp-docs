# std::enable_shared_from_this&lt;T&gt;::weak_from_this

```cpp
std::weak_ptr<T> weak_from_this() noexcept;  // (1) (desde C++17)
std::weak_ptr<T const> weak_from_this() const noexcept;  // (2) (desde C++17)
```

Retorna um [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; que rastreia a propriedade de `*this` por todos os [std::shared_ptr](<#/doc/memory/shared_ptr>) existentes que se referem a `*this`.

### Valor de retorno

`_[weak_this](<#/doc/memory/enable_shared_from_this>)_`

### Observações

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_enable_shared_from_this`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | `std::enable_shared_from_this::weak_from_this`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ shared_ptr](<#/doc/memory/shared_ptr>)(C++11) | smart pointer com semântica de propriedade de objeto compartilhada
(modelo de classe)