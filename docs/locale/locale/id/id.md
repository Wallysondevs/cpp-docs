# std::locale::id::id

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
id();
id( const id& ) = delete;
```

1) Construtor padrão: cria um objeto do tipo [std::locale::id](<#/doc/locale/locale/id>) com conteúdo específico da implementação.

2) O construtor de cópia é deletado; [std::locale::id](<#/doc/locale/locale/id>) não é copiável.

### Notas

Como locales e facets devem estar disponíveis para objetos de stream de E/S com duração de armazenamento estática, como [std::cout](<#/doc/io/cout>), implementações típicas permitem que o construtor padrão implícito inicialize com zero o conteúdo de [std::locale::id](<#/doc/locale/locale/id>) durante a inicialização estática (antes que os construtores sejam executados para objetos estáticos), e quando um facet é adicionado a qualquer locale pela primeira vez, o locale completa a inicialização do id do facet.