# std::hash&lt;std::shared_ptr&gt;

```cpp
template< class T >
struct hash<std::shared_ptr<T>>;  // (desde C++11)
```

  
A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; permite aos usuários obter hashes de objetos do tipo [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;. 

Para um dado [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt; p, esta especialização garante que [std::hash](<#/doc/utility/hash>)<[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;T&gt;>()(p) == [std::hash](<#/doc/utility/hash>)<decltype(p.get())>()(p.get()). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ hash](<#/doc/utility/hash>)(C++11) |  objeto de função hash   
(modelo de classe)  