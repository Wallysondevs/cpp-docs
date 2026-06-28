# Guias de dedução para std::experimental::unique_resource

Definido no cabeçalho `[<experimental/scope>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/scope&action=edit&redlink=1> "cpp/header/experimental/scope \(page does not exist\)")`

```c
template< class R, class D >
unique_resource( R, D ) -> unique_resource<R, D>;
```

Um [guia de dedução](<#/doc/language/ctad>) é fornecido para std::experimental::unique_resource para permitir a dedução a partir de um *resource handle* e *deleter* fornecidos.

Os argumentos (após a conversão [array-para-ponteiro](<#/doc/language/implicit_cast>) e [função-para-ponteiro](<#/doc/language/implicit_cast>) decair, se houver) são copiados ou movidos para o `unique_resource` construído.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo