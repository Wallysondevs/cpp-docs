# std::experimental::reflect::Callable

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Callable = ScopeMember<T> && Scope<T> && /* see below */;
```

O `Callable` concept é satisfeito se e somente se `T` reflete uma função, incluindo construtores e destrutores.

### Exemplo

| Esta seção está incompleta
Motivo: exemplos

### Veja também

| Esta seção está incompleta
Motivo: templatização