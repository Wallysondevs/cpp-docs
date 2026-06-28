# guias de dedução para std::experimental::scope_exit

Definido no cabeçalho `[<experimental/scope>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/scope&action=edit&redlink=1> "cpp/header/experimental/scope \(page does not exist\)")`

```c
template< class EF >
scope_exit(EF) -> scope_exit<EF>;
```

Uma [guia de dedução](<#/doc/language/ctad>) é fornecida para std::experimental::scope_exit para permitir a dedução a partir de um argumento do tipo função ou objeto de função.

O argumento (após [decadência de função para ponteiro](<#/doc/language/implicit_cast>), se houver) é copiado ou movido para o `scope_exit` construído.

### Exemplo

| Esta seção está incompleta
Reason: no example