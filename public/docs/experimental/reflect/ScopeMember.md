# std::experimental::reflect::ScopeMember

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept ScopeMember = Named<T> && /* see below */;
```

O concept `ScopeMember` é satisfeito se e somente se T satisfaz `RecordMember`, `Enumerator`, ou `Variable`, ou se T reflete um namespace que não é o namespace global (Nota: O escopo dos membros de uma union sem nome é a própria union sem nome; o escopo dos enumeradores é o seu tipo).

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização