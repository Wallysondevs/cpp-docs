# std::hash&lt;std::basic_stacktrace&gt;

Definido no cabeçalho `[<stacktrace>](<#/doc/header/stacktrace>)`

```c
template< class Allocator > struct hash<std::basic_stacktrace<Allocator>>;
```

  
A especialização de template de [std::hash](<#/doc/utility/hash>) para std::basic_stacktrace permite aos usuários obter hashes de valores do tipo std::basic_stacktrace. 

`operator()` desta especialização é noexcept. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ hash](<#/doc/utility/hash>)(C++11) |  objeto de função hash   
(modelo de classe)  
[ std::hash<std::stacktrace_entry>](<#/doc/utility/stacktrace_entry/hash>)(C++23) |  suporte a hash para [`std::stacktrace_entry`](<#/doc/utility/stacktrace_entry>)   
(especialização de modelo de classe)