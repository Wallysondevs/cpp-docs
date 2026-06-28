# std::experimental::reflect::Enumerator

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Enumerator = Typed<T> && ScopeMember<T> && /* see below */;
```

  
O concept `Enumerator` é satisfeito se e somente se T reflete um enumerador (Nota: O `Scope` de um `Enumerator` é seu tipo também para enumerações que são tipos de enumeração não escopados). 

### Exemplo

| Esta seção está incompleta  
Razão: exemplos   
  
### Veja também

| Esta seção está incompleta  
Razão: templatização   