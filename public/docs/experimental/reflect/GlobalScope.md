# std::experimental::reflect::GlobalScope

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept GlobalScope = Namespace<T> && /* see below */;
```

O concept `GlobalScope` é satisfeito se e somente se T reflete o namespace global (Nota: Qualquer T que satisfaça isso não satisfaz `ScopeMember`).

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização