# std::experimental::reflect::Constant

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Constant = ScopeMember<T> && Typed<T> && /* see below */;
```

  
O `concept` `Constant` é satisfeito se e somente se `T` reflete uma [expressão constante](<#/doc/language/constant_expression>). 

### Exemplo

| Esta seção está incompleta  
Razão: exemplos   
  
### Veja também

| Esta seção está incompleta  
Razão: templatização   