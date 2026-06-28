# std::hash(std::experimental::propagate_const)

Definido no cabeçalho `[<experimental/propagate_const>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/propagate_const&action=edit&redlink=1> "cpp/header/experimental/propagate_const (page does not exist)")`

```c
template< class T > struct hash<std::experimental::propagate_const<T>>;
```

A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt; permite aos usuários obter hashes de objetos do tipo [std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;.

Para um dado [std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt; p, esta especialização garante que [std::hash](<#/doc/utility/hash>)<[std::experimental::propagate_const](<#/doc/experimental/propagate_const>)&lt;T&gt;>()(p) == [std::hash](<#/doc/utility/hash>)&lt;T&gt;()(p.t_), onde `p.t_` é o objeto tipo ponteiro (pointer-like) encapsulado por `p`.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(modelo de classe)