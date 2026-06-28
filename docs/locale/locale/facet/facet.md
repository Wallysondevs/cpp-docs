# std::locale::facet::facet

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
explicit facet( std::size_t refs = 0 );
facet( const facet& ) = delete;
```

1) Cria um facet com contagem de referência inicial refs. Se refs for diferente de zero, o facet não será excluído quando o último locale que o referencia sair do escopo. Um facet com duração de armazenamento estática ou dinâmica deve ser sempre construído com um refs diferente de zero.

2) O construtor de cópia é excluído; [std::locale::facet](<#/doc/locale/locale/facet>) não é copiável.