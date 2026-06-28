# std::experimental::reflect::Namespace

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`

```c
template< class T >
concept Namespace = Scope<T> && /* see below */;
```

O `concept` `Namespace` é satisfeito se e somente se T reflete um `namespace`, incluindo o `namespace` global (Nota: Qualquer T que não reflita o `namespace` global também satisfaz `ScopeMember`).

### Exemplo

| Esta seção está incompleta
Razão: exemplos

### Veja também

| Esta seção está incompleta
Razão: templatização