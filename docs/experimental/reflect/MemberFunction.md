# std::experimental::reflect::MemberFunction

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept MemberFunction = RecordMember<T> && Function<T> && /* see below */;
```

O concept `MemberFunction` é satisfeito se e somente se T reflete uma função membro, excluindo construtores e destrutores.

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização