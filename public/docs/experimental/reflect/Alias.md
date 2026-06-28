# std::experimental::reflect::Alias

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Alias = Named<T> && ScopedMember<T> && /* see below */;
```

  
O `concept` `Alias` [concept](<#/doc/language/constraints>) é satisfeito se e somente se T reflete uma [`typedef` declaration](<#/doc/language/typedef>), uma [alias-declaration](<#/doc/language/type_alias>), um [namespace alias](<#/doc/language/namespace_alias>), um [template type parameter](<#/doc/language/template_parameters>), um [decltype-specifier](<#/doc/language/decltype>), ou uma declaração introduzida por [using-declaration](<#/doc/language/using_declaration>) (Nota: O `Scope` de um `Alias` é o escopo no qual o alias foi injetado). 

### Exemplo

| Esta seção está incompleta  
Razão: exemplos   
  
### Veja também

| Esta seção está incompleta  
Razão: templatização   