# std::experimental::reflect::Type

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Type = Named<T> && ScopeMember<T> && /* see below */;
```

O concept `Type` é satisfeito se e somente se `T` reflete um tipo.

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização