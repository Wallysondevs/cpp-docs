# std::experimental::filesystem::file_status::file_status

file_status( const file_status& ) = default; | (1) | (filesystem TS)
---|---|---
file_status( file_status&& ) = default; | (2) | (filesystem TS)
explicit file_status( file_type type = file_type::none,
perms permissions = perms::unknown ); | (3) | (filesystem TS)

Constrói um novo objeto `file_status`.

1) Construtor de cópia padrão.

2) Construtor de movimento padrão.

3) Inicializa o objeto `file_status` com `type` como tipo e `permissions` como permissões.

### Parâmetros

| Esta seção está incompleta

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept