# std::experimental::reflect::Constructor

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Constructor = Callable<T> && RecordMember<T> && /* see below */;
```

O `concept` `Constructor` é satisfeito se e somente se T reflete um construtor (Nota: Alguns tipos que satisfazem `Constructor` também satisfazem `SpecialMemberFunction`).

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização