# std::hash(std::experimental::observer_ptr)

Definido no cabeçalho `[<experimental/memory>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/memory&action=edit&redlink=1> "cpp/header/experimental/memory \(page does not exist\)")`

```c
template< class T > struct hash<std::experimental::observer_ptr<T>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::experimental::observer_ptr](<#/doc/experimental/observer_ptr>)&lt;T&gt; permite aos usuários obter hashes de objetos do tipo [std::experimental::observer_ptr](<#/doc/experimental/observer_ptr>)&lt;T&gt;.

Para um dado [std::experimental::observer_ptr](<#/doc/experimental/observer_ptr>)&lt;T&gt; p, esta especialização garante que [std::hash](<#/doc/utility/hash>)<[std::experimental::observer_ptr](<#/doc/experimental/observer_ptr>)&lt;T&gt;>()(p) == [std::hash](<#/doc/utility/hash>)<T*>()(p.get()).

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)