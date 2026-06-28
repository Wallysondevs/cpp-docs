# Guias de dedução para std::experimental::scope_fail

Definido no cabeçalho `[<experimental/scope>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/scope&action=edit&redlink=1> "cpp/header/experimental/scope \(page does not exist\)")`

```c
template< class EF >
scope_fail(EF) -> scope_fail<EF>;
```

Um [guia de dedução](<#/doc/language/ctad>) é fornecido para std::experimental::scope_fail para permitir a dedução a partir de um argumento do tipo função ou objeto de função.

O argumento (após [decaimento de função para ponteiro](<#/doc/language/implicit_cast>), se houver) é copiado ou movido para o `scope_fail` construído.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo