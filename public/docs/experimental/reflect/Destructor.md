# std::experimental::reflect::Destructor

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Destructor = Callable<T> && SpecialMemberFunction<T> && /* see below */;
```

O `Destructor` concept é satisfeito se e somente se T reflete um destrutor.

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização