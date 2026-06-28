# std::experimental::reflect::Function

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Function = Callable<T> && Typed<T> && /* see below */;
```

  
O `concept` `Function` é satisfeito se e somente se T reflete uma função, excluindo construtores e destrutores. 

### Exemplo

| Esta seção está incompleta  
Razão: exemplos   
  
### Veja também

| Esta seção está incompleta  
Razão: templatização   