# std::hash(std::experimental::shared_ptr)

template< class T > struct hash<[std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt;>; |  |  (library fundamentals TS)  

  
A especialização de template de [std::hash](<#/doc/utility/hash>) para [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt; permite aos usuários obter hashes de objetos do tipo [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt;.

Para um dado [std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt; p, esta especialização garante que [std::hash](<#/doc/utility/hash>)<[std::experimental::shared_ptr](<#/doc/experimental/shared_ptr>)&lt;T&gt;>()(p) == [std::hash](<#/doc/utility/hash>)<T*>()(p.get()).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ hash](<#/doc/utility/hash>)(C++11) |  objeto de função hash   
(modelo de classe)  