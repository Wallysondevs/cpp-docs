# std::filesystem::path::format

enum format {  
native_format,  
generic_format,  
auto_format  
}; |  |  (desde C++17)  

  
Determina como as representações de string de nomes de caminho são interpretadas pelos construtores de [`std::filesystem::path`](<#/doc/filesystem/path>) que aceitam strings. 

### Constantes

Nome  |  Explicação   
---|---
`native_format` |  Formato de nome de caminho nativo   
`generic_format` |  Formato de nome de caminho genérico   
`auto_format` |  Formato de nome de caminho definido pela implementação, auto-detectado quando possível   
  
### Observações

Em sistemas POSIX, não há diferença entre o formato nativo e o genérico. 

### Veja também

[ (construtor)](<#/doc/filesystem/path/path>) |  constrói um `path`   
(função membro pública)  