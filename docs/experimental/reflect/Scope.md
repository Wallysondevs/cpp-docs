# std::experimental::reflect::Scope

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Scope = Object<T> && /* see below */;
```

  
O `concept` `Scope` é satisfeito se e somente se `T` reflete um namespace (incluindo o namespace global), uma classe, uma enumeração, uma função ou um closure-type (Nota: Qualquer `T` que não reflita o namespace global também satisfaz `ScopeMember`). 

### Exemplo

| Esta seção está incompleta  
Razão: exemplos   
  
### Veja também

| Esta seção está incompleta  
Razão: templatização   