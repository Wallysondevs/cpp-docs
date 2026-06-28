# std::experimental::filesystem::file_status::permissions

perms permissions() const; | (1) | (filesystem TS)
---|---|---
void permissions( perms perm ); | (2) | (filesystem TS)

Acessa as informações de permissões do arquivo.

1) Retorna as informações de permissões do arquivo.

2) Define o tipo de arquivo para `perm`.

### Parâmetros

- **perm** — permissões de arquivo a serem definidas

### Valor de retorno

1) Informações de permissões do arquivo.

2) (nenhum)

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept