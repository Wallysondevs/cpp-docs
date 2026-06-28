# std::experimental::reflect::Operator

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Operator = Function<T> && /* see below */;
```

O concept `Operator` é satisfeito se e somente se T reflete uma função de operador ou uma função de conversão (Nota: Alguns tipos que satisfazem `Operator` também satisfazem `MemberFunction` ou `SpecialMemberFunction`).

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização