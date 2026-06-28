# std::filesystem::file_status::file_status

```cpp
file_status() noexcept : file_status(std::filesystem::file_type::none) {}  // (1) (desde C++17)
file_status( const file_status& ) noexcept = default;  // (2) (desde C++17)
file_status( file_status&& ) noexcept = default;  // (3) (desde C++17)
explicit file_status(
std::filesystem::file_type type,
std::filesystem::perms permissions = std::filesystem::perms::unknown ) noexcept;  // (4) (desde C++17)
```

  
Constrói um novo objeto `file_status`.

1) Construtor padrão que chama (4) com [std::filesystem::file_type::none](<#/doc/filesystem/file_type>).

2,3) Os construtores de cópia e de movimento são padronizados (defaulted).

4) Inicializa o objeto de status de arquivo com `type` como tipo e `permissions` como permissões.

### Parâmetros

type  |  \-  |  tipo do status do arquivo   
---|---|---
permissions  |  \-  |  permissões do status do arquivo   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   